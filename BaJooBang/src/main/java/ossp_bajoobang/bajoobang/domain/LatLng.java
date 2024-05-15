package ossp_bajoobang.bajoobang.domain;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LatLng {
    private double latitude;
    private double longitude;

    public LatLng(double latitude, double longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
