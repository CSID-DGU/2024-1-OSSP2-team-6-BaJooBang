import React, { useState } from 'react';
import './domap.css';
import DopageMap from './showmap';
import { ReactComponent as Closer } from '../components/images/closer.svg';
import { dopositions } from './showmap';
import Bell from '../HelpPage/bell';

const SearchBar = ({ onSearchChange }) => {
  return (
    <div className="search">
      <div className="label-container">
        <label htmlFor="searchfor">매물 검색<span className='blank'></span>|</label><span className='blank'></span>
      </div>
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
  
  const handleNotificationClick = (showOnlyNotified) => {
    setShowOnlyNotified(showOnlyNotified);
  };

  return (
    <div className='screen'>
      <div className="top-controls">  
        <SearchBar onSearchChange={handleSearchChange} />
        <Bell 
          dopositions={dopositions} 
          onNotificationClick={handleNotificationClick} 
          showOnlyNotified={showOnlyNotified}
          setShowOnlyNotified={setShowOnlyNotified}
        />
      </div>
      <DopageMap search={search} showOnlyNotified={showOnlyNotified}/>
    </div>
  );
};

export default Dopage;
