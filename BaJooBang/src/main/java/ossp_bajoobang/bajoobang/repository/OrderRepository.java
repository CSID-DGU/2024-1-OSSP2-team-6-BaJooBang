package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ossp_bajoobang.bajoobang.domain.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // member_id와 request_id로 Order 엔티티를 찾는 메서드
    Order findByMemberIdAndRequestRequestId(Long memberId, Long requestId);
}
