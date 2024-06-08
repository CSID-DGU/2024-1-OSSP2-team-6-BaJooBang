package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ossp_bajoobang.bajoobang.domain.Alarm;
import ossp_bajoobang.bajoobang.domain.Member;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    @Query("select a.member.id from Alarm a where a.request.requestId = :requestId")
    List<Long> findMemberIdByRequestId(Long requestId);

    List<Alarm> findByMember(Member member);
}
