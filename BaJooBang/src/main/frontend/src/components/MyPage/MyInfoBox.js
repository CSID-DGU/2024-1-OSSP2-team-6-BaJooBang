import React from 'react';
import './MyInfoBox.css'; 

function MyInfoBox({name, ID, location}) {
  return (
    <div className="MyInfo">
      <div className="MyInfoInner">
        <p className="MyInfoTitle">이름</p>
        <p className="MyInfoContent">{name}</p>
      </div>
      <div className='MyInfoLine'/>
      <div className="MyInfoInner">
        <p className="MyInfoTitle">아이디</p>
        <p className="MyInfoContent">{ID}</p>
      </div>
      <div className='MyInfoLine'/>
      <div className="MyInfoInner">
        <p className="MyInfoTitle">등록 주소</p>
        <p className="MyInfoContent">{location}</p>
      </div>
    </div>
  );
}

export default MyInfoBox;