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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="request_id")
    private Long requestId;

    // 발품 기간
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate requestDate;
    // 발품 가격
    private int priceRequest;

    // 수압
    private int powerWater;
    private int powerWash;
    private int powerShower;

    // 온수 시간
    private String timeWater;

    // 채광
    private String lighting;

    // 곰팡이
    private boolean moldLiving;
    private boolean moldRest;
    private boolean moldVeranda;
    private boolean moldShoes;
    private boolean moldWindow;

    @OneToMany
    @JoinColumn(name = "plus_id")
    private List<PlusRequest> plusRequests = new ArrayList<>();

    public static Request toEntity(RequestDTO dto){
        return Request.builder()
                .requestDate(dto.getRequest_date())
                .priceRequest(dto.getPrice_request())
                .powerWater(dto.getPower_water())
                .powerWash(dto.getPower_wash())
                .powerShower(dto.getPower_shower())
                .timeWater(dto.getTime_water())
                .lighting(dto.getLighting())
                .moldLiving(dto.isMold_living())
                .moldRest(dto.isMold_rest())
                .moldVeranda(dto.isMold_veranda())
                .moldShoes(dto.isMold_shoes())
                .moldWindow(dto.isMold_window())
                .build();
    }
}
