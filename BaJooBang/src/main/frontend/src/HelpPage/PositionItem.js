import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './box.css';

const PositionItem = ({ position, isLoggedIn }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleLinkClick = (e, path) => {
    if (!isLoggedIn()) {
      e.preventDefault();
      alert('로그인을 해야합니다.');
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const toggleFavorite = async () => {
    if (!isLoggedIn()) {
      alert('로그인을 해야합니다.');
      navigate('/login');
      return;
    }

    try {
      let response;
      if (isFavorite) {
        // 찜하기 취소
        response = await axios.delete(`/like?house_id=${position.house_id}`);
      } else {
        // 찜하기
        response = await axios.post(`/like?house_id=${position.house_id}`);
      }

      if (response.status === 200) {
        console.log(isFavorite ? '찜하기 취소 성공' : '찜하기 성공');
        setIsFavorite(!isFavorite);
      } else {
        console.error(isFavorite ? 'Failed to remove favorite' : 'Failed to add favorite', response.data);
      }
    } catch (error) {
      console.error(isFavorite ? 'Error removing favorite' : 'Error adding favorite', error);
    }
  };

  return (
    <li key={position.house_id}>
      <Link
        to={`/helpinfo/${position.house_id}`}
        className="helpMapTitle"
        onClick={(e) => handleLinkClick(e, `/helpinfo/${position.house_id}`)}
      >
        <h3>{position.type} {position.money1} / {position.money2}</h3>
        <p><span className="blank"></span>층수 | <span className="blank_gray">{position.stair}층</span> 관리비 | <span className="blank_gray">{position.management}만원</span></p>
        <p><span className="blank"></span>평수 | <span className="blank_gray">{position.size}m3</span></p>
        <p><span className="blank"></span>위치 | {position.content}</p>
      </Link>
      <button onClick={toggleFavorite} className="favorite-button">
        {isFavorite ? <><span className="text-normal">찜 취소 </span><span className="heart-red">♥</span></> : <><span className="text-normal">찜하기 </span><span className="heart-red">♡</span></>}
      </button>
    </li>
  );
};

export default PositionItem;
