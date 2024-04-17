package ossp_bajoobang.bajoobang.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.service.MemberService;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/signup")
    public String signup(@RequestBody MemberDTO dto){
        memberService.register(dto);

        return "GOOD";
    }
}
