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

  // 파라미터로 전달된 id 값이 숫자인지 확인하고, positions 배열에서 해당하는 위치 정보를 가져옵니다.
  // const position = positions.find(pos => pos.house_id === parseInt(house_id));

  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchPosition = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/helpinfo/detail?house_id=${house_id}`);
        setPosition(response.data);
      } catch (error) {
        console.error('Failed to fetch position:', error);
      }
    };

    fetchPosition();
  }, [house_id]);

  // position이 존재하지 않는 경우에 대한 오류 처리
  if (!position) {
    return <div>해당하는 위치 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <div className="container">
          
          <div className='leftinfo'>
            <div id='house_image'>
              <p id='naming'>{position.content}</p>
              <p id='moneying'>월세 {position.money1} / {position.money2}</p>
              
            </div>
            <div id='house_info'>
              <h3> 매물 사진 </h3>
              <h3> 매물 정보 </h3>
              <div id='house_detail'>
                <p>월 관리비 <span className='detailblank'></span> {position.money1}</p>
                <p>관리비 포함 </p>
                <p>해당 층 / 총 층 </p>
                <p>방 수 </p>
                <p>. </p>
                <p>.  </p>
                <p>. </p>
                <p>. </p>
                <p>.  </p>
                <p>. </p>
                <p>. </p>
                <p>.  </p>
                <p>. </p>
              </div>
            </div>
          </div>

          <div className='rightinfo'>
          <div className="card-header">중개사</div>
          <div className="card">
              
              <div className="profile">
                <div className="avatar">
                 <Profilecircle/>
                </div>
                <div className="name">대표 홍길동</div>
              </div>
              <div className="contact-info">
                <p><Location/><span className="icon location"></span> 위치</p>
                <div className="contact-details">
                <p>서울특별시 서울로 123길 45</p>
               </div>
                <p><Call/><span className="icon phone"></span> 전화</p>
                <div className="contact-details">
                <p>010-1234-5678</p>
               </div>
              </div>
              
              
            </div>
            <div className="actions">
                   
                 <button className="btn heart"><Heart/>찜하기</button>
                 <Link to={`/request/${position.house_id}`}>
                    <button className="btn message"><List/>발품 요청서 작성</button>
                  </Link>
              </div>
          </div>


          
      </div>
    </div>
  );
}

export default Imformation;
