package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Alarm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id")
    private Request request;

    // 알람 T/F?

    public void setMember(Member member) {
        this.member = member;
        member.getAlarms().add(this);
    }

    public void setRequest(Request request) {
        this.request = request;
        request.getAlarms().add(this);
    }
}
