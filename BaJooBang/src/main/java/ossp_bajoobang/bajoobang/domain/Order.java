package ossp_bajoobang.bajoobang.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY) @JoinColumn(name = "request_id")
    private Request request;

    private String tid;

    public static Order toEntity(Member member, Request request, String tid) {
        return Order.builder()
                .member(member)
                .request(request)
                .tid(tid)
                .build();
    }
}
