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
    // 발품 기간
    private LocalDate request_date;
    // 발품 가격
    private int price_request;
    // 수압
    private int power_water;
    private int power_wash;
    private int power_shower;

    // 온수
    private String time_water;

    // 채광
    private String lighting;

    // 곰팡이
    private boolean mold_living;
    private boolean mold_rest;
    private boolean mold_veranda;
    private boolean mold_shoes;
    private boolean mold_window;

    // 추가 요청
    private List<PlusRequest> plus_list;

    // 매물 주소
    private String house_address;
    private int stair;
}
