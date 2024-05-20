package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.PlusRequest;
import ossp_bajoobang.bajoobang.domain.Request;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestDTO {
    // 발품 기간
    private LocalDate request_date;
    // 발품 가격
    private int price_request;
    // 추가 요청
    private List<PlusRequest> plus_list;

    // 매물 주소
    private String house_address;
    private int stair;

    public static RequestDTO toDTO(Request entity){

        return RequestDTO.builder()
                .request_date(entity.getRequestDate())
                .price_request(entity.getPriceRequest())
                .plus_list(entity.getPlusRequests())
                .build();
    }
}
