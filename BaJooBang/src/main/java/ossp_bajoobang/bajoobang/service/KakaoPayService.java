package ossp_bajoobang.bajoobang.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Order;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.OrderRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;
import ossp_bajoobang.bajoobang.pay.PayInfoDto;
import ossp_bajoobang.bajoobang.pay.request.PayRequest;
import ossp_bajoobang.bajoobang.pay.response.PayApproveResDto;
import ossp_bajoobang.bajoobang.pay.response.PayReadyResDto;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class KakaoPayService {
    private final RequestRepository requestRepository;
    private final OrderRepository orderRepository;

    @Value("${pay.admin-key}")
    private String adminKey;

    public PayRequest getReadyRequest(Long id, PayInfoDto payInfoDto){
        Map<String, String> map = new HashMap<>();

        /* partner_user_id,partner_order_id는 결제 승인 요청에서도 동일해야함 */
        // id는 멤버 id를 뜻함
        // partner_order_id는 멤버 id + "_" + 요청서 id로 정하였다
        Long requestId = payInfoDto.getRequest_id();
        String orderId = id + "_" + requestId;
        // 가맹점 코드 테스트코드는 TC0ONETIME 이다.
        map.put("cid", "TC0ONETIME");

        // 다음 결제 승인 정보를 얻을 때
        // 아래 partner_order_id,partner_user_id 가 동일해야 합니다.
        map.put("partner_order_id", orderId);
        map.put("partner_user_id", String.valueOf(id));

        // 리액트에서 받아온 payInfoDto로 결제 주문서의 item 이름을
        // 지어주는 과정입니다.
        // 상품명은 요청서id로 설정했다.
        map.put("item_name", String.valueOf(requestId));
        log.info("item_name={}", map.get("item_name"));
        //수량
        map.put("quantity", "1");

        //가격
        map.put("total_amount", payInfoDto.getPrice()+"");

        //비과세 금액
        map.put("tax_free_amount", "0");

        // 아래 url은 사용자가 결제 url에서 결제를 성공, 실패, 취소시
        // redirect할 url로 위에서 설명한 동작 과정에서 5번과 6번 사이 과정에서
        // 나온 결과로 이동할 url을 설정해 주는 것입니다.
        map.put("approval_url", "http://localhost:8000/payment/success"+"/"+orderId); // 성공 시 redirect url
        // 뒤에 경로 변수로 멤버id값을 추가함
        map.put("cancel_url", "http://localhost:8000/payment/cancel"); // 취소 시 redirect url
        map.put("fail_url", "http://localhost:8000/payment/fail"); // 실패 시 redirect url

        return new PayRequest("https://open-api.kakaopay.com/online/v1/payment/ready",map);
    }

    public PayRequest getApproveRequest(String tid, String orderId, String pgToken){
        Map<String, String> map = new HashMap<>();

        // orderId는 member_id "_" request_id
        String[] parts = orderId.split("_");
        // 첫 번째 정수 member_id
        String firstPart = parts[0];
        Long member_id = Long.parseLong(firstPart);

        // 가맹점 코드 테스트코드는 TC0ONETIME 이다.
        map.put("cid", "TC0ONETIME");

        // getReadyRequest 에서 받아온 tid
        map.put("tid", tid);
        map.put("partner_order_id", orderId); // 주문명
        map.put("partner_user_id", String.valueOf(member_id)); // 회원 id

        // getReadyRequest에서 받아온 redirect url에 클라이언트가
        // 접속하여 결제를 성공시키면 아래의 url로 redirect 되는데
        //http://localhost:8080/payment/success"+"/"+id
        // 여기에 &pg_token= 토큰값 이 붙어서 redirect 된다.
        // 해당 내용을 뽑아 내서 사용하면 된다.
        map.put("pg_token", pgToken);

        return new PayRequest("https://open-api.kakaopay.com/online/v1/payment/approve",map);
    }


    /** 카오페이 결제를 시작하기 위해 상세 정보를 카카오페이 서버에 전달하고 결제 고유 번호(TID)를 받는 단계입니다.
     * 어드민 키를 헤더에 담아 파라미터 값들과 함께 POST로 요청합니다.
     * 테스트  가맹점 코드로 'TC0ONETIME'를 사용 */
    @Transactional
    public PayReadyResDto getRedirectUrl(PayInfoDto payInfoDto, Member member)throws Exception{
//      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//      String name = authentication.getName();
//      spring security 안 씀
        Request request = requestRepository.findById(payInfoDto.getRequest_id())
                .orElseThrow(() -> new Exception("해당 요청이 존재하지 않습니다."));

        Long id = member.getId();

        HttpHeaders headers=new HttpHeaders();

        /** 요청 헤더 */
        String auth = "SECRET_KEY " + adminKey;
        headers.set("Authorization", auth);
        headers.set("Content-Type","application/json");

        /** 요청 Body */
        PayRequest payRequest = getReadyRequest(id, payInfoDto);
        // PayRequest 객체를 JSON 문자열로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        String payRequestJson = objectMapper.writeValueAsString(payRequest.getMap());
        log.info("PayRequest JSON: {}", payRequestJson);

        /** Header와 Body 합쳐서 RestTemplate로 보내기 위한 밑작업 */
        HttpEntity<String> urlRequest = new HttpEntity<>(payRequestJson, headers);

        /** RestTemplate로 Response 받아와서 DTO로 변환후 return */
        RestTemplate rt = new RestTemplate();
        PayReadyResDto payReadyResDto = rt.postForObject(payRequest.getUrl(),
                urlRequest,
                PayReadyResDto.class);
        // 수정 해야함 member.updateTid(payReadyResDto.getTid());
        // 주문 테이블 생성 -----my
        Optional.ofNullable(payReadyResDto)
                .map(PayReadyResDto::getTid)
                .ifPresentOrElse(
                        tid -> {
                            Order newOrder = Order.toEntity(member, request, tid);
                            orderRepository.save(newOrder);
                        },
                        () -> {
                            // 예외를 던지거나 에러 로그 기록
                            throw new IllegalStateException("Failed to create order: payReadyResDto is null or TID is missing.");
                        }
                );
        return payReadyResDto;
    }

    @Transactional
    public PayApproveResDto getApprove(String pgToken, String orderId)throws Exception{

        // orderId는 member_id _ request_id가 연결된 문자열
        // ex) member_id가 3 request_id가 4면 id는 "3_4"
        // "_"를 기준으로 문자열을 분리
        String[] parts = orderId.split("_");

        // 첫 번째 정수 member_id
        String firstPart = parts[0];
        Long member_id = Long.parseLong(firstPart);

        // 두 번째 정수 request_id
        String secondPart = parts[1];
        Long request_id = Long.parseLong(secondPart);

        //String tid = member.getTid(); tid
        // 윗 줄 처럼 member에 tid를 저장하지 않고 tid를 담을 order 테이블을 만들었음.
        Order order = orderRepository.findByMemberIdAndRequestRequestId(member_id, request_id);

        HttpHeaders headers = new HttpHeaders();
        String auth = "SECRET_KEY " + adminKey;

        /** 요청 헤더 */
        headers.set("Authorization", auth);
        headers.set("Content-Type", "application/json");

        /** 요청 Body */
        PayRequest payRequest = getApproveRequest(order.getTid(), orderId, pgToken);
        ObjectMapper objectMapper = new ObjectMapper();
        String payRequestJson = objectMapper.writeValueAsString(payRequest.getMap());
        /** Header와 Body 합쳐서 RestTemplate로 보내기 위한 밑작업 */
        HttpEntity<String> requestEntity = new HttpEntity<>(payRequestJson, headers);

        // 요청 보내기
        RestTemplate rt = new RestTemplate();
        PayApproveResDto payApproveResDto = rt.postForObject(payRequest.getUrl(), requestEntity, PayApproveResDto.class);
        log.info("제발 나와라..={}", payApproveResDto);
        return payApproveResDto;
    }


}