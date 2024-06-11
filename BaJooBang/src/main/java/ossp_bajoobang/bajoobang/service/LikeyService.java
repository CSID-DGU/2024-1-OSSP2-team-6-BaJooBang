package ossp_bajoobang.bajoobang.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ossp_bajoobang.bajoobang.domain.House;
import ossp_bajoobang.bajoobang.domain.Likey;
import ossp_bajoobang.bajoobang.domain.Member;
import ossp_bajoobang.bajoobang.repository.HouseRepository;
import ossp_bajoobang.bajoobang.repository.LikeyRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    // 찜 리스트
    public List<Map<String, Object>> getLikeInfo(Member member) {
        List<Map<String, Object>> likeInfo = new ArrayList<>();
        List<Likey> byMember = likeyRepository.findByMember(member);
        for (Likey likey : byMember) {
            Map<String, Object> likeMap = new HashMap<>();
            House house = likey.getHouse();
            likeMap.put("address", house.getContent());
            likeMap.put("month_price", house.getMoney2());
            likeMap.put("house_id", house.getHouseId());
            likeInfo.add(likeMap);
        }
        return likeInfo;
    }

    public int getNumOfLikes(Member member) {
        List<Likey> byMember = likeyRepository.findByMember(member);
        return byMember.size();
    }
}
