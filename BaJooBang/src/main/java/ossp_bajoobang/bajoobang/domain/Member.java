package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.*;
import lombok.*;
import ossp_bajoobang.bajoobang.dto.SignupForm;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String name;

    private String email;

    private String pw;

    private String address;
    private double latitude;
    private double longitude;

    @Column(columnDefinition = "float default 0")
    private float star; // 별점
    @Column(columnDefinition = "integer default 0")
    private int starCount; // 별점 받은 횟수

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    private List<Request> requests = new ArrayList<>();

    @OneToMany(mappedBy = "balpoomin", fetch = FetchType.EAGER)
    private List<Request> requestsAsBalpoomin = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    private List<Alarm> alarms = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    private List<BaDream> baDreams = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    private List<Likey> likeys = new ArrayList<>();

    public void setRequest(Request request) {
        this.getRequests().add(request);
    }

    public void setRequestAsBalpoominMember(Request request) {
        this.getRequestsAsBalpoomin().add(request);
    }

    public void setAlarm(Alarm alarm) {
        this.getAlarms().add(alarm);
    }

    public void setBaDream(BaDream baDream) {
        this.getBaDreams().add(baDream);
    }
    // dto를 엔티티로 변환
    public static Member toEntity(SignupForm signupForm) {
        return Member.builder()
                .name(signupForm.getName())
                .email(signupForm.getEmail())
                .pw(signupForm.getPw())
                .address(signupForm.getAddress())
                .latitude(signupForm.getLatitude())
                .longitude(signupForm.getLongitude())
                .build();
    }

}
