package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.BaDream;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.BaDreamRepository;
import ossp_bajoobang.bajoobang.repository.MemberRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InquiryService {
    private final MemberRepository memberRepository;
    private final RequestRepository requestRepository;
    private final BaDreamRepository baDreamRepository;

    // 요청인을 파라미터에 넣으면 요청인이 쓴 요청서에 대한 발품신청(바드림)들을 뽑아줌
    public List<BaDream> getBaDreamsByMember(Member member) {
        List<Request> requests = requestRepository.findByMember(member);
        return baDreamRepository.findByRequestIn(requests);
    }

    public List<Map<String, Object>> getInquires(Member member) {
        List<BaDream> baDreams = getBaDreamsByMember(member);
        List<Map<String, Object>> inquiries = new ArrayList<>();
        for (BaDream baDream : baDreams) {
            Request request = baDream.getRequest();
            House house = request.getHouse();
            Map<String, Object> inquiry = new HashMap<>();
            inquiry.put("address", house.getContent());
            inquiry.put("name", baDream.getMember().getName()); // 발품인 이름
            inquiry.put("star", ""); // 별점
            inquiry.put("message", baDream.getMessage()); // 메세지
            inquiries.add(inquiry);
        }
        return inquiries;
    }
}
