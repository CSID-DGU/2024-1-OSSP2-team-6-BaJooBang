package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ossp_bajoobang.bajoobang.domain.Request;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    Request save(Request request);
}
