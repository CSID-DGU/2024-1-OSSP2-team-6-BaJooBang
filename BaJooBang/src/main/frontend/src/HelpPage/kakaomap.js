/*global kakao*/
import "./kakaomap.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
//import Imfor from "./helpinfo";

 // 더미 데이터 이곳!!!!!!!!!!!!!!!!!!!!!
     // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
export const positions=[

];

  const Nav = ({ positions }) => {
    return (
      <nav>
        <ol>
          {positions.map(position => (
            <li key={position.house_id}>
              <Link to={`/helpinfo/${position.house_id}`} className="helpMapTitle">{position.content}</Link>
              <p className="helpMapPrice">월세 | {position.money1} / {position.money2} </p>
              <p>층수 | <span className="blank">{position.stair}층</span> 관리비 | <span className="blank">{position.management}만원</span></p>
              <p>평수 | <span className="blank">{position.size}m3</span></p>
              <Link to={`/helpinfo/${position.house_id}`}> 상세 정보 확인하기</Link>
  
           
            </li>
          ))}
        </ol>
      </nav>
    );
  };


const MypageMap = () => {

//--------------------------------------------api 매물지도 get------------------------------------------
  const { house_id } = useParams();

//--------------------------------------------api 매물지도 get------------------------------------------
  const [positions, setPositions] = useState([]);
  const { local_id } = useParams();
  useEffect(() => {
    // API로부터 데이터를 가져오는 함수 정의
    const fetchData = async () => {
      try {
        // axios를 사용하여 GET 요청 보내고 데이터 받아오기
        const response = await axios.get(`http://localhost:8000/helpinfo?local_id=1`);
        // API에서 받은 데이터를 positions 상태에 설정
        setPositions(response.data);
      } catch (error) {
        console.error('api 에러:', error);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, []);
//----------------------------------------------------------------------------------------------------


  useEffect(() => { 
    // 마커를 담을 배열입니다
    try {

      var mapContainer = document.getElementById("map"); // 지도를 표시할 div

      var mapOption = {
        center: new kakao.maps.LatLng(37.559023, 127.005296), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
      var mapTypeControl = new kakao.maps.MapTypeControl();

      // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
      // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);   


      for (var i = 0; i < positions.length; i ++) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new kakao.maps.LatLng(positions[i].latLng.lat, positions[i].latLng.lng) // 마커의 위치
          });

          // 마커에 표시할 인포윈도우를 생성합니다 
          var infowindow = new kakao.maps.InfoWindow({
              content: positions[i].content // 인포윈도우에 표시할 내용
          });

          // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
          // 이벤트 리스너로는 클로저를 만들어 등록
          // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
          kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
          kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
      }

      // 인포윈도우를 표시하는 클로저를 만드는 함수 
      function makeOverListener(map, marker, infowindow) {
          return function() {
              infowindow.open(map, marker);
          };
      }
      // 인포윈도우를 닫는 클로저를 만드는 함수
      function makeOutListener(infowindow) {
          return function() {
              infowindow.close();
          };
      }
    }


    catch (err) {
      console.log(err);
    }
    
  });

  return (
    <div className="map_wrap">
      <div id="map"></div>
      <div id="menu_wrap" className="bg_white">
        <Nav positions={positions}></Nav>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default MypageMap;