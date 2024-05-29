package ossp_bajoobang.bajoobang.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import ossp_bajoobang.bajoobang.dto.RequestDTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="request_id")
    private Long requestId;

    // 발품 기간
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate requestDate;
    // 발품 가격
    private int priceRequest;

//    // 수압
//    private int powerWater;
//    private int powerWash;
//    private int powerShower;
//
//    // 온수 시간
//    private String timeWater;
//
//    // 채광
//    private String lighting;
//
//    // 곰팡이
//    private boolean moldLiving;
//    private boolean moldRest;
//    private boolean moldVeranda;
//    private boolean moldShoes;
//    private boolean moldWindow;

    @OneToMany(mappedBy = "request")
    @JsonManagedReference
    private List<PlusRequest> plusRequests = new ArrayList<>();

    @OneToMany(mappedBy = "request")
    private List<Alarm> alarms = new ArrayList<>();

    @OneToMany(mappedBy = "request")
    private List<BaDream> baDreams = new ArrayList<>();

    // 요청인
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "house_id")
    private House house;

    // 발품인
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "balpoomin_id")
    private Member balpoomin;

    public void setBaDream(BaDream baDream) {
        this.getBaDreams().add(baDream);
    }


    public static Request toEntity(RequestDTO dto, Member member, House house){

        return Request.builder()
                .house(house)
                .member(member)
                .requestDate(dto.getRequest_date())
                .priceRequest(dto.getPrice_request())
                .build();
    }
}
