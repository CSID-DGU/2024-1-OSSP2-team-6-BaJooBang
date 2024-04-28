package ossp_bajoobang.bajoobang.domain;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.log4j.Log4j2;

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

    //    @JoinColumn(name="request_id", insertable = false, updatable = false)
    @ManyToOne
    @JoinColumn(name = "request_id")
    private Request request;

//    public static PlusRequest toEntity(List<PlusRequest> dto){
//        ObjectMapper objectMapper = new ObjectMapper();
//        PlusRequestBuilder builder = new PlusRequestBuilder();
//        TypeReference<List<Map<String, String>>> typeReference = new TypeReference<List<Map<String, String>>>() {};
//        try{
//            String plusListJson = objectMapper.writeValueAsString(dto);
//            List<Map<String, String>>  plusRequests = objectMapper.readValue(plusListJson, typeReference);
//            for(Map<String, String> plusRequest : plusRequests){
//                builder.q_type(plusRequest.get("q_type"));
//                builder.question(plusRequest.get("question"));
//                builder.build();
//            }
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return builder.build();
//    }

    public static PlusRequest toEntity2(PlusRequest plus){
        ObjectMapper objectMapper = new ObjectMapper();
        PlusRequestBuilder builder = new PlusRequestBuilder();
        TypeReference<Map<String, String>> typeReference = new TypeReference<Map<String, String>>() {};
        try{
            String plusListJson = objectMapper.writeValueAsString(plus);
            Map<String, String>  plusRequest = objectMapper.readValue(plusListJson, typeReference);
            builder.q_type(plusRequest.get("q_type"));
            builder.question(plusRequest.get("question"));
            builder.build();
        }catch (Exception e){
            e.printStackTrace();
        }
        return builder.build();
    }
}
