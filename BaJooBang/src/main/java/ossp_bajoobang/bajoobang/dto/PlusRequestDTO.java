package ossp_bajoobang.bajoobang.dto;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.*;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.PlusRequest;
import ossp_bajoobang.bajoobang.domain.Request;

import java.util.List;
import java.util.Map;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlusRequestDTO {

    private String plus_q;
    private String q_type;
    private RequestDTO requestDTO;

    public static PlusRequestDTO toDTO(PlusRequest entity){
        return PlusRequestDTO.builder()
                .plus_q(entity.getPlus_q())
                .q_type(entity.getQ_type())
                .requestDTO(RequestDTO.toDTO(entity.getRequest()))
                .build();
    }
}
