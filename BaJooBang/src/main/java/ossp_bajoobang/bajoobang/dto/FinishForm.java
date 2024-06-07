package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import ossp_bajoobang.bajoobang.domain.File;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FinishForm {

    private List<FileDto> fileDtos;
    private BalpoomForm balpoomForm;
    private PlusReqeustForFinishDTO plusReqeustForFinishDTO;
}
