import React, { useState } from 'react';

function LightSelect() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <form style={{display: 'flex', flexDirection: 'column', height: '10vw', justifyContent: 'space-around', marginLeft: '4vw'}}>
      <label>
        <input
          type="radio"
          value="Option1"
          checked={selectedOption === "Option1"}
          onChange={handleOptionChange}
        />
        좋음
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Option2"
          checked={selectedOption === "Option2"}
          onChange={handleOptionChange}
        />
        건물에 가림
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Option3"
          checked={selectedOption === "Option3"}
          onChange={handleOptionChange}
        />
        해와 역방향
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="Option4"
          checked={selectedOption === "Option4"}
          onChange={handleOptionChange}
        />
        기타
      </label>
      <br />
    </form>
  );
}

export default LightSelect;
