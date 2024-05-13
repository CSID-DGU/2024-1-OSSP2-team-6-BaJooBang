import {React, useState } from 'react';
import './MyPage.css'; 
import {ReactComponent as Profile} from '../../components/images/mp_profile.svg';
import InfoBox from '../../components/MyPage/MyInfoBox';
import BottomBox from './BottomBox';
import { ReactComponent as Heart } from '../../components/images/myHeart.svg';
import { ReactComponent as File } from '../../components/images/myFile.svg';
import { ReactComponent as Person } from '../../components/images/myPerson.svg';
import { ReactComponent as Star } from '../../components/images/myStar.svg';
import { ReactComponent as Search } from '../../components/images/mySearch.svg';
import { ReactComponent as Alarm } from '../../components/images/myAlarm.svg';


function MyPage() {
  const [mode, setMode] = useState(false);

  function changeMode() {
    setMode(!mode);
  }

  return (
    <div className="MyPageBackground">
      <Profile/>
      <p className='MPName'>박주형님</p>
      <InfoBox name={'박주형'} ID={'pjh030826'} location={'서울특별시 은평구 은평로 21길 52'}/>

      <button onClick={() => changeMode()}>Change Mode</button>

      {mode ?
        <div className='MyBottom1'>
          <BottomBox content={'찜한 방'} number={'5'} Icon={Heart}/> 
          <BottomBox content={'등록 매물'} number={'5'} Icon={File}/>
          <BottomBox content={'신청 조회'} number={'5'} Icon={Person}/>
        </div>
        :
        <div className='MyBottom2'>
          <BottomBox content={'나의 별점'} number={'5'} Icon={Star}/> 
          <BottomBox content={'신청 발품'} number={'5'} Icon={Search}/>
          <BottomBox content={'알림'} number={'5'} Icon={Alarm}/>
        </div>
      }
      
    </div>
  );
}

export default MyPage;