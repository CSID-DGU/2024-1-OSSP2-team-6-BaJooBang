package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import ossp_bajoobang.bajoobang.domain.Member;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private Long id;
    private String name;
    private String email;
    private String address;

    public static MemberDTO toDTO(Member entity){
        return MemberDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .email(entity.getEmail())
                .address(entity.getAddress())
                .build();
    }
}
