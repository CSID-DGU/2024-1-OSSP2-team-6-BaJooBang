package ossp_bajoobang.bajoobang.domain;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LatLng {
    private double lat;
    private double lng;

    public LatLng(double lat, double lng){
        this.lat = lat;
        this.lng = lng;
    }
}
