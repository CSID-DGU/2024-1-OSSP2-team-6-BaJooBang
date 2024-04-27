package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import ossp_bajoobang.bajoobang.domain.Member;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private String email;
    private String pw;
    private String address;

    public static MemberDTO toDTO(Member entity){
        return MemberDTO.builder()
                .email(entity.getEmail())
                .pw(entity.getPw())
                .address(entity.getAddress())
                .build();
    }
}
