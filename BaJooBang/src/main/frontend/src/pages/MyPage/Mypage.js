import React, { useContext } from 'react';
import './MyPage.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { ReactComponent as Profile } from '../../components/images/mp_profile.svg';
import InfoBox from '../../components/MyPage/MyInfoBox';
import BottomBox from './BottomBox';
import { ReactComponent as Heart } from '../../components/images/myHeart.svg';
import { ReactComponent as File } from '../../components/images/myFile.svg';
import { ReactComponent as Person } from '../../components/images/myPerson.svg';
import { ReactComponent as Star } from '../../components/images/myStar.svg';
import { ReactComponent as Search } from '../../components/images/mySearch.svg';
import { ReactComponent as Alarm } from '../../components/images/myAlarm.svg';

function MyPage() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const sessionId = sessionStorage.getItem('sessionId'); // 세션 ID를 세션 스토리지에서 가져옴
      const response = await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        },
        withCredentials: true,
      });
      console.log('Logout successful:', response.data);
      logout(); // AuthContext의 logout 함수 호출
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="MyPageBackground">
      
      <Profile/>
      <p className='MPName'>박주형님</p>
      <InfoBox name={'박주형'} ID={'pjh030826'} location={'서울특별시 은평구 은평로 21길 52'}/>
      <div className='Bottom'>
        <div className='MyBottom1'>
          <p>요청인</p> 
          <Link to='/member/heart' style={{textDecoration: 'none'}}>
            <BottomBox content={'찜한 방'} number={'5'} Icon={Heart}/> 
          </Link>
          <Link to='/member/registered' style={{textDecoration: 'none'}}>
            <BottomBox content={'등록 매물'} number={'5'} Icon={File}/>
          </Link>
          <Link to="/member/inquiry" style={{textDecoration: 'none'}}>
            <BottomBox content={'신청 조회'} number={'5'} Icon={Person}/>
          </Link>
        </div>
        <div className='MyBottom2'>
          <p>발품인</p> 
          <BottomBox content={'나의 별점'} number={'5'} Icon={Star} score={true}/> 
          <Link to='/member/footwork' style={{textDecoration: 'none'}}>
            <BottomBox content={'신청 발품'} number={'5'} Icon={Search}/>
          </Link>
          <Link to='/member/alarm' style={{textDecoration: 'none'}}>
            <BottomBox content={'알림'} number={'5'} Icon={Alarm}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
