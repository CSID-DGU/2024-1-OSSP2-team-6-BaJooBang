package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import ossp_bajoobang.bajoobang.domain.Request;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestDTO {
    // 요청서 아이디
    private Long request_id;
    // 발품 기간
    private LocalDate request_date;
    // 발품 가격
    private int price_request;
    // 추가 요청
    private List<PlusRequestDTO> plus_list;

    // 매물 주소
    private String house_address;
    private int stair;


    public static RequestDTO toDTO(Request entity){

        return RequestDTO.builder()
                .request_id(entity.getRequestId())
                .request_date(entity.getRequestDate())
                .price_request(entity.getPriceRequest())
                .plus_list(PlusRequestListDTO.toDTO(entity.getPlusRequests()))
                .build();
    }
}
