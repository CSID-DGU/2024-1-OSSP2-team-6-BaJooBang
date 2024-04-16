package ossp_bajoobang.bajoobang.dto;

import lombok.*;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.LatLng;

@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class HouseDTO {
    private Long house_id;
    private String content;
    private int money1;
    private int money2;
    private int stair;
    private int management;
    private int size;
    private LatLng latLng;

    public static HouseDTO toDTO(House entity){
        LatLng latLng = new LatLng(entity.getLatitude(), entity.getLongitude());

        return HouseDTO.builder()
                .house_id(entity.getHouse_id())
                .content(entity.getContent())
                .money1(entity.getMoney1())
                .money2(entity.getMoney2())
                .stair(entity.getStair())
                .management(entity.getManagement())
                .size(entity.getSize())
                .latLng(latLng)
                .build();
    }
}
