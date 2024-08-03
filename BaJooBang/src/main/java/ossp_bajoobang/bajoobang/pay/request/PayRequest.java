package ossp_bajoobang.bajoobang.pay.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Map;

@Getter
@AllArgsConstructor
public class PayRequest {
    private String url;
    private Map<String, String> map;
}