package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.HouseDTO;
import ossp_bajoobang.bajoobang.service.HouseService;
import ossp_bajoobang.bajoobang.service.LikeyService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HouseController {
    private final HouseService houseService;
    private final LikeyService likeyService;

    @GetMapping("/helpinfo")
    @ResponseBody
    public List<HouseDTO> getHouse(@RequestParam Long local_id){
        List<HouseDTO> houseList = houseService.getHouse(local_id);
        return houseList;
    }

    @GetMapping("/helpinfo/detail")
    @ResponseBody
    public HouseDTO getHouseDetail(@RequestParam Long house_id){
        // 아마도 매물 정보 text 처리하려면 HouseDetailDTO랑 House 테이블 수정 필요할 거로 보임.
        HouseDTO houseDTO = houseService.getHouseDetail(house_id);
        return houseDTO;
    }

    @GetMapping("/like")
    public String setLike(HttpServletRequest request,
                          @RequestParam Long house_id) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 세션에서 멤버를 꺼내오기
            Member member = (Member) session.getAttribute("loginMember");
            likeyService.setLike(member, house_id);
            return "GOOD";
        }
        else {
            return "FAIL";
        }
    }
}


