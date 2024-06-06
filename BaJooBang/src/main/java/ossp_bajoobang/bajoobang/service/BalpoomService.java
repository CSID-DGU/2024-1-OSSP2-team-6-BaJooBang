package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.dto.AlarmRequestDTO;
import ossp_bajoobang.bajoobang.dto.HouseDTO;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.repository.AlarmRepository;
import ossp_bajoobang.bajoobang.repository.HouseRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BalpoomService {

    private final HouseRepository houseRepository;
    private final AlarmRepository alarmRepository;
    private final RequestRepository requestRepository;

    public List<HouseDTO> getBalpoom(Long local_id){
        List<House> houseList = houseRepository.findByLocalIdAndRequest(local_id);
        List<HouseDTO> dtoList = new ArrayList<>();

        for(House house : houseList){
            dtoList.add(HouseDTO.toDTO(house));
        }
        return dtoList;
    }

    public List<AlarmRequestDTO> getAlarmBalpoom(List<Request> requestList, List<HouseDTO> balpoomHouseList, MemberDTO memberDTO){
        List<AlarmRequestDTO> alarmRequestDTOList = new ArrayList<>();
        for(Request request : requestList){
            AlarmRequestDTO alarmRequestDTO = new AlarmRequestDTO();

            boolean checkAlarm = false;

            // 요청서의
            List<Long> alarmMemIdList = alarmRepository.findMemberIdByRequestId(request.getRequestId());
            House requestHouse = requestRepository.findHouseByRequestId(request.getRequestId());

            if(alarmMemIdList.contains(memberDTO.getId())){
                checkAlarm = true;
                log.info("++++++++++++++++++++++++++++++++++++++++");
            }

            alarmRequestDTOList.add(alarmRequestDTO.toDTO(request, requestHouse, checkAlarm));
        }

        return alarmRequestDTOList;
    }
}
