package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ossp_bajoobang.bajoobang.domain.File;
import ossp_bajoobang.bajoobang.domain.Request;

import java.util.List;

@Repository
public interface BalpoomFileRepository extends JpaRepository<File, Long> {
    List<File> findByRequest(Request request);
}
