import React from 'react';
import './MyPage.css'; 
import {ReactComponent as Profile} from '../../components/images/mp_profile.svg';

function MyPage() {
  return (
    <div className="MyPageBackground">
      <Profile/>
      <p className='MPName'>박주형님</p>
      
    </div>
  );
}

export default MyPage;