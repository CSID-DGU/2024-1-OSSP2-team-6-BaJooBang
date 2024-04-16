package ossp_bajoobang.bajoobang.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ossp_bajoobang.bajoobang.dto.HouseDTO;
import ossp_bajoobang.bajoobang.service.HouseService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class HouseController {
    private final HouseService houseService;

    @GetMapping("/helpinfo")
    @ResponseBody
    public List<HouseDTO> getHouse(@RequestParam Long local_id){
        List<HouseDTO> houseList = houseService.getHouse(local_id);
        return houseList;
    }

}


