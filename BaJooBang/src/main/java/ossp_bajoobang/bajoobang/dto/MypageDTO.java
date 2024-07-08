package ossp_bajoobang.bajoobang.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ossp_bajoobang.bajoobang.domain.Member;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MypageDTO {
    private MemberDTO memberDTO;
    // 등록매물 개수
    private int numOfRegistered;
    // 신청조회 개수
    private int numOfInquiries;
    // 신청발품 개수
    private int numOfFootworks;
    // 알림 개수
    private int numOfAlarms;
    // 찜 개수
    private int numOfLikes;
    // 별점
    private float star;

    public static MypageDTO toDTO(MemberDTO memberDTO,
                                  int numOfRegistered,
                                  int numOfInquiries,
                                  int numOfFootworks,
                                  int numOfAlarms,
                                  int numOfLikes,
                                  float star){
        return MypageDTO.builder()
                .memberDTO(memberDTO)
                .numOfRegistered(numOfRegistered)
                .numOfInquiries(numOfInquiries)
                .numOfFootworks(numOfFootworks)
                .numOfAlarms(numOfAlarms)
                .numOfLikes(numOfLikes)
                .star(star)
                .build();
    }
}
