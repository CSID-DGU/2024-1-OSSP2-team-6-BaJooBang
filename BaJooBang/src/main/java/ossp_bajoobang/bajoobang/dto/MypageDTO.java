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

    public static MypageDTO toDTO(MemberDTO memberDTO,
                                  int numOfRegistered,
                                  int numOfInquiries,
                                  int numOfFootworks,
                                  int numOfAlarms){
        return MypageDTO.builder()
                .memberDTO(memberDTO)
                .numOfRegistered(numOfRegistered)
                .numOfInquiries(numOfInquiries)
                .numOfFootworks(numOfFootworks)
                .numOfAlarms(numOfAlarms)
                .build();
    }
}
