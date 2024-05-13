package ossp_bajoobang.bajoobang.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ossp_bajoobang.bajoobang.dto.HouseDTO;
import ossp_bajoobang.bajoobang.service.BalpoomService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BalpoomController {

    private final BalpoomService balpoomService;

    @GetMapping("/balpoom")
    @ResponseBody
    // 우성 S
    public List<HouseDTO> getBalPoom(@RequestParam Long local_id){
        List<HouseDTO> balpoomHouseList = balpoomService.getBalpoom(local_id);
        return balpoomHouseList;
    }
    // 우성 E

//    public HouseDTO getBalPoom(@RequestParam Long local_id){
//        HouseDTO houseDTO = balpoomService.getBalpoom(local_id);
//        return houseDTO;
//    }


}
