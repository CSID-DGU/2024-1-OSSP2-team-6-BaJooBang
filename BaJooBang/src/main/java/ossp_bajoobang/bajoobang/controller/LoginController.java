package ossp_bajoobang.bajoobang.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import ossp_bajoobang.bajoobang.domain.LatLng;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.LoginForm;
import ossp_bajoobang.bajoobang.dto.SignupForm;
import ossp_bajoobang.bajoobang.service.LoginService;
import ossp_bajoobang.bajoobang.service.MemberService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;
    private final MemberService memberService;

    // 카카오 geocoding
    private static final String GEOCODING_API_URL = "https://dapi.kakao.com/v2/local/search/address.json";
    private static final String API_KEY = "a8690713e25ea312f41ed04c5488730e";

    // 회원가입
    @PostMapping("/signup")
    public String signup(@RequestBody SignupForm signupForm){
        // 주소를 위도와 경도로 변환
        LatLng latLng = geocodeAddress(signupForm.getAddress());
        signupForm.setLatitude(latLng.getLatitude());
        signupForm.setLongitude(latLng.getLongitude());

        memberService.register(signupForm);

        return "GOOD";
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm, HttpServletRequest request) {
        Member loginMember = loginService.login(loginForm.getEmail(), loginForm.getPw());
        if (loginMember == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("FAIL"); // 로그인 실패
        } else {
            HttpSession session = request.getSession();
            session.setAttribute("loginMember", loginMember);
            return ResponseEntity.ok("GOOD"); // 로그인 성공
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

    private LatLng geocodeAddress(String address){
        String url = GEOCODING_API_URL + "?query=" + address;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + API_KEY);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        log.info("Controller Login gecodeAddress 1");
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        log.info("Controller Login gecodeAddress 2");

        if (response.getStatusCodeValue() == 200) {
            try {
                JSONParser parser = new JSONParser();
                JSONObject jsonObject = (JSONObject) parser.parse(response.getBody());
                if (((org.json.simple.JSONArray) jsonObject.get("documents")).size() > 0) {
                    JSONObject location = (JSONObject) ((org.json.simple.JSONArray) jsonObject.get("documents"))
                            .get(0);
                    JSONObject addressObject = (JSONObject) location.get("address");
                    double lat = Double.parseDouble(addressObject.get("y").toString());
                    double lng = Double.parseDouble(addressObject.get("x").toString());
                    return new LatLng(lat, lng);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        // 기본 값 (실패 시)
        return new LatLng(0.0, 0.0);
    }
}
