package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import ossp_bajoobang.bajoobang.domain.PlusRequest;
import ossp_bajoobang.bajoobang.domain.Request;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BalpoomForm {

    // 발품 기간
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate requestDate;
    // 발품 가격
    private int priceRequest;
    // 추가 질문 사항.
    private List<PlusRequest> plusRequestList;

    public static BalpoomForm toDTO(List<PlusRequest> plusRequests, Request requestInfo){
        return BalpoomForm.builder()
                .priceRequest(requestInfo.getPriceRequest())
                .requestDate(requestInfo.getRequestDate())
                .plusRequestList(plusRequests)
                .build();
    }
}
