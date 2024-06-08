package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ossp_bajoobang.bajoobang.domain.BaDream;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.domain.Request;

import java.util.List;

@Repository
public interface BaDreamRepository extends JpaRepository<BaDream, Long> {
    List<BaDream> findByRequestIn(List<Request> requests);
    List<BaDream> findByMember(Member member);
}
