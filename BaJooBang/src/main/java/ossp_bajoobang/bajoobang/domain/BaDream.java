package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class BaDream {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long BaDreamId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id") // 발품인 id임
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "request_id")
    private Request request;

    private String message;
}
