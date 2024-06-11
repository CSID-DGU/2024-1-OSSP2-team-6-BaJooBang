package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ossp_bajoobang.bajoobang.domain.Likey;
import ossp_bajoobang.bajoobang.domain.Member;

import java.util.List;

@Repository
public interface LikeyRepository extends JpaRepository<Likey, Long> {

    List<Likey> findByMember(Member member);
}
