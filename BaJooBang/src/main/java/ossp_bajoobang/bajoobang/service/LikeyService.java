package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Likey;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.repository.HouseRepository;
import ossp_bajoobang.bajoobang.repository.LikeyRepository;

@Service
@RequiredArgsConstructor
public class LikeyService {

    private final LikeyRepository likeyRepository;
    private final HouseRepository houseRepository;

    public void setLike(Member member, Long house_id) {
        Likey likey = new Likey();
        likey.setMember(member);
        House byHouseId = houseRepository.findByHouseId(house_id);
        likey.setHouse(byHouseId);
        likeyRepository.save(likey);
    }
}
