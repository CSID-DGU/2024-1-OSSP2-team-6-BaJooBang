package ossp_bajoobang.bajoobang.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private String email;
    private String pw;
}
