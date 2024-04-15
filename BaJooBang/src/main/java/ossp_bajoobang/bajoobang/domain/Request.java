package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import ossp_bajoobang.bajoobang.dto.RequestDTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Request {
    @Id
    @GeneratedValue
    @Column(name="request_id")
    private Long request_id;
    // 발품 기간
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate request_data;
    // 발품 가격
    private int request_price;

    // 수압 radio
    private String water_power;
    // ? 추가 정보

    // 온수 radio
    private String water_temp;
    // ? 추가 정보

    // 샤워기 radio
    private String shower_power;
    // ? 추가 정보

    // 채광
    private String lighting;

    // 곰팡이
    private String mold;

    @OneToMany
    @JoinColumn(name = "plus_id")
    private List<PlusRequest> plusRequests = new ArrayList<>();

    public static Request toEntity(RequestDTO dto){
        return Request.builder()
                .request_data(dto.getRequest_date())
                .request_price(dto.getRequest_price())
                .water_power(dto.getWater_power())
                .water_temp(dto.getWater_temp())
                .shower_power(dto.getShower_power())
                .lighting(dto.getLighting())
                .mold(dto.getMold())
                .build();
    }
}
