package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.HouseDTO;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.dto.RequestDTO;
import ossp_bajoobang.bajoobang.dto.RequestPatchForm;
import ossp_bajoobang.bajoobang.service.BaDreamService;
import ossp_bajoobang.bajoobang.service.BalpoomService;
import ossp_bajoobang.bajoobang.service.RequestService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BalpoomController {

    private final BalpoomService balpoomService;
    private final RequestService requestService;
    private final BaDreamService baDreamService;

    @GetMapping("/balpoom")
    // 우성 S
    public ResponseEntity<?> getBalPoom(@RequestParam Long local_id,
                                     HttpServletRequest request){
        Map<String, Object> response = new HashMap<>();
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            MemberDTO memberDTO = MemberDTO.toDTO(member);
            // 알림 리스트 받아오기
            List<RequestDTO> receivedRequests = requestService
                    .getAlramList(memberDTO.getId());
            response.put("receivedRequests", receivedRequests);
        }
        // 발품 매물 리스트 받아오기
        List<HouseDTO> balpoomHouseList = balpoomService.getBalpoom(local_id);
        response.put("balpoomHouseList", balpoomHouseList);
        return ResponseEntity.ok(response);
    }
    // 우성 E

//    public HouseDTO getBalPoom(@RequestParam Long local_id){
//        HouseDTO houseDTO = balpoomService.getBalpoom(local_id);
//        return houseDTO;
//    }

    // 발품 신청
    @PatchMapping("/request")
    public String patchRequest(@RequestParam Long request_id,
                               RequestPatchForm requestPatchForm,
                               HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            Member member = (Member) session.getAttribute("loginMember");
            // 바드림에 저장
            baDreamService.createBaDream(member, request_id, requestPatchForm.getMessage());
            return "GOOD";
        }
        return "FAIL";
    }


}
