package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.BaDream;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.BaDreamRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FootworkService {
    private final BaDreamRepository baDreamRepository;
    private final RequestRepository requestRepository;
    // 신청 발품
    public List<Map<String, Object>> getFootworks(Member member) {
        List<BaDream> baDreams = baDreamRepository.findByMember(member);
        List<Map<String, Object>> footworks = new ArrayList<>();
        for (BaDream baDream : baDreams) {
            Map<String, Object> footwork = new HashMap<>();
            Request request = baDream.getRequest();
            House house = request.getHouse();
            footwork.put("request_id", request.getRequestId());
            footwork.put("address", house.getContent());
            footwork.put("price", request.getPriceRequest());
            // 매칭 상태값 전달하기
//            if (request.getBalpoomin() == null) footwork.put("state", "요청 중");
//            else footwork.put("state", "매칭 완료");
            // 매칭 전
            if (request.getStatus().equals("매칭 전")) {
                footwork.put("state", "요청 중");
                footwork.put("worker_id", "");
            }
            // 매칭 후
            else {
                // 매칭 성공 (발품인 == member)
                if (request.getBalpoomin().getId() == member.getId()) {
                    // 작성 완료 혹은 매칭완료
                    footwork.put("state", request.getStatus());
                    footwork.put("worker_id", request.getBalpoomin().getId());
                }
                else {
                    // 매칭 실패 (발품인 != member)
                    footwork.put("state", "매칭 실패");
                    footwork.put("worker_id", "");
                }
            }
            footwork.put("date", request.getRequestDate());
            footworks.add(footwork);
        }
        return footworks;
    }

    public int getNumOfFootworks(Member member) {
        List<BaDream> baDreams = member.getBaDreams();
        return baDreams.size();
    }
}
