package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ossp_bajoobang.bajoobang.domain.House;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findByLocalId(Long local_id);
    House findByHouseId(Long house_id);

    @Query("select h from House h inner JOIN FETCH h.request r where h.localId = ?1")
    List<House> findByLocalIdAndRequest(Long localId);
}
