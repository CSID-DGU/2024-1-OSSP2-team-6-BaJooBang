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
    // 요청인 모드
    private List<RequestDTO> myRequests; // 등록 매물
    // 신청 조회 (내 요청서에 여러 명이 발품 요청)
    // 발품인 모드
    private List<RequestDTO> applyBalpooms; // 내가 신청한 발품
    private List<RequestDTO> alarmList; // 알림 리스트

    public static MypageDTO toDTO(MemberDTO memberDTO,
                                  List<RequestDTO> myRequests,
                                  List<RequestDTO> applyBalpooms,
                                  List<RequestDTO> alarmList){
        return MypageDTO.builder()
                .memberDTO(memberDTO)
                .myRequests(myRequests)
                .applyBalpooms(applyBalpooms)
                .alarmList(alarmList)
                .build();
    }
}
