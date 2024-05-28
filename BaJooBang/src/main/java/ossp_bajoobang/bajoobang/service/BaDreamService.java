package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.BaDream;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.BaDreamRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;


@Service
@RequiredArgsConstructor
@Slf4j
public class BaDreamService {
    private final RequestRepository requestRepository;
    private final BaDreamRepository baDreamRepository;

    public void createBaDream(Member member, Long requestId, String message) {
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + requestId));
        BaDream baDream = new BaDream();
        baDream.setMember(member);
        baDream.setRequest(request);
        baDream.setMessage(message);
        baDreamRepository.save(baDream);
    }
}
