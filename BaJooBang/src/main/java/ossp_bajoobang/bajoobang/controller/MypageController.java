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
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.dto.MypageDTO;
import ossp_bajoobang.bajoobang.service.*;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MypageController {
    private final MemberService memberService;
    private final InquiryService inquiryService;
    private final RegisteredService registeredService;
    private final FootworkService footworkService;
    private final AlarmService alarmService;

    // 마이페이지
    @GetMapping
    public ResponseEntity<?> getMypage(HttpServletRequest request) {
        // 멤버 정보
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            MypageDTO mypageDTO = memberService.getMypageDTO(member);
            return ResponseEntity.ok(mypageDTO);
        }
        else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }
    // 신청조회
    @GetMapping("/inquiry")
    public ResponseEntity<?> getInquiry(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 봐드림 있는 요청서만 가져오기
            List<Map<String, Object>> inquiries = inquiryService.getInquiries(member);
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

    // 신청 발품 (내가 신청한 발품 리스트)
    @GetMapping("/footwork")
    public ResponseEntity<?> getFootwork(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 내가 등록한 요청 가져오기
            List<Map<String, Object>> footworks = footworkService.getFootworks(member);
            return ResponseEntity.ok(footworks);
        }
        else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    @GetMapping("/alarm")
    public ResponseEntity<?> getAlarm(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 알람 가져오기
            List<Map<String, Object>> alarms = alarmService.getAlarmList(member);
            return ResponseEntity.ok(alarms);
        }
        else {
            return ResponseEntity.status(401).body("Unauthorized");
        }


    }
}
