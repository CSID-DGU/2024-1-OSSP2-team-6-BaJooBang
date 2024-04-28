package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.LoginForm;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.dto.SignupForm;
import ossp_bajoobang.bajoobang.service.LoginService;
import ossp_bajoobang.bajoobang.service.MemberService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;
    private final MemberService memberService;

    // 회원가입
    @PostMapping("/signup")
    public String signup(@RequestBody SignupForm signupForm){
        memberService.register(signupForm);

        return "GOOD";
    }
    // 로그인
    @PostMapping("/login")
    public Object login(@RequestBody LoginForm loginForm, HttpServletRequest request){
        Member loginMember = loginService.login(loginForm.getEmail(), loginForm.getPw());
        // 로그인 실패
        if (loginMember == null) return "FAIL";
        // 로그인 성공
        else {
            HttpSession session = request.getSession();
            session.setAttribute("loginMember", loginMember);
            return MemberDTO.toDTO(loginMember);
        }
    }
    // 로그아웃
    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "GOOD";
    }
    // 세션 체크
    @GetMapping("/check-login-status")
    public Object checkLoginStatus(HttpServletRequest request) {
        // 세션에서 사용자의 로그인 상태 확인
        HttpSession session = request.getSession(false);
        if(session != null && session.getAttribute("loginMember") != null) return "GOOD";
        else return "FAIL";
    }

    @GetMapping("/testHome")
    public String home(
            @SessionAttribute(name = "loginMember", required = false) Member loginMember) {
        // 세션 만료 테스트
        if (loginMember == null) {
            return "expired";
        }
        return "GOOD";
    }
}
