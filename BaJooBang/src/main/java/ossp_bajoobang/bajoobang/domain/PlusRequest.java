package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlusRequest {

    @Id
    @GeneratedValue
    @Column(name = "plus_id")
    private Long id;
    // 질문 내용
    private String question;
    // 질문 타입
    private String q_type;

    @ManyToOne
    @JoinColumn(name="request_id", insertable = false, updatable = false)
    private Request request;
}
