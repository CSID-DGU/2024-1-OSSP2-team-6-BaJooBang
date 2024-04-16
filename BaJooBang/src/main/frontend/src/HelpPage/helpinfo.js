import React from 'react';
import { useParams } from 'react-router-dom';

const Imformation = ({ positions }) => {
  const { id } = useParams();

  // 파라미터로 전달된 id 값이 숫자인지 확인하고, positions 배열에서 해당하는 위치 정보를 가져옵니다.
  const position = positions.find(pos => pos.id === parseInt(id));

  // position이 존재하지 않는 경우에 대한 오류 처리
  if (!position) {
    return <div>해당하는 위치 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <h4>{position.money1}</h4>
          <p>{position.size}</p>
        </div>
      </div>
    </div>
  );
}

export default Imformation;
