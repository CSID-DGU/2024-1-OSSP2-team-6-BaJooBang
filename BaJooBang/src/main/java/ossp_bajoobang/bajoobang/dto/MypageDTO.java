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
    private List<RequestDTO> myRequests; // 등록 매물
    private List<RequestDTO> receivedRequests; // 신청 조회
    // 찜한 방??

    public static MypageDTO toDTO(MemberDTO memberDTO,
                                  List<RequestDTO> myRequests,
                                  List<RequestDTO> receivedRequests){
        return MypageDTO.builder()
                .memberDTO(memberDTO)
                .myRequests(myRequests)
                .receivedRequests(receivedRequests)
                .build();
    }
}
