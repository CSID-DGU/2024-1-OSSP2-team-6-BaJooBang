package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    // 회원가입
    public void register(MemberDTO dto) {
        Member entity = Member.toEntity(dto);
        memberRepository.save(entity);
    }

    /**
    public void login(MemberDTO dto){
        Member member = Member.builder().pw(dto.)
    }
     */
}
