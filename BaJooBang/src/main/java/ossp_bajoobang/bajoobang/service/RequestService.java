package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.PlusRequest;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.dto.RequestDTO;
import ossp_bajoobang.bajoobang.repository.PlusRequestRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;

@Service
@RequiredArgsConstructor
public class RequestService {
    private final RequestRepository requestRepository;
    private final PlusRequestRepository plusRequestRepository;

    public void saveRequest(RequestDTO requestDTO){
        Request request = Request.toEntity(requestDTO);
//        PlusRequest plusRequest = PlusRequest.toEntity(requestDTO);

        requestRepository.save(request);
//        plusRequestRepository.save(plusRequest);
    }
}
