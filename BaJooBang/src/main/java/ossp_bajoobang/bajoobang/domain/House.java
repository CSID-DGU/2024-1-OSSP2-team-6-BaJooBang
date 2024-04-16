package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter @Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long house_id;

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
