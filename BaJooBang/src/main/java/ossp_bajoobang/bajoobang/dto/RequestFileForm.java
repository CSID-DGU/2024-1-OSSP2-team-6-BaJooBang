package ossp_bajoobang.bajoobang.dto;


import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestFileForm {
    private String answer;
//    private List<MultipartFile> files;
}
