import React, { useState } from 'react';
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

const Bell = ({ onNotificationClick }) => {
  const [hasNotification, setHasNotification] = useState(true); // 예시: 알림 상태 초기화
  const [notificationCount, setNotificationCount] = useState(3); // 예시: 알림 개수 초기화

  return (
    <div>
      <NotificationIcon hasNotification={hasNotification} notificationCount={notificationCount} onClickNotification={() => onNotificationClick(hasNotification)} />
    </div>
  );
};

export default Bell;
