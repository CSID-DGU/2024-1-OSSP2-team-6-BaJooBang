import React, { useEffect, useState, useContext } from 'react';
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
  const navigate = useNavigate();
  const [listData, setListData] = useState({
    memberDTO: {},
    numOfRegistered: 0,
    numOfInquiries: 0,
    numOfFootworks: 0,
    numOfAlarms: 0
  });

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/member'); // Replace with your actual API endpoint
            const requestData = response.data;
            setListData(requestData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  return (
    <div className="MyPageBackground">
      
      <Profile/>
      <p className='MPName'>{listData.memberDTO.name}님</p>
      <InfoBox 
        name={listData.memberDTO.name} 
        ID={listData.memberDTO.email} 
        location={listData.memberDTO.address}
      />
      <div className='Bottom'>
        <div className='MyBottom1'>
          <p>요청인</p> 
          <Link to='/member/heart' style={{textDecoration: 'none'}}>
            <BottomBox content={'찜한 방'} number={'0'} Icon={Heart}/> 
          </Link>
          <Link to='/member/registered' style={{textDecoration: 'none'}}>
            <BottomBox content={'등록 매물'} number={listData.numOfRegistered} Icon={File}/>
          </Link>
          <Link to="/member/inquiry" style={{textDecoration: 'none'}}>
            <BottomBox content={'신청 조회'} number={listData.numOfInquiries} Icon={Person}/>
          </Link>
        </div>
        <div className='MyBottom2'>
          <p>발품인</p> 
          <BottomBox content={'나의 별점'} number={'4.8'} Icon={Star} score={true}/> 
          <Link to='/member/footwork' style={{textDecoration: 'none'}}>
            <BottomBox content={'신청 발품'} number={listData.numOfFootworks} Icon={Search}/>
          </Link>
          <Link to='/member/alarm' style={{textDecoration: 'none'}}>
            <BottomBox content={'알림'} number={listData.numOfAlarms} Icon={Alarm}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
