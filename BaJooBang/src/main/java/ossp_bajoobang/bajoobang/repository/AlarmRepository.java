package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ossp_bajoobang.bajoobang.domain.Alarm;

@Repository

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

}
