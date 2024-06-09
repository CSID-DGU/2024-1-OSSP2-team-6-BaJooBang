import React, { useState, useEffect, useCallback } from 'react';
import './moldCheck.css';

function MoldCheck({ complete, savedState, onChange }) {
  const [checkedState, setCheckedState] = useState({
    hasItem: savedState?.hasItem || false,
    noItem: savedState?.noItem || false
  });

  useEffect(() => {
    if (complete && savedState) {
      setCheckedState(savedState);
      console.log('곰팡이 상태 : ', savedState);
    }
  }, [savedState, complete]);

  useEffect(() => {
    if (!complete && onChange) {
      onChange(checkedState);
      console.log('check: '+checkedState.hasItem)
    }
  }, [checkedState, complete, onChange]);

  const handleOnChange = useCallback((e) => {
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
  }, [complete]);

  return (
    <div className="checkbox-container">
<<<<<<< HEAD
      {complete ?
        <>
          <label style={{display: 'flex', alignItems: 'center'}}>
          <input
            type="checkbox"
            name="hasItem"
            checked={checkedState.hasItem}
            disabled={complete}
          />
          <p style={{fontSize: '0.9vw'}}>있음</p>
        </label>
        <label style={{display: 'flex', alignItems: 'center'}}>
          <input
            type="checkbox"
            name="noItem"
            checked={checkedState.noItem}
            disabled={complete}
          />
          <p style={{fontSize: '0.9vw'}}>없음</p>
        </label>
        </>
          :
          <>
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
          </>
        }
      
=======
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
>>>>>>> 1cd96d7 (요청 수정)
    </div>
  );
}

export default MoldCheck;
