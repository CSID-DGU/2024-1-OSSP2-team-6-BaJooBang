/*global kakao*/
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './showmap.css';

export const dopositions = [
  {
    "house_id": 1,
    "dealmoney": "20,000",
    "time": 10,
    "distance": 765,
    "human": "홍길동",
    "content": "서울특별시 필동",
    "latLng": {
      "lat": 37.558077,
      "lng": 127.000882
    },
   "hasNotification": true
  },
  {
    "house_id": 2,
    "dealmoney": "10,000",
    "time": 10,
    "distance": 765,
    "human": "안녕",
    "content": "서울특별시 을지로",
    "latLng": {
      "lat": 37.566882968825,
        "lng": 126.99092687291
    },
    
   "hasNotification": false
  },
  {
    "house_id": 3,
    "dealmoney": "30,000",
    "time": 10,
    "distance": 765,
    "human": "김유민",
    "content": "서울특별시 장충로",
    "latLng": {
      "lat": 37.560413254084,
      "lng": 127.00768457766
    },
    "hasNotification": false
  },
  {
    "house_id": 3,
    "dealmoney": "30,000",
    "time": 10,
    "distance": 765,
    "human": "dksljf",
    "content": "서울특별시 장충로",
    "latLng": {
      "lat": 37.560413254084,
      "lng": 127.00768457766
    },
    "hasNotification": false
  }
];

// house_id를 기준으로 positions를 그룹화한 함수
function groupByHouseId(positions) {
  return positions.reduce((acc, position) => {
    acc[position.house_id] = acc[position.house_id] || [];
    acc[position.house_id].push(position);
    return acc;
  }, {});
}

// 로그인이 되었을 경우 안되었을 경우
function DONav({ positions }) {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return sessionStorage.getItem('loggedIn') === 'true';
  };

  const handleLinkClick = (e, path) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      alert('로그인을 해야합니다.');
      navigate('/login');
    }
  };

  return (
    <nav>
      <ol>
        {positions.map(position => (
          <li key={position.house_id}>
            <h2>￦ {position.dealmoney}</h2>
            <p><span className="blank"></span>위치 | {position.content}</p>
            <p><span className="blank"></span>요청인<span className="blank"></span>|<span className="blank"></span>{position.human}</p>
            <p><span className="blank"></span>도보 | <span className="blank_gray">{position.time}분</span><span className="blank"></span>거리 | <span className="blank_gray">{position.distance}m</span></p>
            <Link 
              to={`/request/${dopositions.house_id}`}
              //onClick={(e) => handleLinkClick(e, `/`)}
            >
              <span className="blank"></span>요청서 보러가기 {'>>'}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

const DopageMap = ({ search, showOnlyNotified}) => {
  const filteredPositions = dopositions.filter(position =>
    position.content.includes(search) &&
    (!showOnlyNotified || (showOnlyNotified && position.hasNotification))
  );
  /*

    const [dopositions, setDopositions] = useState([]);
    const { local_id } = useParams();
    useEffect(() => {
        // API로부터 데이터를 가져오는 함수 정의
        const fetchData = async () => {
            try {
                // axios를 사용하여 GET 요청 보내고 데이터 받아오기
                const response = await axios.get(`http://localhost:8000/balpoom?local_id=1`);
                // API에서 받은 데이터를 positions 상태에 설정
                setDopositions(response.data);
            } catch (error) {
                console.error('api 에러:', error);
            }
        };

        // fetchData 함수 호출
        fetchData();
    }, []);*/
//----------------------------------------------------------------------------------------------------


useEffect(() => {
  let markers = [];
  let mapContainer = document.getElementById("map");
  let mapOption = {
    center: new kakao.maps.LatLng(37.559023, 127.005296),
    level: 3,
  };

  let map = new kakao.maps.Map(mapContainer, mapOption);
  let mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  let zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  markers.forEach(marker => marker.setMap(null));
  markers = [];

  let bounds = new kakao.maps.LatLngBounds();

  // house_id의 개수를 계산
  const houseIdCounts = new Map();
  dopositions.forEach(pos => {
    houseIdCounts.set(pos.house_id, (houseIdCounts.get(pos.house_id) || 0) + 1);
  });

  filteredPositions.forEach(position => {
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(position.latLng.lat, position.latLng.lng)
    });

    // house_id 개수에 따른 인포윈도우 내용 설정
    let infowindowContent = `알림 받은 개수: ${houseIdCounts.get(position.house_id)}`;
    let infowindow = new kakao.maps.InfoWindow({
      content: infowindowContent
    });

    kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
    kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

    markers.push(marker);
    bounds.extend(new kakao.maps.LatLng(position.latLng.lat, position.latLng.lng));
  });

  if (filteredPositions.length > 0) {
    map.setBounds(bounds);
  }

  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  function makeOutListener(infowindow) {
    return function () {
      infowindow.close();
    };
  }
}, [filteredPositions]);


  return (
    <div className="map_wrap">
      <div id="map"></div>
      <div id="menu_wrap" className="bg_white">
        <DONav positions={filteredPositions} />
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default DopageMap;
