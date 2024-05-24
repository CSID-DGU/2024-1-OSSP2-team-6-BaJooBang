package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.data.relational.core.sql.In;
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
import java.util.*;
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
    public List<Member> findMembersByTravelTime(List<Member> nearbyMembers, double latitude, double longitude){
        Map<Double, Member> travelTimeToMemberMap  = new HashMap<>();
        for(Member member : nearbyMembers){
            double travelTime = getTravelTime(member, latitude, longitude);
            travelTimeToMemberMap.put(travelTime, member);
        }

        List<Double> sortedTimes = new ArrayList<>(travelTimeToMemberMap.keySet());
        Collections.sort(sortedTimes); // 오름차순

        List<Member> sortedMembers = new ArrayList<>();
        for(Double time : sortedTimes){
            sortedMembers.add(travelTimeToMemberMap.get(time));
            if(sortedMembers.size() == 10){
                break;
            }
        }

        log.info("##############################");
        log.info("sortedMembers size : " + sortedMembers.size());
        for(Member member : sortedMembers){
            log.info(member.getAddress());
        }

        return sortedMembers;
    }

    public double getTravelTime(Member member, double houseX, double houseY){
        double totalTime = 0;

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
            double startX = member.getLongitude();
            double startY = member.getLatitude();
            double endX = houseY;
            double endY = houseX;

            if(!response.substring(2,7).equals("error")){
                JSONObject result = jsonObject.getJSONObject("result");
                JSONObject firstPath = result.getJSONArray("path").getJSONObject(0);
                totalTime = firstPath.getJSONObject("info").getDouble("totalTime");

                JSONObject firstSubPath = firstPath.getJSONArray("subPath").getJSONObject(1);

                startX = firstSubPath.getDouble("startX");
                startY = firstSubPath.getDouble("startY");
                endX = firstSubPath.getDouble("endX");
                endY = firstSubPath.getDouble("endY");
            }

            totalTime = getTotalTime(member, startX, startY, endX, endY, totalTime, houseX, houseY);

        }catch (Exception e){
            e.printStackTrace();
        }

        log.info("^^^^^^^^^^^^^^^^^^");
        log.info("totaltime : " + totalTime);
        log.info("vvvvvvvvvvvvvvvvvv");

        return totalTime;
    }

    public double getTotalTime(Member member, double startX, double startY, double endX, double endY, double totalTime, double houseX, double houseY){
        if(member.getLatitude() == startX){
            // start와 end
            totalTime += getDistanceTime(startX,startY,endX,endY);
        }else{
            // member와 start
            totalTime += getDistanceTime(member.getLongitude(), member.getLatitude(), startX, startY);
            // end와 house
            totalTime += getDistanceTime(endX, endY, houseY, houseX);
        }

        return totalTime;
    }

    public double getDistanceTime(double startX, double startY, double endX, double endY){
        double time = 0;

        final int R = 6371000; // Radius of the Earth in meters
        double latDistance = Math.toRadians(endY - startY);
        double lonDistance = Math.toRadians(endX - startX);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(startY)) * Math.cos(Math.toRadians(endY))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        time = R * c / 67;
        return time;
    }
}
