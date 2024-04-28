package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.RequestDTO;
import ossp_bajoobang.bajoobang.service.HouseService;
import ossp_bajoobang.bajoobang.service.RequestService;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RequestController {
    private final RequestService requestService;
    private final HouseService houseService;

    @PostMapping("/request-form")
    public String requestForm(@RequestBody RequestDTO requestDTO, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if (session != null) {
            Member member = (Member) session.getAttribute("loginMember");
            requestService.saveRequest(requestDTO, member);
            return "GOOD";
        }
        else {
            return "FAIL";
        }
    }

    @GetMapping("/request-form")
    @ResponseBody
    public ArrayList<Object> requestForm(@RequestParam Long house_id){
        ArrayList<Object> address = houseService.getAddress(house_id);
        return address;
    }
}
