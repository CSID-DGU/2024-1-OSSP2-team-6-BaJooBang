package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.PlusRequest;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.dto.*;
import ossp_bajoobang.bajoobang.service.BaDreamService;
import ossp_bajoobang.bajoobang.service.BalpoomFileService;
import ossp_bajoobang.bajoobang.service.BalpoomService;
import ossp_bajoobang.bajoobang.service.RequestService;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class BalpoomController {

    private final BalpoomService balpoomService;
    private final RequestService requestService;
    private final BaDreamService baDreamService;
    private final BalpoomFileService balpoomFileService;

    @GetMapping("/balpoom")
    // 우성 S
    public List<AlarmRequestDTO> getBalPoom(@RequestParam Long local_id,
                                            HttpServletRequest request){
        Map<String, Object> response = new HashMap<>();
        HttpSession session = request.getSession(false);
        MemberDTO memberDTO = null;

        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            memberDTO = MemberDTO.toDTO(member);
            // 알림 리스트 받아오기
//            List<RequestDTO> receivedRequests = requestService
//                    .getAlramList(memberDTO.getId());
//            response.put("receivedRequests", receivedRequests);

        }
        // local_id에 있는 요청서 다 불러오고,
        // 그 요청서에서 session과 비교해서 hasNotification 만들어줘야할 듯.
        List<HouseDTO> balpoomHouseList = balpoomService.getBalpoom(local_id);

        List<Request> requestList = requestService.getRequest();
        List<AlarmRequestDTO> alarmRequestDTOList = balpoomService.getAlarmBalpoom(requestList, balpoomHouseList, memberDTO);
        return alarmRequestDTOList;
    }
    // 우성 E

//    public HouseDTO getBalPoom(@RequestParam Long local_id){
//        HouseDTO houseDTO = balpoomService.getBalpoom(local_id);
//        return houseDTO;
//    }

    // 발품 신청
    @PatchMapping("/request")
    public String patchRequest(@RequestParam Long request_id,
                               @RequestBody RequestPatchForm requestPatchForm,
                               HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        log.info("========================");
        if (session != null) {
            Member member = (Member) session.getAttribute("loginMember");
            // 바드림에 저장
            log.info("requestPatchForm.getMessage()={}", requestPatchForm.getMessage());
            baDreamService.createBaDream(member, request_id, requestPatchForm.getMessage());
            return "GOOD";
        }
        return "FAIL";
    }

    // 발품서 작성 페이지 이동 시
    @GetMapping("/balpoom-form/{request_id}")
    public BalpoomForm seeBalpoomDetail(@PathVariable Long request_id, HttpServletRequest request){
        HttpSession session = request.getSession(false); // 발품자 session
        Member member = (Member) session.getAttribute("loginMember");

        BalpoomForm balpoomForm = requestService.getRequestInfo(request_id);
        return balpoomForm;
    }

    // 발품서 작성
    @PatchMapping(path = "/balpoom-form/{request_id}", consumes = {"multipart/form-data"})
    public ResponseEntity<String> postBalpoomForm(@RequestPart("jsonData") BalpoomForm balpoomForm, @RequestPart("requests") List<MultipartFile> requests) throws IOException {
        log.info("111111111111111111111111111111111");
        Long request_id = 1L;
        requestService.patchInfo(request_id, balpoomForm);
//        List<PlusRequest> plusRequestList = balpoomForm.getPlusRequestList();
        log.info("2222222222222222222222222222");

//        for(RequestFileForm request : requests){
//            String answer = request.getAnswer();
//            List<MultipartFile> files = request.getFiles();
//            log.info("3333333333333333333333333");
//
//            balpoomFileService.saveFile(files);
//        }

        balpoomFileService.saveFile(requests);
        log.info("3333333333333333333333333");

        return ResponseEntity.ok("Files and data uploaded successfully!");
    }
}
