/*global kakao*/
//지우면 안됌 api 사용불가함
import "./kakaomap.css";
import React, { useEffect } from "react";
import {Route,Routes } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Info from './helpinfo';
//import Swal from "sweetalert2";
//import dummy from "..data.json"



const MypageMap = () => {
  // 더미 데이터 이곳!!!!!!!!!!!!!!!!!!!!!
     // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다 
     var positions = [
      {
          content: '카카오',
          money1 : '300',
          money2 : '30' ,
          stair : '6',
          size : '23',
          latlng: new kakao.maps.LatLng(33.450705, 126.570677)
      },
      {
          content: '생태연못',
          money1 : '300',
          money2 : '30' ,
          stair : '6',
          size : '23', 
          latlng: new kakao.maps.LatLng(33.450936, 126.569477)
      },
      {
          content: '텃밭',
          money1 : '300',
          money2 : '30' ,
          stair : '6',
          size : '23', 
          latlng: new kakao.maps.LatLng(33.450879, 126.569940)
      },
      {
          content: '근린공원',
          money1 : '300',
          money2 : '30' ,
          stair : '6',
          size : '23',
          latlng: new kakao.maps.LatLng(33.451393, 126.570738)
      }
  ];

  useEffect(() => { 
    // 마커를 담을 배열입니다
    try {
      var markers = [];

      var mapContainer = document.getElementById("map"); // 지도를 표시할 div

      var mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
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
              position: positions[i].latlng // 마커의 위치
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
    
  }, []);

  return (
    <div className="map_wrap">
      <div id="map"></div>
      <div id="menu_wrap" className="bg_white">
        <ul id="placesList">
          {positions.map((position, index) => (
           <li key={index}>
            <h4 id="housename"><Link to ='/helpinfo'>{position.content}</Link></h4>
            <p>월세:{Number(position.money1)}/{Number(position.money2)}</p>
            <p>층수:{Number(position.stair)}층</p>
            <p>평수:{Number(position.money1)}m3</p>
           </li>
           ))}
        </ul>
        <Routes>
          <Route path="/helpinfo" element= {<Info/>}/>
        </Routes>
        <div id="pagination"></div>
      </div>
    </div>
  );
};
export default MypageMap;