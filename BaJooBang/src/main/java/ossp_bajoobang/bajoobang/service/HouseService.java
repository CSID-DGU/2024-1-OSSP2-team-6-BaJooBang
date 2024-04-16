package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.dto.HouseDTO;
import ossp_bajoobang.bajoobang.repository.HouseRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HouseService {

    private final HouseRepository houseRepository;

    public List<HouseDTO> getHouse(Long local_id){
        List<House> houseList = houseRepository.findByLocalId(local_id);
        List<HouseDTO> dtoList = new ArrayList<>();

        for (House house : houseList){
            dtoList.add(HouseDTO.toDTO(house));
        }

        return dtoList;
    }

}
