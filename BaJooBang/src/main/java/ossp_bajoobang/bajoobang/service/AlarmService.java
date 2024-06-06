package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.Alarm;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.AlarmRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmService {
    private final AlarmRepository alarmRepository;

    public void saveMemberRequest(Member member, Request request){
        Alarm alarm = new Alarm();
        alarm.setRequest(request);
        alarm.setMember(member);
        alarmRepository.save(alarm);
    }

    public List<Request> getRequestsOfAlarm(List<Alarm> alarms) {
        List<Request> requests = new ArrayList<>();
        for (Alarm alarm : alarms) {
            requests.add(alarm.getRequest());
        }
        return requests;
    }

    public List<Map<String, Object>> getAlarmList(Member member) {
        List<Map<String, Object>> alarmList = new ArrayList<>();
        List<Alarm> alarms = member.getAlarms();
        List<Request> requestsOfAlarm = getRequestsOfAlarm(alarms);
        for (Request request : requestsOfAlarm) {
            Map<String, Object> alarm = new HashMap<>();
            alarm.put("address", request.getHouse().getContent());
            alarm.put("price", request.getPriceRequest());
            alarm.put("requester", request.getMember().getName());
            alarm.put("request_id", request.getRequestId());
            alarm.put("date", request.getRequestDate());
            alarmList.add(alarm);
        }
        return alarmList;
    }

    public int getNumOfAlarms(Member member) {
        List<Alarm> alarms = member.getAlarms();
        return alarms.size();
    }
}
