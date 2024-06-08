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
      setCheckedState(prevState => {
        const newState = {
          ...prevState,
          [name]: !prevState[name]
        };

        // Ensure only one checkbox is selected at a time
        if (name === 'hasItem' && newState[name]) {
          newState.noItem = false;
        }
        if (name === 'noItem' && newState[name]) {
          newState.hasItem = false;
        }

        return newState;
      });
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

export default MoldCheck;
