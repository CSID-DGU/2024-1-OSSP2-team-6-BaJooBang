package ossp_bajoobang.bajoobang.service;

import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.BaDream;
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
public class InquiryService {
    private MemberRepository memberRepository;
    private RequestRepository requestRepository;
    private BaDreamRepository baDreamRepository;

    public List<BaDream> getBaDreamsByMember(Member member) {
        List<Request> requests = requestRepository.findByMember(member);
        return baDreamRepository.findByRequestIn(requests);
    }

    public List<Map<String, Object>> getInquires(Member member) {
        List<BaDream> baDreams = getBaDreamsByMember(member);
        List<Map<String, Object>> inquiries = new ArrayList<>();
        for (BaDream baDream : baDreams) {
            Map<String, Object> inquiry = new HashMap<>();
            //inquiry.put("address", "");
            inquiry.put("name", baDream.getMember().getName()); // 발품인 이름
            //inquiry.put("star", ""); // 별점
            inquiry.put("message", baDream.getMessage()); // 메세지
            inquiries.add(inquiry);
        }
        return inquiries;
    }
}
