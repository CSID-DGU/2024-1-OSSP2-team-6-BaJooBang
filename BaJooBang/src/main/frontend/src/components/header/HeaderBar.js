import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HeaderBar.css'; // CSS 파일 임포트
import { AuthContext } from '../../AuthContext';

function HeaderBar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm('로그아웃을 하시겠습니까?');
    if (!confirmLogout) return;

    try {
      const sessionId = sessionStorage.getItem('sessionId'); // 세션 ID를 세션 스토리지에서 가져옴
      const response = await axios.post('/logout', {}, {
        headers: {
          'Authorization': `Bearer ${sessionId}`,
        },
        withCredentials: true,
      });
      console.log('Logout successful:', response.data);
      logout(); // AuthContext의 logout 함수 호출
      alert('로그아웃되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <header className="header-bar">
      <NavLink to="/" exact>
        <h1>바줘방</h1>
      </NavLink>
      <div className='outBox'>
        <div className='innerBox'>
          <NavLink to="/domap" activeClassName="active">
            <p>발품 지도</p>
          </NavLink>
        </div>
        <div className='innerBox'>
          <NavLink to="/helpmap" activeClassName="active">
            <p>매물 지도</p>
          </NavLink>
        </div>
        {isLoggedIn ? (
          <>
            <div className='innerBox'>
              <NavLink to="/member" activeClassName="active">
                <p>마이페이지</p>
              </NavLink>
            </div>
            <div className='innerBox'>
              <p onClick={handleLogout}>로그아웃</p>
            </div>
          </>
        ) : (
          <div className='innerBox'>
            <NavLink to="/login">
              <p>로그인</p>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderBar;
