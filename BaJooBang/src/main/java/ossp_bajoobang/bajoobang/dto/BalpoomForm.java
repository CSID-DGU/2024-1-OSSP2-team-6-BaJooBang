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
    // 추가 질문 사항.
    private List<String> plusAnswerList;

    private String address;
    private String status;

    // 수압
    private Integer powerWater = null;
    private Integer powerWash = null;
    private Integer powerShower = null;

    // 온수 시간
    private String timeWater = null;

    // 채광
    private String lighting = null;

    // 곰팡이
    private Boolean moldLiving = null;
    private Boolean moldRest = null;
    private Boolean moldVeranda = null;
    private Boolean moldShoes = null;
    private Boolean moldWindow = null;

    public static BalpoomForm toDTO(List<PlusRequest> plusRequests, Request requestInfo){
        return BalpoomForm.builder()
                .priceRequest(requestInfo.getPriceRequest())
                .requestDate(requestInfo.getRequestDate())
                .address(requestInfo.getAddress())
                .status(requestInfo.getStatus())
                .plusRequestList(plusRequests)
                .powerShower(requestInfo.getPowerShower())
                .powerWash(requestInfo.getPowerWash())
                .powerWater(requestInfo.getPowerWater())
                .timeWater(requestInfo.getTimeWater())
                .lighting(requestInfo.getLighting())
                .moldLiving(requestInfo.getMoldLiving())
                .moldRest(requestInfo.getMoldRest())
                .moldVeranda(requestInfo.getMoldVeranda())
                .moldShoes(requestInfo.getMoldShoes())
                .moldWindow(requestInfo.getMoldWindow())
                .build();
    }
}
