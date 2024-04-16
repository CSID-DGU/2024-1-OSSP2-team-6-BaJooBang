package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import ossp_bajoobang.bajoobang.domain.PlusRequest;
import ossp_bajoobang.bajoobang.domain.Request;

import java.time.LocalDate;
import java.util.List;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestDTO {
    // 매물 주소
    private String house_address;
    // 발품 기간
    private LocalDate request_date;
    // 발품 가격
    private int request_price;
    // 수압
    private String water_power;
    // 온수
    private String water_temp;
    // 샤워기
    private String shower_power;
    // 채광
    private String lighting;
    // 곰팡이
    private String mold;
    // 추가 요청
    private List<PlusRequest> plus_list;
}
