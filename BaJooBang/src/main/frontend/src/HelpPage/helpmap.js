import React, { useState } from 'react';
import './helpmap.css';
import MypageMap from './kakaomap';
import { ReactComponent as Closer } from '../components/images/closer.svg';

// 매물지도의 검색라인
const SearchBar = ({ onFilterChange, onSearchChange, currentFilter }) => {
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
    </div>
  );
};

const Helppage = () => {
  const [filter, setFilter] = useState('전체');
  const [search, setSearch] = useState('');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
  };

  return (
    <div>
      <SearchBar 
        onFilterChange={handleFilterChange} 
        onSearchChange={handleSearchChange} 
        currentFilter={filter}
      />
      <MypageMap filter={filter} search={search} />
    </div>
  );
};

export default Helppage;