import React from 'react';
import './MyPage.css'; 
import {ReactComponent as Profile} from '../../components/images/mp_profile.svg';
import InfoBox from '../../components/MyPage/MyInfoBox';

function MyPage() {
  return (
    <div className="MyPageBackground">
      <Profile/>
      <p className='MPName'>박주형님</p>
      <InfoBox name={'박주형'} ID={'pjh030826'} location={'서울특별시 은평구 은평로 21길 52'}/>
    </div>
  );
}

export default MyPage;