import React, { useEffect, useState } from 'react';
import './bell.css';
import { ReactComponent as BellinActive } from '../components/images/bell.svg';
import { ReactComponent as BellActive } from '../components/images/bellactive.svg';

const NotificationIcon = ({ hasNotification, notificationCount, onClickNotification }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div className="notification-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={hover ? "icon-wrapper slide-left" : "icon-wrapper"}>
        {hasNotification ? <BellActive /> : <BellinActive />}
      </div>
      {hover && (
        <span className="notification-tooltip" onClick={onClickNotification}>
          {hasNotification ? `받은 요청 : ${notificationCount}개` : `받은 요청 : 0개`}
        </span>
      )}
    </div>
  );
};

const Bell = ({ onNotificationClick, dopositions }) => {
  // dopositions 배열에서 hasNotification이 true인 요소의 개수를 계산합니다.
  const notificationCount = dopositions.filter(doposition => doposition.hasNotification).length;
  const hasNotification = notificationCount > 0; // 0개 이상이면 true, 아니면 false
  const handleNotificationClick = () => {
    onNotificationClick(!hasNotification); // 현재 상태의 반대로 설정
  };
  return (
    <div>
      <NotificationIcon 
        hasNotification={hasNotification} 
        notificationCount={notificationCount} 
        onClickNotification={() => onNotificationClick(hasNotification)}
      />
    </div>
  );
};

export default Bell;
