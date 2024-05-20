package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.dto.MypageDTO;
import ossp_bajoobang.bajoobang.dto.RequestDTO;
import ossp_bajoobang.bajoobang.dto.SignupForm;
import ossp_bajoobang.bajoobang.service.MemberService;
import ossp_bajoobang.bajoobang.service.RequestService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final RequestService requestService;
    @GetMapping("/mypage")
    public MypageDTO getMypage(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            //memberDTO랑, 등록매물, 신청조회
            MemberDTO memberDTO = MemberDTO.toDTO(member);
            // 등록 매물 어캐 받아오지
            List<RequestDTO> myRequests = requestService
                    .findMyRequests(memberDTO.getId());
            List<RequestDTO> receivedRequests = requestService
                    .findReceivedRequests(memberDTO.getId());
            return MypageDTO.toDTO(memberDTO, myRequests, receivedRequests);
        }
        else {
            // 로그인 안 한 사용자
            return null;
        }
    }
   /* @PostMapping("/signup")
    public String signup(@RequestBody SignupForm signupForm){
        memberService.register(signupForm);

        return "GOOD";
    }*/
}
