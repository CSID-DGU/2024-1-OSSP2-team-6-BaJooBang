package ossp_bajoobang.bajoobang.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.dto.HouseDTO;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.dto.RequestDTO;
import ossp_bajoobang.bajoobang.repository.AlarmRepository;
import ossp_bajoobang.bajoobang.repository.HouseRepository;
import ossp_bajoobang.bajoobang.repository.MemberRepository;
import ossp_bajoobang.bajoobang.service.AlarmService;
import ossp_bajoobang.bajoobang.service.HouseService;
import ossp_bajoobang.bajoobang.service.MemberService;
import ossp_bajoobang.bajoobang.service.RequestService;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RequestController {
    private final HouseRepository houseRepository;
    private final RequestService requestService;
    private final HouseService houseService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final AlarmService alarmService;


    // 요청서 작성 완료 시.
    @PostMapping("/request-form")
    public String requestForm(@RequestPart("jsonData") RequestDTO requestDTO, HttpServletRequest request, @RequestParam Long house_id) throws IOException {
        HttpSession session = request.getSession(false);
        log.info("---------------");
        log.info("house id: " + house_id);
        if (session != null) {
            ObjectMapper objectMapper = new ObjectMapper();
            log.info(requestDTO.getHouse_address());

            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 퀴리 파라미터로 매물 가져오기
            House house = houseRepository.findByHouseId(house_id);
            // 새로운 요청서 저장

            // + 상태값 저장해주는 거 해줘야함.
            Request newRequest = requestService.saveRequest(requestDTO, member, house);

            // 주어진 house의 위도와 경도로부터 가까운 회원 20명 검색
            List<Member> nearbyMembers = memberRepository.findTop20MembersByDistance(house.getLatitude(), house.getLongitude());
            nearbyMembers.forEach(m -> log.info("Member Address: " + m.getAddress()));

            List<Member> alarmMembers = memberService.findMembersByTravelTime(nearbyMembers, house.getLatitude(), house.getLongitude());

            for(Member mem : alarmMembers){
                alarmService.saveMemberRequest(mem, newRequest);
            }
            log.info("member.getRequest() = {}", member.getRequests());
            return "GOOD";
        }
        else {
            // 로그인 안 한 사용자
            return "FAIL";
        }
    }

    @GetMapping("/request-form")
    @ResponseBody
    public ArrayList<Object> requestForm(@RequestParam Long house_id){
        ArrayList<Object> address = houseService.getAddress(house_id);
        return address;
    }

    // 발품지도에 뜬 각각의 매물에 대한 요청 리스트
    @GetMapping("/requests")
    @ResponseBody
    public List<RequestDTO> GetRequests(@RequestParam Long house_id){
        List<RequestDTO> requestDTOList = houseService.getRequests(house_id);
        return requestDTOList;
    }
}
