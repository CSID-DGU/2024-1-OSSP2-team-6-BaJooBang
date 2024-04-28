package ossp_bajoobang.bajoobang.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.PlusRequest;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.dto.RequestDTO;
import ossp_bajoobang.bajoobang.repository.PlusRequestRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;


@Service
@RequiredArgsConstructor
@Slf4j
public class RequestService {
    private final RequestRepository requestRepository;
    private final PlusRequestRepository plusRequestRepository;

    public void saveRequest(RequestDTO requestDTO, Member member){
        Request request = Request.toEntity(requestDTO, member);
        log.info(String.valueOf(member));
        request.setMember(member); // member랑 request랑 조인할 때 쓰일듯 아직 맞는 건지 모름
        requestRepository.save(request);

        // test
        for(int i=0; i< requestDTO.getPlus_list().size(); i++){
            PlusRequest plus = PlusRequest.toEntity2(requestDTO.getPlus_list().get(i));
            plus.setRequest(request);
            plusRequestRepository.save(plus);
        }

        /*PlusRequest plusRequest = PlusRequest.toEntity(requestDTO.getPlus_list());
        plusRequest.setRequest(request);
        plusRequestRepository.save(plusRequest);*/

    }
}
