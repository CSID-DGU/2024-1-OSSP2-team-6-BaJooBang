import React, { useState } from 'react';
import './moldCheck.css';

function Checkboxes() {
  const [checkedState, setCheckedState] = useState({
    hasItem: false,
    noItem: false
  });

  const handleOnChange = (e) => {
    const { name } = e.target;
    setCheckedState({
      hasItem: false,
      noItem: false,
      [name]: !checkedState[name]
    });
  };

  return (
    <div className="checkbox-container">
      <label style={{display: 'flex', alignItems: 'center'}}>
        <input
          type="checkbox"
          name="hasItem"
          checked={checkedState.hasItem}
          onChange={handleOnChange}
        />
        <p style={{fontSize: '0.9vw'}}>있음</p>
        
      </label>
      <label style={{display: 'flex', alignItems: 'center'}}>
        <input
          type="checkbox"
          name="noItem"
          checked={checkedState.noItem}
          onChange={handleOnChange}
        />
        <p style={{fontSize: '0.9vw'}}>없음</p>
      </label>
    </div>
  );
}

export default Checkboxes;
