package ossp_bajoobang.bajoobang.service;

import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.BaDream;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.BaDreamRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;


@Service
public class BaDreamService {
    private RequestRepository requestRepository;

    public void createBaDream(Member member, Long balPoomInId, String message) {
        Request request = requestRepository.findById(balPoomInId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid balPoomInId: " + balPoomInId));
        BaDream baDream = new BaDream();
        baDream.setMember(member);
        baDream.setRequest(request);
        baDream.setMessage(message);
    }
}
