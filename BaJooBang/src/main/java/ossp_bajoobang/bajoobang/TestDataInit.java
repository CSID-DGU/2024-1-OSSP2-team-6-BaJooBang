package ossp_bajoobang.bajoobang;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.repository.HouseRepository;
import ossp_bajoobang.bajoobang.repository.MemberRepository;

@Component
@RequiredArgsConstructor
public class TestDataInit {

    private final MemberRepository memberRepository;
    private final HouseRepository houseRepository;
    @PostConstruct
    public void init() {
        Member member1 = new Member();
        member1.setName("철수");
        member1.setEmail("aaa");
        member1.setPw("111");
        member1.setAddress("서울 중구 퇴계로46길 26");
        member1.setLatitude(37.561492233389956);
        member1.setLongitude(126.99947370136589);
        memberRepository.save(member1);

        Member member2 = new Member();
        member2.setName("영희");
        member2.setEmail("bbb");
        member2.setPw("222");
        member2.setAddress("서울 중구 퇴계로36가길 21");
        member2.setLatitude(37.56534846575874);
        member2.setLongitude(126.99718726985);
        memberRepository.save(member2);

        Member member3 = new Member();
        member3.setName("asd");
        member3.setEmail("asd");
        member3.setPw("asd");
        member3.setAddress("서울 용산구 원효로97길 15");
        member3.setLatitude(37.54135995650307);
        member3.setLongitude(126.96935276436112);
        memberRepository.save(member3);

        Member member4 = new Member();
        member4.setName("ddd");
        member4.setEmail("ddd");
        member4.setPw("ddd");
        member4.setAddress("서울 동작구 흑석로 84");
        member4.setLatitude(37.505063811811645);
        member4.setLongitude(126.95724358215766);
        memberRepository.save(member3);

        House house1 = new House();
        house1.setContent("서울특별시 중구 묵정동");
        house1.setLatitude(37.561208);
        house1.setLongitude(127.001233);
        house1.setManagement(4);
        house1.setLocalId(1L);
        house1.setMoney1(1000);
        house1.setMoney2(50);
        house1.setSize(23);
        house1.setStair(3);
        houseRepository.save(house1);

        House house2 = new House();
        house2.setContent("서울특별시 중구 신당동");
        house2.setLatitude(37.559415);
        house2.setLongitude(127.009722);
        house2.setManagement(3);
        house2.setLocalId(1L);
        house2.setMoney1(3000);
        house2.setMoney2(50);
        house2.setSize(33);
        house2.setStair(5);
        houseRepository.save(house2);

        House house3 = new House();
        house3.setContent("서울특별시 중구 장충동2가");
        house3.setLatitude(37.559901);
        house3.setLongitude(126.997577);
        house3.setManagement(0);
        house3.setLocalId(1L);
        house3.setMoney1(200);
        house3.setMoney2(50);
        house3.setSize(13);
        house3.setStair(1);
        houseRepository.save(house3);
    }
}
