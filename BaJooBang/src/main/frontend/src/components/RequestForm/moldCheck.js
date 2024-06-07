import React, { useState, useEffect } from 'react';
import './moldCheck.css';

function MoldCheck({ complete, savedState, onChange }) {
  const [checkedState, setCheckedState] = useState({
    hasItem: false,
    noItem: false
  });

  useEffect(() => {
    if (complete) {
      setCheckedState(savedState);
    } else {
      setCheckedState({
        hasItem: false,
        noItem: false
      });
    }
  }, [complete, savedState]);

  useEffect(() => {
    if (onChange) {
      onChange(checkedState);
    }
  }, [checkedState, onChange]);

  const handleOnChange = (e) => {
    if (!complete) {
      const { name } = e.target;
      setCheckedState(prevState => ({
        ...prevState,
        [name]: !prevState[name]
      }));
    }
  };

  return (
    <div className="checkbox-container">
      <label style={{display: 'flex', alignItems: 'center'}}>
        <input
          type="checkbox"
          name="hasItem"
          checked={checkedState.hasItem}
          onChange={handleOnChange}
          disabled={complete}
        />
        <p style={{fontSize: '0.9vw'}}>있음</p>
      </label>
      <label style={{display: 'flex', alignItems: 'center'}}>
        <input
          type="checkbox"
          name="noItem"
          checked={checkedState.noItem}
          onChange={handleOnChange}
          disabled={complete}
        />
        <p style={{fontSize: '0.9vw'}}>없음</p>
      </label>
    </div>
  );
}

export default MoldCheck;
