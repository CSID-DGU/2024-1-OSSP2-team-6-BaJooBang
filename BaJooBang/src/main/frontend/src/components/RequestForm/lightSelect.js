import React, { useState, useEffect, useRef } from 'react';

function LightSelect({ complete, savedState, onChange }) {
  const [selectedOption, setSelectedOption] = useState(savedState);
  const prevSavedStateRef = useRef();

  useEffect(() => {
    if (prevSavedStateRef.current !== savedState && complete) {
      console.log('채광', savedState);
      setSelectedOption(savedState);
      prevSavedStateRef.current = savedState;
    }
  }, [savedState, complete]);

  useEffect(() => {
    if (!complete && onChange) {
      onChange(selectedOption);
    }
  }, [selectedOption, complete, onChange]);

  const handleOptionChange = (e) => {
    if (!complete) {
      setSelectedOption(e.target.value);
    }
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', height: '10vw', justifyContent: 'space-around', marginLeft: '4vw' }}>
      <label>
        <input
          type="radio"
          value="좋음"
          checked={selectedOption === "좋음"}
          onChange={handleOptionChange}
          disabled={complete}
        />
        좋음
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="건물에 가림"
          checked={selectedOption === "건물에 가림"}
          onChange={handleOptionChange}
          disabled={complete}
        />
        건물에 가림
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="해와 역방향"
          checked={selectedOption === "해와 역방향"}
          onChange={handleOptionChange}
          disabled={complete}
        />
        해와 역방향
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="기타"
          checked={selectedOption === "기타"}
          onChange={handleOptionChange}
          disabled={complete}
        />
        기타
      </label>
      <br />
    </form>
  );
}

export default LightSelect;
