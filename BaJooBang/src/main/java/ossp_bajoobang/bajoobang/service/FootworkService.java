package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.BaDream;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FootworkService {

    // 신청 발품
    public List<Map<String, Object>> getFootworks(Member member) {
        List<BaDream> baDreams = member.getBaDreams();
        List<Map<String, Object>> footworks = new ArrayList<>();
        for (BaDream baDream : baDreams) {
            Map<String, Object> footwork = new HashMap<>();
            Request request = baDream.getRequest();
            House house = request.getHouse();
            footwork.put("address", house.getContent());
            footwork.put("price", request.getPriceRequest());
            // 매칭 상태값 전달하기
//            if (request.getBalpoomin() == null) footwork.put("state", "요청 중");
//            else footwork.put("state", "매칭 완료");
            // 매칭 전
            if (request.getStatus().equals("매칭 전")) footwork.put("state", "요청 중");
            // 매칭 후
            else {
                // 매칭 성공 (발품인 == member)
                if (request.getBalpoomin().equals(member)) {
                    if (request.getStatus().equals("평가 완료")) {
                        // 작성 후(작성 완료)
                        footwork.put("state", "작성 완료");
                    }
                    // 작성 전(매칭 완료)
                    else footwork.put("state", request.getStatus());
                }
                else {
                    // 매칭 실패 (발품인 != member)
                    footwork.put("state", "매칭 실패");
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
