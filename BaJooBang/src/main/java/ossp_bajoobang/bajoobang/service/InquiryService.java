package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    private final RequestRepository requestRepository;
    private final BaDreamRepository baDreamRepository;
    private final MemberRepository memberRepository;

    // 요청인을 파라미터에 넣으면 요청인이 쓴 요청서에 대한 발품신청(바드림)들을 뽑아줌
    public List<BaDream> getBaDreamsByMember(Member member) {
        List<Request> requests = requestRepository.findByMember(member);
        List<Request> requestsBeforeMatching = new ArrayList<>();
        // 매칭 전인 것만 넣을 것
        for (Request request : requests) {
            if (request.getStatus() != null) {
                if (request.getStatus().equals("매칭 전")) {
                    requestsBeforeMatching.add(request);
                }
            }
        }
        return baDreamRepository.findByRequestIn(requestsBeforeMatching);
    }

    public List<Map<String, Object>> getInquiries(Member member) {
        List<BaDream> baDreams = getBaDreamsByMember(member);
        List<Map<String, Object>> inquiries = new ArrayList<>();
        for (BaDream baDream : baDreams) {
            Request request = baDream.getRequest();
            House house = request.getHouse();
            Map<String, Object> inquiry = new HashMap<>();
            inquiry.put("request_id", request.getRequestId()); // 요청서 id
            inquiry.put("address", house.getContent());
            inquiry.put("worker_id", baDream.getMember().getId()); // 발품인 id
            inquiry.put("name", baDream.getMember().getName()); // 발품인 이름
            inquiry.put("star", baDream.getMember().getStar()); // 별점
            inquiry.put("message", baDream.getMessage()); // 메세지
            inquiries.add(inquiry);
        }
        return inquiries;
    }

    // 신청조회 수
    public int getNumOfInquiries(Member member) {
        List<BaDream> baDreams = getBaDreamsByMember(member);
        return baDreams.size();
    }

    // 신청조회에서 요청 수락
    @Transactional
    public void accept(Long requestId, Long workerId) {
        // 요청서에 발품인 아이디 넣어주고 매칭 상태값에 매칭완료 넣기
        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + requestId));
        Member member = memberRepository.findById(workerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid workerId: " + workerId));
        request.setBalpoomin(member);
        request.setStatus("매칭 완료");
    }
}
