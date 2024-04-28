package ossp_bajoobang.bajoobang.domain;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import ossp_bajoobang.bajoobang.repository.PlusRequestRepository;

import java.util.List;
import java.util.Map;

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

    public static PlusRequest toEntity(List<PlusRequest> dto){
        ObjectMapper objectMapper = new ObjectMapper();
        PlusRequestBuilder builder = new PlusRequestBuilder();
        TypeReference<List<Map<String, String>>> typeReference = new TypeReference<List<Map<String, String>>>() {};
        try{
            String plusListJson = objectMapper.writeValueAsString(dto);
            List<Map<String, String>>  plusRequests = objectMapper.readValue(plusListJson, typeReference);
            for(Map<String, String> plusRequest : plusRequests){
                builder.q_type(plusRequest.get("q_type"));
                builder.question(plusRequest.get("question"));
                builder.build();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return builder.build();
    }
}
