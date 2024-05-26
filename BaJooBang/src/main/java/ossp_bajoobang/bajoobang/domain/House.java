package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long houseId;

    @OneToMany(mappedBy = "house", fetch = FetchType.EAGER)
    private List<Request> requests = new ArrayList<>();

    // 지역 아이디
    private Long localId;

    private String content;
    private int money1;
    private int money2;
    private int stair;
    private int management;
    private int size;
    private double latitude;
    private double longitude;
}
