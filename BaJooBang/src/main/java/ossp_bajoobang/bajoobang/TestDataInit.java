package ossp_bajoobang.bajoobang;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.repository.MemberRepository;

@Component
@RequiredArgsConstructor
public class TestDataInit {

    private final MemberRepository memberRepository;

    @PostConstruct
    public void init() {
        Member member1 = new Member();
        member1.setName("철수");
        member1.setEmail("aaa");
        member1.setPw("111");
        member1.setAddress("seoul");
        memberRepository.save(member1);

        Member member2 = new Member();
        member2.setName("영희");
        member2.setEmail("bbb");
        member2.setPw("222");
        member2.setAddress("seoul");
        memberRepository.save(member2);

        Member member3 = new Member();
        member3.setName("asd");
        member3.setEmail("asd");
        member3.setPw("asd");
        member3.setAddress("asd");
        memberRepository.save(member3);
    }
}
