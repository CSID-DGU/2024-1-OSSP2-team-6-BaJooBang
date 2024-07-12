package ossp_bajoobang.bajoobang;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.HouseRepository;
import ossp_bajoobang.bajoobang.repository.MemberRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class TestDataInit {

    private final MemberRepository memberRepository;
    private final HouseRepository houseRepository;
    private final RequestRepository requestRepository;

    @PostConstruct
    public void init() {
//        Member member1 = new Member();
//        member1.setName("김효범");
//        member1.setEmail("khb@gmail.com");
//        member1.setPw("123123asd!");
//        member1.setAddress("서울 중구 퇴계로46길 26");
//        member1.setLatitude(37.561492233389956);
//        member1.setLongitude(126.99947370136589);
//        memberRepository.save(member1);
//
//        Member member2 = new Member();
//        member2.setName("김유민");
//        member2.setEmail("kym@gmail.com");
//        member2.setPw("123123asd!");
//        member2.setAddress("서울 중구 퇴계로36가길 21");
//        member2.setLatitude(37.56534846575874);
//        member2.setLongitude(126.99718726985);
//        memberRepository.save(member2);
//
//        Member member3 = new Member();
//        member3.setName("박주형");
//        member3.setEmail("pjh@gmail.com");
//        member3.setPw("123123asd!");
//        member3.setAddress("서울 용산구 원효로97길 15");
//        member3.setLatitude(37.54135995650307);
//        member3.setLongitude(126.96935276436112);
//        memberRepository.save(member3);
//
//        Member member4 = new Member();
//        member4.setName("최우성");
//        member4.setEmail("cws@gmail.com");
//        member4.setPw("123123asd!");
//        member4.setAddress("서울 동작구 흑석로 84");
//        member4.setLatitude(37.505063811811645);
//        member4.setLongitude(126.95724358215766);
//        memberRepository.save(member4);
//
//        House house1 = new House();
//        house1.setContent("서울특별시 중구 묵정동");
//        house1.setLatitude(37.561208);
//        house1.setLongitude(127.001233);
//        house1.setManagement(4);
//        house1.setLocalId(1L);
//        house1.setMoney1(1000);
//        house1.setMoney2(60);
//        house1.setSize(23);
//        house1.setStair(3);
//        house1.setType("월세");
//        house1.setLocalId(1L);
//        houseRepository.save(house1);
//
//        House house2 = new House();
//        house2.setContent("서울특별시 중구 신당동");
//        house2.setLatitude(37.559415);
//        house2.setLongitude(127.009722);
//        house2.setManagement(3);
//        house2.setLocalId(1L);
//        house2.setMoney1(3000);
//        house2.setMoney2(55);
//        house2.setSize(33);
//        house2.setStair(5);
//        house2.setType("전세");
//        house1.setLocalId(1L);
//        houseRepository.save(house2);
//
//        House house3 = new House();
//        house3.setContent("서울특별시 중구 장충동2가");
//        house3.setLatitude(37.559901);
//        house3.setLongitude(126.997577);
//        house3.setManagement(0);
//        house3.setLocalId(1L);
//        house3.setMoney1(2000);
//        house3.setMoney2(50);
//        house3.setSize(13);
//        house3.setStair(1);
//        house3.setType("월세");
//        house3.setLocalId(1L);
//        houseRepository.save(house3);
//
//        House house4 = new House();
//        house4.setContent("서울특별시 중구 충무로1가 64");
//        house4.setLatitude(37.560954203);
//        house4.setLongitude(126.98614797);
//        house4.setManagement(0);
//        house4.setLocalId(1L);
//        house4.setMoney1(2000);
//        house4.setMoney2(65);
//        house4.setSize(13);
//        house4.setStair(1);
//        house4.setType("월세");
//        house4.setLocalId(1L);
//        houseRepository.save(house4);
//
//        House house5 = new House();
//        house5.setContent("서울특별시 중구 충무로4가 125 ");
//        house5.setLatitude(37.561261210);
//        house5.setLongitude(126.994172534);
//        house5.setManagement(0);
//        house5.setLocalId(1L);
//        house5.setMoney1(1500);
//        house5.setMoney2(50);
//        house5.setSize(13);
//        house5.setStair(1);
//        house5.setType("월세");
//        house5.setLocalId(1L);
//        houseRepository.save(house5);
//
//        House house6 = new House();
//        house6.setContent("서울 용산구 원효로97길 15");
//        house6.setLatitude(37.54135995650307);
//        house6.setLongitude(126.96935276436112);
//        house6.setManagement(0);
//        house6.setLocalId(1L);
//        house6.setMoney1(3000);
//        house6.setMoney2(70);
//        house6.setSize(13);
//        house6.setStair(1);
//        house6.setType("월세");
//        house6.setLocalId(1L);
//        houseRepository.save(house6);
//
//        House house7 = new House();
//        house7.setContent("서울특별시 중구 신당3동 373-13 ");
//        house7.setLatitude(37.554606996);
//        house7.setLongitude(127.010792373);
//        house7.setManagement(0);
//        house7.setLocalId(1L);
//        house7.setMoney1(2000);
//        house7.setMoney2(50);
//        house7.setSize(13);
//        house7.setStair(1);
//        house7.setType("월세");
//        house7.setLocalId(1L);
//        houseRepository.save(house7);
//
//        House house8 = new House();
//        house8.setContent("서울특별시 종로구 지봉로 지하112");
//        house8.setLatitude(37.579418797);
//        house8.setLongitude(127.015308772);
//        house8.setManagement(0);
//        house8.setLocalId(1L);
//        house8.setMoney1(2000);
//        house8.setMoney2(50);
//        house8.setSize(13);
//        house8.setStair(1);
//        house8.setType("월세");
//        house8.setLocalId(1L);
//        houseRepository.save(house8);
//
//        House house9 = new House();
//        house9.setContent("서울특별시 종로구 종로3가 61-68");
//        house9.setLatitude(37.570454631);
//        house9.setLongitude(126.992134289);
//        house9.setManagement(0);
//        house9.setLocalId(1L);
//        house9.setMoney1(2000);
//        house9.setMoney2(60);
//        house9.setSize(13);
//        house9.setStair(1);
//        house9.setType("월세");
//        house9.setLocalId(1L);
//        houseRepository.save(house9);
//
//        House house10 = new House();
//        house10.setContent("서울특별시 중구 을지로3가 70-1");
//        house10.setLatitude(37.566314493);
//        house10.setLongitude(126.991249014);
//        house10.setManagement(0);
//        house10.setLocalId(1L);
//        house10.setMoney1(1000);
//        house10.setMoney2(65);
//        house10.setSize(13);
//        house10.setStair(1);
//        house10.setType("월세");
//        house10.setLocalId(1L);
//        houseRepository.save(house10);
//
//        House house11 = new House();
//        house11.setContent("서울특별시 중구 장충동2가 189-2");
//        house11.setLatitude(37.559112355);
//        house11.setLongitude(127.005360436);
//        house11.setManagement(0);
//        house11.setLocalId(1L);
//        house11.setMoney1(1000);
//        house11.setMoney2(60);
//        house11.setSize(13);
//        house11.setStair(1);
//        house11.setType("월세");
//        house11.setLocalId(1L);
//        houseRepository.save(house11);

    }
}
