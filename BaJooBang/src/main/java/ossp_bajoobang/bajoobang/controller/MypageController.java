package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.service.InquiryService;
import ossp_bajoobang.bajoobang.service.MemberService;
import ossp_bajoobang.bajoobang.service.RegisteredService;
import ossp_bajoobang.bajoobang.service.RequestService;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MypageController {
    private final MemberService memberService;
    private final RequestService requestService;
    private final InquiryService inquiryService;
    private final RegisteredService registeredService;


    // 신청조회
    @GetMapping("/inquiry")
    public ResponseEntity<?> getInquiry(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 봐드림 있는 요청서만 가져오기
            List<Map<String, Object>> inquiries = inquiryService.getInquires(member);
            return ResponseEntity.ok(inquiries);
        }
        else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
    // 등록매물
    @GetMapping("/registered")
    public ResponseEntity<?> getRegistered(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 내가 등록한 요청 가져오기
            List<Map<String, Object>> registeredList = registeredService.getRegistered(member);
            return ResponseEntity.ok(registeredList);
        }
        else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

}
