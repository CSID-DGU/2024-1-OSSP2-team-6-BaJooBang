import React, { useEffect, useState } from 'react';
import './MyPage.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    numOfLikes: 0,
    numOfRegistered: 0,
    numOfInquiries: 0,
    numOfFootworks: 0,
    numOfAlarms: 0,
    star: 0.0,
  });
  const [showBottom1, setShowBottom1] = useState(true);
  const [showBottom2, setShowBottom2] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get('/member'); // Replace with your actual API endpoint
            const requestData = response.data;
            setListData(requestData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

  const toggleBottom1 = () => {
    setShowBottom1(true);
    setShowBottom2(false);
  };

  const toggleBottom2 = () => {
    setShowBottom1(false);
    setShowBottom2(true);
  };

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
        <div className="ButtonGroup">
          <button 
            onClick={toggleBottom1} 
            className={`ToggleBottomButton ${showBottom1 ? 'active-bottom1' : 'inactive-bottom1'}`}
          >
            요청인
          </button>
          <button 
            onClick={toggleBottom2} 
            className={`ToggleBottomButton ${showBottom2 ? 'active-bottom2' : 'inactive-bottom2'}`}
          >
            발품인
          </button>
        </div>
        
        {showBottom1 && (
          <div className='MyBottom1'>
            <Link to='/member/heart' style={{textDecoration: 'none'}}>
              <BottomBox content={'찜한 방'} number={listData.numOfLikes} Icon={Heart}/>
            </Link>
            <Link to='/member/registered' style={{textDecoration: 'none'}}>
              <BottomBox content={'등록 매물'} number={listData.numOfRegistered} Icon={File}/>
            </Link>
            <Link to="/member/inquiry" style={{textDecoration: 'none'}}>
              <BottomBox content={'신청 조회'} number={listData.numOfInquiries} Icon={Person}/>
            </Link>
          </div>
        )}
        
        {showBottom2 && (
          <div className='MyBottom2'>
            <BottomBox content={'나의 별점'} number={listData.star} Icon={Star} score={true}/> 
            <Link to='/member/footwork' style={{textDecoration: 'none'}}>
              <BottomBox content={'신청 발품'} number={listData.numOfFootworks} Icon={Search}/>
            </Link>
            <Link to='/member/alarm' style={{textDecoration: 'none'}}>
              <BottomBox content={'알림'} number={listData.numOfAlarms} Icon={Alarm}/>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
