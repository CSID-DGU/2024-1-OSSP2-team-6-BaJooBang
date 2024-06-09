import React, { useState, useEffect, useRef, useCallback } from 'react';
import './moldCheck.css';

function MoldCheck({ complete, savedState, onChange }) {
  const [checkedState, setCheckedState] = useState(savedState);

  const prevSavedStateRef = useRef(savedState);

  useEffect(() => {
    if (prevSavedStateRef.current !== savedState) {
      setCheckedState(savedState);
      prevSavedStateRef.current = savedState;
    }
  }, [savedState]);

  const handleOnChange = useCallback((e) => {
    if (!complete) {
      const { name, checked } = e.target;
      setCheckedState(prevState => ({
        ...prevState,
        [name]: checked
      }));
      if (onChange) {
        onChange({ ...checkedState, [name]: checked });
      }
    }
  }, [complete, checkedState, onChange]);

  return (
    <div className="checkbox-container">
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          name="hasItem"
          checked={checkedState.hasItem}
          onChange={handleOnChange}
          disabled={complete}
        />
        <p style={{ fontSize: '0.9vw' }}>있음</p>
      </label>
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          name="noItem"
          checked={checkedState.noItem}
          onChange={handleOnChange}
          disabled={complete}
        />
        <p style={{ fontSize: '0.9vw' }}>없음</p>
      </label>
    </div>
  );
}

export default MoldCheck;
