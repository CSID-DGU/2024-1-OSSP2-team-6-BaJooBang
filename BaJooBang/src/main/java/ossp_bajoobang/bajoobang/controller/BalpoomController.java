package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ossp_bajoobang.bajoobang.domain.File;
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
import java.util.stream.Collectors;

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

//        if(){
//
//        }
        return balpoomForm;
    }

    // 발품서 작성
    // + 4. 각 답변마다 필요한 파일 갯수로
    @PatchMapping(path = "/balpoom-form")
    public void testImage(@RequestPart("request_id") Long request_id,
                          @RequestPart("files") List<MultipartFile> files,
                          @RequestPart("jsonData") BalpoomForm balpoomForm,
                          @RequestPart("plusAnswerData") PlusAnswerForm plusAnswerForm) throws IOException {
        // plusAnswerForm.answers = ["답변1","답변2",...,"답변n"] -> plus request 테이블
        // plusAnswerForm.filecounts = [2, 0, ... , 1] -> plus request 테이블
        requestService.patchInfo(request_id, balpoomForm);
        requestService.patchAnswerFilecounts(plusAnswerForm, request_id);
        balpoomFileService.saveFile(files, request_id);

    }

    // + 3. 리턴값 수정되주어야 함.
    // 요청서 픽스 -> 이미지 뿌려주기
    @GetMapping(path = "/test-imageget")
    public ResponseEntity<FinishForm> getTestTimage(@RequestParam Long request_id){
//        "answer1" : {파일경로1, 파일경로2, 파일경로3}
//        "answer2" : {파일경로1, 파일경로2, 파일경로3}
//        "answer3" : {파일경로1}
//        "plusRequest1" : {"설명"}


        List<File> files = balpoomFileService.returnFileList(request_id);
        List<FileDto> fileDtos = files.stream()
                .map(this::convertToFileDto)
                .collect(Collectors.toList());

        FinishForm finishForm = new FinishForm();
        BalpoomForm balpoomForm = requestService.getRequestInfo(request_id);
        List<PlusRequest> plusRequestList = requestService.getPlusRequestList(request_id);
        PlusReqeustForFinishDTO plusReqeustForFinishDTO = PlusReqeustForFinishDTO.toDTO(plusRequestList);

        finishForm.setFileDtos(fileDtos);
        finishForm.setBalpoomForm(balpoomForm);
        finishForm.setPlusReqeustForFinishDTO(plusReqeustForFinishDTO);

        return ResponseEntity.ok(finishForm);
    }

    // + 2. 함수 위치 바꿀 수 있으면 바꾸고.
    private FileDto convertToFileDto(File file) {
        return new FileDto(file.getFile_id(), file.getFilename(), file.getFilepath(), file.getSize(), file.getUploadedDate());
    }
}
