import React, { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './helpinfo.css';
import { ReactComponent as Location } from '../components/images/location.svg';
import { ReactComponent as Call } from '../components/images/call.svg';
import { ReactComponent as Profilecircle } from '../components/images/profile_circle.svg';
import { ReactComponent as List } from '../components/images/list.svg';
import { ReactComponent as Heart } from '../components/images/heart.svg';

const Imformation = ({ positions }) => {
  const { house_id } = useParams();
  const numericHouseId = parseInt(house_id); // 문자열을 숫자로 변환

  const [position, setPosition] = useState(null);

  useEffect(() => {
// 선택된 house_id가 유효한지 확인하고 해당하는 position을 찾습니다.
    const selectedPosition = positions.find(pos => pos.house_id === numericHouseId);
    if (selectedPosition) {
      setPosition(selectedPosition); // 직접적으로 positions 배열에서 데이터를 로드
    } else {
// 서버에서 데이터를 가져오는 경우
      const fetchPosition = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/helpinfo/detail?house_id=${house_id}`);
          setPosition(response.data);
        } catch (error) {
          console.error('Failed to fetch position:', error);
        }
      };
      fetchPosition();
    }
  }, [house_id, positions]); // dependencies에 positions도 추가

  if (!position) {
    return <div>해당하는 위치 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container">
      <div className="leftinfo">
        <div id="house_image">
          <p id="naming">{position.content}</p>
          <p id="moneying">월세 {position.money1} / {position.money2}</p>
        </div>

        <div id="house_info">
          <h3> 매물 사진 </h3>
          <p><span className="blank"></span>{position.house_image1}<span className="blank"></span>{position.house_image2}</p>
          <h3> 매물 평면도 </h3>
          <p><span className="blank"></span>{position.house_all_image}</p>
          <h3> 매물 정보 </h3>
          <div id="house_detail">
            <div id="house_detail_title">
              <p>월 관리비</p>
              <p>관리비 포함</p>
              <p>전용면적</p>
              <p>해당 층 / 총 층</p>
              <p>방 수</p>
              <p>방향</p>
              <p>입주 가능일</p>
            </div>
            <div className="house_detail_more">
              <p>{position.money1}</p>
              <p>{position.money2}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rightinfo">
        <div className="card-header">중개사</div>
        <div className="card">
          <div className="profile">
            <div className="avatar">
              <Profilecircle />
            </div>
            <div className="name">대표 홍길동</div>
          </div>
          <div className="contact-info">
            <p><Location /><span className="icon location"></span> 위치</p>
            <div className="contact-details">
              <p>서울특별시 서울로 123길 45</p>
            </div>
            <p><Call /><span className="icon phone"></span> 전화</p>
            <div className="contact-details">
              <p>010-1234-5678</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <button className="btn heart"><Heart />찜하기</button>
          <Link to={`/request/${house_id}`}>
            <button className="btn message"><List />발품 요청서 작성</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Imformation;
