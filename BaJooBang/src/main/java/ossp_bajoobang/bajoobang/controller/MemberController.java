package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.InquiryAcceptForm;
import ossp_bajoobang.bajoobang.dto.MypageDTO;
import ossp_bajoobang.bajoobang.service.*;

import java.util.*;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final InquiryService inquiryService;
    private final RegisteredService registeredService;
    private final FootworkService footworkService;
    private final AlarmService alarmService;
    private final LikeyService likeyService;

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

    // 나는 요청인이고 발품 신청 들어온 것 수락
    @PatchMapping("/inquiry/accept")
    public String accpetInquiry(HttpServletRequest request,
                                @RequestBody InquiryAcceptForm acceptForm) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 요청서에 발품인 아이디 넣어주고 매칭 상태값에 매칭완료 넣기
            inquiryService.accept(acceptForm.getRequest_id(), acceptForm.getWorker_id());
            return "요청을 수락하였습니다.";
        }
        else {
            return "FAIL";
        }
    }

//    @DeleteMapping ("/inquiry/reject")
//    public String rejectInquiry(HttpServletRequest request,
//                                @RequestBody Long request_id,
//                                @RequestBody Long worker_id) {
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            // 요청서에 발품인 아이디 넣어주고 매칭 상태값에 매칭완료 넣기
//            inquiryService.reject(request_id, worker_id);
//            return "요청을 거절하였습니다.";
//        }
//        else {
//            return "FAIL";
//        }
//    }

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

    // 등록매물에서 매칭 정보 확인
    @GetMapping("/registered/matching")
    public ResponseEntity<?> getMatching(HttpServletRequest request,
                                         @RequestHeader Long request_id) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 매칭 정보 가져오기
            Map<String, Object> matchingInfo = registeredService.getMatchingInfo(member, request_id);
            return ResponseEntity.ok(matchingInfo);
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

    // 신청발품에서 매칭 정보 확인
    @GetMapping("/footwork/matching")
    public ResponseEntity<?> getMatchingOfFootwork(HttpServletRequest request,
                                                   @RequestParam Long request_id) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 매칭 정보 가져오기
            Map<String, Object> matchingInfo = footworkService.getMatchingInfo(member, request_id);
            return ResponseEntity.ok(matchingInfo);
        }
        else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    // 알람 리스트 보내기
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

    // 마이페이지 찜리스트
    @GetMapping("/like")
    public ResponseEntity<?> getLikeList(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 찜 리스트 가져오기
            List<Map<String, Object>> likeinfo = likeyService.getLikeInfo(member);
            return ResponseEntity.ok(likeinfo);
        }
        else {
            return ResponseEntity.status(401).body("Unauthorized");
        }
    }

    // 별점 평가 api
    @PatchMapping("/star")
    public ResponseEntity<?> patchStar(HttpServletRequest request,
                                       @RequestParam Float star) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            // 별점 갱신하기
            memberService.calculateAvgStar(member, star);
            return ResponseEntity.ok("GOOD");
        }
        return ResponseEntity.status(401).body("Unauthorized");
    }
}
