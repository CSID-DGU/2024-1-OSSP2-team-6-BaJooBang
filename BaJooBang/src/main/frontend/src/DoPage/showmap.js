/*global kakao*/
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
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
    }
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
    }
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
    }
  }
];

function DONav({ positions }) {
  return (
    <nav>
      <ol>
        {positions.map(position => (
          <li key={position.house_id}>
            <h2>￦ {position.dealmoney}</h2>
            <p><span className="blank"></span>위치 | {position.content}</p>
            <p><span className="blank"></span>요청인<span className="blank"></span>|<span className="blank"></span>{position.human}</p>
            <p><span className="blank"></span>도보 | <span className="blank_gray">{position.time}분</span><span className="blank"></span>거리 | <span className="blank_gray">{position.distance}m</span></p>
            <Link to={`/`}><span className="blank"></span>요청서 보러가기 {'>>'}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

const DopageMap = ({ search }) => {
  const filteredPositions = dopositions.filter(position =>
    position.content.includes(search)
  );/*

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
    // 마커를 담을 배열입니다
    let markers = [];
    let mapContainer = document.getElementById("map"); // 지도를 표시할 div

    let mapOption = {
      center: new kakao.maps.LatLng(37.559023, 127.005296), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    let map = new kakao.maps.Map(mapContainer, mapOption);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    let mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성합니다
    let zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // 지도 영역을 설정하는 객체를 생성합니다
    let bounds = new kakao.maps.LatLngBounds();

    filteredPositions.forEach(position => {
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(position.latLng.lat, position.latLng.lng)
      });

      // 마커에 표시할 인포윈도우를 생성합니다 
      let infowindow = new kakao.maps.InfoWindow({
        content: position.content
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));

      markers.push(marker);

      // bounds 객체에 마커의 좌표를 추가합니다
      bounds.extend(new kakao.maps.LatLng(position.latLng.lat, position.latLng.lng));
    });

    // 검색 결과가 있을 경우, 해당 마커들의 위치가 모두 보이도록 지도 영역을 재설정합니다
    if (filteredPositions.length > 0) {
      map.setBounds(bounds);
    }

    // 인포윈도우를 표시하는 클로저를 만드는 함수 
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }
    // 인포윈도우를 닫는 클로저를 만드는 함수
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
