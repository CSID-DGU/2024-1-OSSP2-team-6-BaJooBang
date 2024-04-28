package ossp_bajoobang.bajoobang.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.PlusRequest;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.dto.RequestDTO;
import ossp_bajoobang.bajoobang.repository.PlusRequestRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class RequestService {
    private final RequestRepository requestRepository;
    private final PlusRequestRepository plusRequestRepository;

    public void saveRequest(RequestDTO requestDTO){
        Request request = Request.toEntity(requestDTO);
        requestRepository.save(request);
        log.info(String.valueOf(request.getRequestId()));
        PlusRequest plusRequest = PlusRequest.toEntity(requestDTO.getPlus_list());
        plusRequest.setRequest(request);
        plusRequestRepository.save(plusRequest);
    }
}
