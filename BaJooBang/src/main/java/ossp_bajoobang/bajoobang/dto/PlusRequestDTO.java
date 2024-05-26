package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;
import ossp_bajoobang.bajoobang.domain.PlusRequest;

import java.util.List;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PlusRequestDTO {

    private String plus_q;
    private String q_type;
    //private RequestDTO requestDTO;
    private List<MultipartFile> images;

    public static PlusRequestDTO toDTO(PlusRequest entity){
        return PlusRequestDTO.builder()
                .plus_q(entity.getPlus_q())
                .q_type(entity.getQ_type())
                .build();
    }
}
