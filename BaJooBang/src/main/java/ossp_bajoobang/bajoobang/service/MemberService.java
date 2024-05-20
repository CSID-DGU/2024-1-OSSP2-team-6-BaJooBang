package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.dto.SignupForm;
import ossp_bajoobang.bajoobang.repository.MemberRepository;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private static final String apiKey = "qIAUNilofLN3xQfCcoTiRrBbwYR/bwzVSatLptsLaPM";

    // 회원가입
    public void register(SignupForm signupForm) {
        Member entity = Member.toEntity(signupForm);
        memberRepository.save(entity);
    }

    // 매물에 가까운 주변 회원들에 대해서 (대중교통) 총 소요시간 계산하여 10명 오름차순 정렬.
    // List<Member>
    public void findMembersByTravelTime(List<Member> nearbyMembers, double latitude, double longitude){
        for(Member member : nearbyMembers){
            getTravelTime(member, latitude, longitude);
        }
    }

    public void getTravelTime(Member member, double houseX, double houseY){
        String urlInfo = String.format("https://api.odsay.com/v1/api/searchPubTransPathT?apiKey=%s&SX=%f&SY=%f&EX=%f&EY=%f&OPT=0",
                apiKey, member.getLongitude(), member.getLatitude(),houseY, houseX);
        try{
            URL url = new URL(urlInfo);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");

            BufferedReader bufferedReader =
                    new BufferedReader(new InputStreamReader(conn.getInputStream()));

            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                sb.append(line);
            }
            bufferedReader.close();
            conn.disconnect();

            String response = sb.toString();
            log.info("^^^^^^^^^^^^^^^^^^^^^^^");
            log.info(response.substring(0, 40));


            JSONObject jsonObject = new JSONObject(response);
            int totalTime = 0;

            if(!response.substring(2,7).equals("error")){
                JSONObject result = jsonObject.getJSONObject("result");
                JSONObject firstPath = result.getJSONArray("path").getJSONObject(0);
                totalTime = firstPath.getJSONObject("info").getInt("totalTime");
            }

            log.info("totalTime: " + String.valueOf(totalTime));
            log.info("----------------------------");

        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
