import React from 'react';
import './MyPage.css'; 
import {ReactComponent as Profile} from '../../components/images/mp_profile.svg';
import InfoBox from '../../components/MyPage/MyInfoBox';
import BottomBox from './BottomBox';

function MyPage() {
  return (
    <div className="MyPageBackground">
      <Profile/>
      <p className='MPName'>박주형님</p>
      <InfoBox name={'박주형'} ID={'pjh030826'} location={'서울특별시 은평구 은평로 21길 52'}/>

      <div className='MyBottom'>
        <BottomBox content={'찜한 방'} number={'5'}/> 
        <BottomBox content={'등록 매물'} number={'5'}/>
        <BottomBox content={'신청 조회'} number={'5'}/>
      </div>
    </div>
  );
}

export default MyPage;