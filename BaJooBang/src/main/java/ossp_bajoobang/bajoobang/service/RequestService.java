package ossp_bajoobang.bajoobang.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossp_bajoobang.bajoobang.domain.*;
import ossp_bajoobang.bajoobang.dto.BalpoomForm;
import ossp_bajoobang.bajoobang.dto.RequestDTO;
import ossp_bajoobang.bajoobang.repository.AlarmRepository;
import ossp_bajoobang.bajoobang.repository.PlusRequestRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class RequestService {
    private final RequestRepository requestRepository;
    private final PlusRequestRepository plusRequestRepository;

    public Request saveRequest(RequestDTO requestDTO, Member member, House house, String address){
        Request request = Request.toEntity(requestDTO, member, house, address);
        // 저장할 때, house_id와 함께 저장해주어야 함. => 테이블도 join해주어야 함!!! --> 위에 함
        member.setRequest(request);
        house.setRequest(request);
        // 매칭 상태값 매칭 전으로 초기화
        request.setStatus("매칭 전");
        Request saveRequest = requestRepository.save(request);

        // test
        for(int i=0; i< requestDTO.getPlus_list().size(); i++){
            PlusRequest plus = PlusRequest.toEntity2(requestDTO.getPlus_list().get(i));
            plus.setRequest(request);
            plusRequestRepository.save(plus);
        }

        /*PlusRequest plusRequest = PlusRequest.toEntity(requestDTO.getPlus_list());
        plusRequest.setRequest(request);
        plusRequestRepository.save(plusRequest);*/

        return saveRequest;
    }

//    // 등록매물 리스트
//    public List<RequestDTO> findMyRequests(Long memberId) {
//        List<RequestDTO> myRequestsDTO = new ArrayList<>();
//        List<Request> requestList = requestRepository.findByMemberId(memberId);
//
//        for (Request request : requestList) {
//            myRequestsDTO.add(RequestDTO.toDTO(request));
//        }
//        return myRequestsDTO;
//    }


    public BalpoomForm getRequestInfo(Long request_id){
        Request request = requestRepository.findById(request_id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + request_id));
        List<PlusRequest> plusRequestList = plusRequestRepository.findByRequest(request);

        return BalpoomForm.toDTO(plusRequestList, request);
    }

    public List<Request> getRequest(){
        return requestRepository.findAll();
    }

    @Transactional
    public void patchInfo(Long request_id, BalpoomForm balpoomForm){
        Request request = requestRepository.getReferenceById(request_id);
        request.setPowerShower(balpoomForm.getPowerShower());
        request.setPowerWater(balpoomForm.getPowerWater());
        request.setPowerWash(balpoomForm.getPowerWash());
        request.setTimeWater(balpoomForm.getTimeWater());
        request.setMoldLiving(balpoomForm.getMoldLiving());
        request.setMoldRest(balpoomForm.getMoldRest());
        request.setMoldVeranda(balpoomForm.getMoldVeranda());
        request.setMoldShoes(balpoomForm.getMoldShoes());
        request.setMoldWindow(balpoomForm.getMoldWindow());
        // 매칭 상태값 -> 작성 완료
        request.setStatus("작성 완료");
        // transactional로 대체
        // requestRepository.save(request);


//        List<PlusRequest> plusRequestList = plusRequestRepository.findByRequest(request);
//        List<String> plusRequestAnswers = balpoomForm.getPlusAnswerList();
//
//        for (int i = 0; i < plusRequestList.size(); i++) {
//            PlusRequest plusRequest = plusRequestList.get(i);
//            plusRequest.setPlus_answer(plusRequestAnswers.get(i));
//            plusRequestRepository.save(plusRequest);
//        }
    }
}
