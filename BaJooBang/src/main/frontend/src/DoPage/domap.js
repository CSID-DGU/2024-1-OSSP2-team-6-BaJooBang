import React, { useState } from 'react';
import './domap.css';
import DopageMap from './showmap';
import { ReactComponent as Closer } from '../components/images/closer.svg';
import { dopositions } from './showmap';
import Bell from '../HelpPage/bell';

// 매물지도의 검색라인
const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="search">
      <label htmlFor="searchfor">매물 검색<span className='blank'></span>|</label><span className='blank'></span>
      <div className='searchbox'>
        <Closer />
        <input 
          type="text" 
          placeholder="매물을 검색하세요" 
          onChange={e => onSearchChange(e.target.value)} 
        />
      </div>
    </div>
  );
};

const Dopage = () => {
  const [search, setSearch] = useState('');
  const [showOnlyNotified, setShowOnlyNotified] = useState(false);

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };
  const handleNotificationClick = (isActive) => {
    setShowOnlyNotified(isActive);
  };

  return (
    <div className='screen'>
      <div className="top-controls">  
        <SearchBar onSearchChange={handleSearchChange} />
        <Bell dopositions={dopositions} onNotificationClick={handleNotificationClick} />
      </div>
      <DopageMap search={search} showOnlyNotified={showOnlyNotified}/>
    </div>
  );
};

export default Dopage;
