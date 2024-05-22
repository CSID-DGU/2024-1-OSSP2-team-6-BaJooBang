import React, { useState } from 'react';
import './helpmap.css';
import MypageMap from './kakaomap';
import { ReactComponent as Closer } from '../components/images/closer.svg';
import { ReactComponent as Bell } from '../components/images/bell.svg';
import { ReactComponent as BellActive } from '../components/images/bellactive.svg';

// 매물지도의 검색라인
const SearchBar = ({ onFilterChange, onSearchChange, currentFilter, hasNotification }) => {
  return (
    <div className="search">
      <label htmlFor="searchfor">매물 검색<span className='blank'></span>|</label><span className='blank'></span>
      <div className='searchbox'>
        <Closer />
        <input 
          type="text" 
          placeholder="매물을 검색하세요" 
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="house_type_buttons">
        <span className='blank'></span>월세/전세<span className='blank'></span>|<span className='blank'></span>
        <button 
          className={currentFilter === '월세' ? 'active' : ''} 
          onClick={() => onFilterChange('월세')}
        >
          월세
        </button>
        <button 
          className={currentFilter === '전세' ? 'active' : ''} 
          onClick={() => onFilterChange('전세')}
        >
          전세
        </button>
        <button 
          className={currentFilter === '전체' ? 'active' : ''} 
          onClick={() => onFilterChange('전체')}
        >
          전체
        </button>
      </div>
      <div className="right_elements">
        {hasNotification ? <BellActive /> : <Bell />}
      </div>
    </div>
  );
};


const Helppage = () => {
  const [filter, setFilter] = useState('전체');
  const [search, setSearch] = useState('');
  const [hasNotification, setHasNotification] = useState(false); // 알림 상태를 추적하기 위한 상태

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };


  // 실제 알림 확인 로직으로 교체 필요
  const checkForNotifications = () => {
    // 알림이 있는지 확인하는 로직
    setHasNotification(true); // 알림이 있으면 true로 설정
  };

  return (
    <div>
      <SearchBar 
        onFilterChange={handleFilterChange} 
        onSearchChange={handleSearchChange} 
        currentFilter={filter}
        hasNotification={hasNotification}
      />
      <MypageMap filter={filter} search={search} />
    </div>
  );
};

export default Helppage;
