package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class RegisteredService {
    public List<Map<String, Object>> getRegistered(Member member) {
        List<Map<String, Object>> registeredList = new ArrayList<>();
        List<Request> requests = member.getRequests();
        log.info("requests={}", requests);
        for (Request request : requests) {
            Map<String, Object> registered = new HashMap<>();
            registered.put("address", request.getHouse().getContent());
            registered.put("price", request.getPriceRequest());
            if (request.getBalpoomin() == null) registered.put("state", "요청 중");
            else registered.put("state", "매칭 완료");
            registered.put("date", request.getRequestDate());
            registered.put("request_id", request.getRequestId());
            registeredList.add(registered);
        }
        log.info("registeredList={}", registeredList);
        return registeredList;
    }

    // 등록매물 개수 전달하기
    public int getNumOfRegistered(Member member) {
        List<Request> requests = member.getRequests();
        return requests.size();
    }
}
