package ossp_bajoobang.bajoobang.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FileDto {
    private Long id;
    private String filename;
    private String filepath;
    private Long size;
    private LocalDateTime uploadedDate;
}
