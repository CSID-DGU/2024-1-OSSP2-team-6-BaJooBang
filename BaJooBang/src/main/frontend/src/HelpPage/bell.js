import React, { useState } from 'react';
import './bell.css';
import { ReactComponent as BellinActive } from '../components/images/bell.svg';
import { ReactComponent as BellActive } from '../components/images/bellactive.svg';

const NotificationIcon = ({ hasNotification, notificationCount, onClickNotification }) => {
  const [showNotificationCount, setShowNotificationCount] = useState(false);

  const toggleNotificationCount = () => {
    setShowNotificationCount(prevState => !prevState);
    onClickNotification(); // Trigger the parent handler
  };

  return (
    <div className="notification-container">
      <div className={`icon-wrapper ${showNotificationCount ? 'slide-left' : ''}`} onClick={toggleNotificationCount}>
        {hasNotification ? <BellActive /> : <BellinActive />}
      </div>
      {showNotificationCount && (
        <span className="notification-tooltip">
          {hasNotification ? `받은 요청 : ${notificationCount}개` : `받은 요청 : 0개`}
        </span>
      )}
    </div>
  );
};
const Bell = ({ onNotificationClick, dopositions, showOnlyNotified, setShowOnlyNotified }) => {
  const notificationCount = dopositions.filter(doposition => doposition.hasNotification).length;
  const hasNotification = notificationCount > 0;

  const handleBellClick = () => {
    const newShowOnlyNotified = !showOnlyNotified;
    setShowOnlyNotified(newShowOnlyNotified);
    onNotificationClick(newShowOnlyNotified);
  };
  
  return (
    <div>
      <NotificationIcon 
        hasNotification={hasNotification} 
        notificationCount={notificationCount} 
        onClickNotification={handleBellClick}
      />
    </div>
  );
};

export default Bell;
