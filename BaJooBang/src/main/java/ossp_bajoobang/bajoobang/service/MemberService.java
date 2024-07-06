package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.dto.MemberDTO;
import ossp_bajoobang.bajoobang.dto.MypageDTO;
import ossp_bajoobang.bajoobang.dto.SignupForm;
import ossp_bajoobang.bajoobang.repository.MemberRepository;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final InquiryService inquiryService;
    private final RegisteredService registeredService;
    private final FootworkService footworkService;
    private final AlarmService alarmService;
    private final LikeyService likeyService;
    private static final String apiKey = "qIAUNilofLN3xQfCcoTiRrBbwYR/bwzVSatLptsLaPM";

    // 회원가입
    public void register(SignupForm signupForm) {
        Member entity = Member.toEntity(signupForm);
        memberRepository.save(entity);
    }

    public MypageDTO getMypageDTO(Member member) {
        MemberDTO memberDTO = MemberDTO.toDTO(member);
        // 등록매물 개수
        int numOfRegistered = registeredService.getNumOfRegistered(member);
        // 신청조회 개수
        int numOfInquiries = inquiryService.getNumOfInquiries(member);
        // 신청발품 개수
        int numOfFootworks = footworkService.getNumOfFootworks(member);
        // 알림 개수
        int numOfAlarms = alarmService.getNumOfAlarms(member);
        // 찜 개수
        int numOfLikes = likeyService.getNumOfLikes(member);

        return MypageDTO.toDTO(memberDTO, numOfRegistered, numOfInquiries, numOfFootworks, numOfAlarms, numOfLikes);
    }

    // 일단 별점 계산 기능 여기에 만듬
    @Transactional
    public Float calculateAvgStar(Member member, float star) {
        float newAvgStar = (member.getStar() * member.getStarCount() + star) / (member.getStar() + 1);
        member.setStar(newAvgStar);
        return newAvgStar;
    }

    // 매물에 가까운 주변 회원들에 대해서 (대중교통) 총 소요시간 계산하여 10명 오름차순 정렬.
    // List<Member>
    public List<Member> findMembersByTravelTime(Long member_id, List<Member> nearbyMembers, double latitude, double longitude){
        Map<Double, Member> travelTimeToMemberMap  = new HashMap<>();
        for(Member member : nearbyMembers){
            double travelTime = getTravelTime(member, latitude, longitude);
            log.info("travel Time : " + travelTime);
            if (!member.getId().equals(member_id)) {
                travelTimeToMemberMap.put(travelTime, member);
            }
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

        return sortedMembers;
    }

    public double getTravelTime(Member member, double houseLat, double houseLong){
        double totalTime = 0;

        String urlInfo = String.format("https://api.odsay.com/v1/api/searchPubTransPathT?apiKey=%s&SX=%f&SY=%f&EX=%f&EY=%f&OPT=0",
                apiKey, member.getLongitude(), member.getLatitude(),houseLong, houseLat);
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
//            log.info("^^^^^^^^^^^^^^^^^^^^^^^");
//            log.info(response.substring(0, 40));


            JSONObject jsonObject = new JSONObject(response);
            double startX = 0;
            double startY = 0;
            double endX = 0;
            double endY = 0;

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
            // member long lat long lat time lat long
            totalTime = getTotalTime(member, startX, startY, endX, endY, totalTime, houseLat, houseLong);

        }catch (Exception e){
            e.printStackTrace();
        }

        return totalTime;
    }

    public double getTotalTime(Member member, double startX, double startY, double endX, double endY, double totalTime, double houseLat, double houseLong){
        // member
        if(startX == 0){
            // start와 end
            log.info("도보 이용자");
            totalTime += getDistanceTime(member.getLongitude(),member.getLatitude(),houseLong, houseLat);
        }else{
            // member와 start
            totalTime += getDistanceTime(member.getLongitude(), member.getLatitude(), startX, startY);
            // end와 house
            totalTime += getDistanceTime(endX, endY, houseLong, houseLat); //long lat long lat
        }

        return totalTime;
    }

    public double getDistanceTime(double startX, double startY, double endX, double endY){
        // long lat long lat
        double time = 0;

        final int R = 6371000; // Radius of the Earth in meters
        double latDistance = Math.toRadians(endY - startY); // latitude
        double lonDistance = Math.toRadians(endX - startX); // longitude
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(startY)) * Math.cos(Math.toRadians(endY))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        time = R * c / 67;
        return time;
    }
}
