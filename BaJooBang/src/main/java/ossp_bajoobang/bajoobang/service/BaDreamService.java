package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.BaDream;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.BaDreamRepository;
import ossp_bajoobang.bajoobang.repository.MemberRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;


@Service
@RequiredArgsConstructor
@Slf4j
public class BaDreamService {
    private final RequestRepository requestRepository;
    private final BaDreamRepository baDreamRepository;
    private final MemberRepository memberRepository;

    public void createBaDream(Member member, Long requestId, String message) {
        member = memberRepository.findById(member.getId()).orElseThrow(() -> new IllegalArgumentException("Member not found"));
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + requestId));
        BaDream baDream = new BaDream();
        baDream.setMember(member);
        member.setBaDream(baDream);
        baDream.setRequest(request);
        request.setBaDream(baDream);
        baDream.setMessage(message);
        baDreamRepository.save(baDream);
    }
}
