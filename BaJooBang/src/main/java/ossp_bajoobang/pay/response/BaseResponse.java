package ossp_bajoobang.pay.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BaseResponse<T> {
    private int statusCode;
    private String message;

    // statusCode와 message만을 초기화하는 생성자
    @Builder
    public BaseResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

}