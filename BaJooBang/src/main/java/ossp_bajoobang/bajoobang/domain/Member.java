package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.*;
import lombok.*;
import ossp_bajoobang.bajoobang.dto.SignupForm;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String pw;

    private String address;

    @OneToMany(mappedBy = "member")
    private List<Request> request = new ArrayList<>();

    // dto를 엔티티로 변환
    public static Member toEntity(SignupForm signupForm) {
        return Member.builder()
                .email(signupForm.getEmail())
                .pw(signupForm.getPw())
                .address(signupForm.getAddress())
                .build();
    }
}
