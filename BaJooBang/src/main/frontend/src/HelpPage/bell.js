import React, { useState } from 'react';
import './bell.css';
import { ReactComponent as BellinActive } from '../components/images/bell.svg';
import { ReactComponent as BellActive } from '../components/images/bellactive.svg';

const NotificationIcon = ({ hasNotification, notificationCount }) => {
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
        <span className="notification-tooltip">{hasNotification ? `요청 받은 알림 ${notificationCount}개 도착` : `요청 받은 알림이 없어요`}</span>
      )}
    </div>
  );
};

const Bell = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // 알림 상태 업데이트 로직
  const checkNotifications = () => {
    // API 호출을 통해 알림 확인
    setHasNotification(true); // 예시로 true 설정
    setNotificationCount(3); // 예시로 알림 3개 설정
  };

  return (
    <div>
      <button onClick={checkNotifications}>알림 확인</button>
      <NotificationIcon hasNotification={hasNotification} notificationCount={notificationCount} />
    </div>
  );
};

export default Bell;
