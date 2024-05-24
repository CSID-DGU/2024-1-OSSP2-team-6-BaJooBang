package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.Alarm;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.AlarmRepository;

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
}
