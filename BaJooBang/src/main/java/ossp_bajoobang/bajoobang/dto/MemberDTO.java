package ossp_bajoobang.bajoobang.dto;

import lombok.*;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private String email;
    private String pw;
    private String address;
}