package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.service.KakaoPayService;
import ossp_bajoobang.bajoobang.pay.PayInfoDto;
import ossp_bajoobang.bajoobang.pay.response.BaseResponse;
import ossp_bajoobang.bajoobang.pay.response.PayApproveResDto;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class KakaoPayController {

    private final KakaoPayService kakaoPayService;

    /** 결제 준비 redirect url 받기 --> 상품명과 가격을 같이 보내줘야함 */
    @GetMapping("/ready")
    public ResponseEntity<?> getRedirectUrl(@RequestBody PayInfoDto payInfoDto,
                                            HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            Member member = (Member) session.getAttribute("loginMember");
            try {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(kakaoPayService.getRedirectUrl(payInfoDto, member));
            }
            catch(Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new BaseResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
            }
        }
        else return ResponseEntity.status(401).body("Unauthorized");
    }
    /**
     * 결제 성공 pid 를  받기 위해 request를 받고 pgToken은 rediret url에 뒤에 붙어오는걸 떼서 쓰기 위함
     */
    @GetMapping("/success/{orderId}") // {id+request_id}
    public ResponseEntity<?> afterGetRedirectUrl(@PathVariable("orderId")String orderId,
                                                 @RequestParam("pg_token") String pgToken) {
        try {
            PayApproveResDto kakaoApprove = kakaoPayService.getApprove(pgToken, orderId);

//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(kakaoApprove);
            // 일단 결제 완료되면 마이페이지로 리다이렉트
            return ResponseEntity.status(302).header("Location", "/member").build();
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(),e.getMessage()));
        }
    }

    /**
     * 결제 진행 중 취소
     */
    @GetMapping("/cancel")
    public ResponseEntity<?> cancel() {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                .body(new BaseResponse<>(HttpStatus.EXPECTATION_FAILED.value(),"사용자가 결제를 취소하였습니다."));
    }

    /**
     * 결제 실패
     */
    @GetMapping("/fail")
    public ResponseEntity<?> fail() {

        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                .body(new BaseResponse<>(HttpStatus.EXPECTATION_FAILED.value(),"결제가 실패하였습니다."));

    }

}