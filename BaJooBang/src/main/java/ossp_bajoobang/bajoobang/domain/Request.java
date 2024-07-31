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

    // 주소
    private String address;

    //tf
//    private boolean apply = false;
//    private boolean complete = false;

    // 수압
    private Integer powerWater = null;
    private Integer powerWash = null;
    private Integer powerShower = null;

    // 온수 시간
    private String timeWater1 = null;
    private String timeWater2 = null;
    private String timeWash1 = null;
    private String timeWash2 = null;
    private String timeShower1 = null;
    private String timeShower2 = null;



    // 채광
    private String lighting = null;

    // 곰팡이
    private Boolean moldLiving = null;
    private Boolean moldRest = null;
    private Boolean moldVeranda = null;
    private Boolean moldShoes = null;
    private Boolean moldWindow = null;

    @OneToMany(mappedBy = "request")
    @JsonManagedReference
    private List<PlusRequest> plusRequests = new ArrayList<>();

    @OneToMany(mappedBy = "request")
    private List<Alarm> alarms = new ArrayList<>();

    @OneToMany(mappedBy = "request")
    private List<BaDream> baDreams = new ArrayList<>();

    // 매칭 상태값
    private String status;

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

    // 파일들
    @OneToMany(mappedBy = "request")
    private List<File> files = new ArrayList<>();

    @OneToOne(mappedBy = "request", fetch = FetchType.LAZY)
    private Order order;


    public void setBaDream(BaDream baDream) {
        this.getBaDreams().add(baDream);
    }


    public static Request toEntity(RequestDTO dto, Member member, House house, String address){

        return Request.builder()
                .house(house)
                .member(member)
                .requestDate(dto.getDate())
                .priceRequest(dto.getPrice())
                .address(address)
                .build();
    }
}
