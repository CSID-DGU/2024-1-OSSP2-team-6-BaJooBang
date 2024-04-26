package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;

    /**
     * @return null 이면 로그인 실패
     */
    public Member login(String email, String pw) {
        return memberRepository.findByEmail(email)
                .filter(m -> m.getPw().equals(pw))
                .orElse(null);
    }
}
