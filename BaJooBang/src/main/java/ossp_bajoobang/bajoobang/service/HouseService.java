package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.dto.HouseDTO;
import ossp_bajoobang.bajoobang.dto.RequestDTO;
import ossp_bajoobang.bajoobang.repository.HouseRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    public HouseDTO getHouseDetail(Long house_id){
        House house = houseRepository.findByHouseId(house_id);
        return HouseDTO.toDTO(house);
    }

    public ArrayList<Object> getAddress(long house_id){
        ArrayList<Object> addressList = new ArrayList<>();
        House house = houseRepository.findByHouseId(house_id);
        addressList.add(house.getContent());
        addressList.add(house.getStair());
        return addressList;
    }

    public List<RequestDTO> getRequests(Long house_id) {
        List<RequestDTO> requestListDTO = new ArrayList<>();
        House house = houseRepository.findByHouseId(house_id);
        List<Request> requests = house.getRequests();
        for (Request request : requests) {
            requestListDTO.add(RequestDTO.toDTO(request));
        }
        return requestListDTO;
    }



}
