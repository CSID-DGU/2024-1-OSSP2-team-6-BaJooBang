package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossp_bajoobang.bajoobang.domain.BaDream;
import ossp_bajoobang.bajoobang.domain.Request;

import java.util.List;

public interface BaDreamRepository extends JpaRepository<BaDream, Long> {
    List<BaDream> findByRequestIn(List<Request> requests);
}
