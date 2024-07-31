package ossp_bajoobang.pay;

import lombok.Getter;

@Getter
public class PayInfoDto {
    private int price;
    private Long member_id;
    private Long request_id;
}