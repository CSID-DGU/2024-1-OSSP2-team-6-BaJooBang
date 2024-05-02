/*global kakao*/
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import './showmap.css'

export const dopositions=[ 
  {
    "house_id": 1,
    "dealmoney" : "20,000",
    "time":10,
    "distance": 765,
    "human": "홍길동",
    "content": "서울특별시 양천구",
    "latLng": {
        "lat": 37.558077,
        "lng": 127.000882
    }
}
  ];

  function DONav(props){
    return (
      <nav>
        <ol>
          {dopositions.map(position => (
            <li key={position.house_id}>
              <h2>W {position.dealmoney}</h2>
              <p><span className="blank"></span>위치 | {position.content}</p>
              <p><span className="blank"></span>
              요청인<span className="blank"></span>|<span className="blank"></span>{position.human}</p>
              <p><span className="blank"></span>도보 | <span className="blank_gray">{position.time}분</span><span className="blank"></span>
               거리 | <span className="blank_gray">{position.distance}m</span></p>
              
              
              <Link to={`/`}><span className="blank"></span>요청서 보러가기 {'>>'}</Link>
            </li>
          ))}
        </ol>
      </nav>
    );
  }

const DopageMap = () => {

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


      for (var i = 0; i < dopositions.length; i ++) {
          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new kakao.maps.LatLng(dopositions[i].latLng.lat, dopositions[i].latLng.lng) // 마커의 위치
          });

          // 마커에 표시할 인포윈도우를 생성합니다 
          var infowindow = new kakao.maps.InfoWindow({
              content: dopositions[i].content // 인포윈도우에 표시할 내용
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
      <DONav dopositions={dopositions}></DONav>
        <div id="pagination"></div>
      </div>
    </div>
  );
};
export default DopageMap;