package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.LatLng;
import ossp_bajoobang.bajoobang.domain.Request;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AlarmRequestDTO {
    private Long house_id; //
    private Long request_id;
    private String dealmoney;
    private String human; //
    private String content; //
    private LatLng latLng; //
    private boolean hasNotification; // 가능

    public static AlarmRequestDTO toDTO(Request request, House requestHouse, boolean checkAlarm){
        LatLng latLng = new LatLng(requestHouse.getLatitude(), requestHouse.getLongitude());

        return AlarmRequestDTO.builder()
                .request_id(request.getRequestId())
                .house_id(requestHouse.getHouseId())
                .dealmoney(String.valueOf(request.getPriceRequest()))
                .human(request.getMember().getName())
                .content(requestHouse.getContent())
                .latLng(latLng)
                .hasNotification(checkAlarm)
                .build();
    }

}
