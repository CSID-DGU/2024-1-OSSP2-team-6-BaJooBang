package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ossp_bajoobang.bajoobang.domain.PlusRequest;

import java.util.List;

@Repository
public interface PlusRequestRepository extends JpaRepository<PlusRequest, Long> {

    PlusRequest save(PlusRequest plusRequest);

    List<PlusRequest> getReferenceByRequestId(Long request_id);
}

