package ossp_bajoobang.bajoobang.pay.response;

import lombok.Getter;

@Getter
public class Amount {
    private int total; // 총 결제 금액
    private int tax_free; // 비과세 금액
    private int tax; // 부가세 금액
}