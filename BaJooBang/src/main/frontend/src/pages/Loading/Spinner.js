import React from 'react';
import Spinner from '../../components/images/Spinner.gif';
import './Spinner.css'; 

function Loading() {
  return (
    <div className="loading-container"> 
      <img src={Spinner} alt="로딩중" width="30%" />
      <div className="loading-text">페이지를 로딩 중입니다...</div>
    </div>
  );
};

export default Loading;
