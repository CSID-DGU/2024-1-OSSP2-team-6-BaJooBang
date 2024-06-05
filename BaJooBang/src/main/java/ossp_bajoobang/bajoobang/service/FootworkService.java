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

    public List<Map<String, Object>> getFootworks(Member member) {
        List<BaDream> baDreams = member.getBaDreams();
        List<Map<String, Object>> footworks = new ArrayList<>();
        for (BaDream baDream : baDreams) {
            Map<String, Object> footwork = new HashMap<>();
            Request request = baDream.getRequest();
            House house = request.getHouse();
            footwork.put("address", house.getContent());
            footwork.put("price", request.getPriceRequest());
            if (request.getBalpoomin() == null) footwork.put("state", "요청 중");
            else footwork.put("state", "매칭 완료");
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
