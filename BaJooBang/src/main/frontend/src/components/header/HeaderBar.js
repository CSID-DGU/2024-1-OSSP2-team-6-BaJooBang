import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeaderBar.css'; // CSS 파일 임포트

function HeaderBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 세션 스토리지에서 로그인 상태를 확인
    const loggedInStatus = sessionStorage.getItem('loggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="header-bar">
      <Link to="/">
        <h1>바줘방</h1>
      </Link>
      <div className='outBox'>
        <div className='innerBox'>
          <Link to="/domap"><p>발품 지도</p></Link>
        </div>
        <div className='innerBox'>
          <Link to="/helpmap"><p>매물 지도</p></Link>
        </div>
        {isLoggedIn ? (
          <div className='innerBox'>
            <Link to="/mypage"><p>마이페이지</p></Link>
          </div>
        ) : (
          <div className='innerBox'>
            <Link to="/login"><p>로그인</p></Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderBar;
