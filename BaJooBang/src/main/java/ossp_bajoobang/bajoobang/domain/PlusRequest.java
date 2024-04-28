package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.log4j.Log4j2;
import ossp_bajoobang.bajoobang.dto.RequestDTO;

import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
public class PlusRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plus_id")
    private Long id;
    // 질문 내용
    private String question;
    // 질문 타입
    private String q_type;

    @ManyToOne
    @JoinColumn(name="request_id", insertable = false, updatable = false)
    private Request request;

//    public static PlusRequest toEntity(RequestDTO requestDTO){
//        List<PlusRequest> plusList = requestDTO.getPlus_list().stream().toList();
//        return PlusRequest.builder().
//    }
}
