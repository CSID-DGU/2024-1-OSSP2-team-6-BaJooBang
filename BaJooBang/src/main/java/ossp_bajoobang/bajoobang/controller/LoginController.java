package ossp_bajoobang.bajoobang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.service.MemberService;

@RestController
public class LoginController {
    private final MemberService memberService;

    public LoginController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/login")
    public void login(@RequestBody MemberDTO memberDTO){
        memberService.login(memberDTO);
    }
}
