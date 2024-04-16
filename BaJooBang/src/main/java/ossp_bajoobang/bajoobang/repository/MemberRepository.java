package ossp_bajoobang.bajoobang.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ossp_bajoobang.bajoobang.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
