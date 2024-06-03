import React, { useState, useEffect } from 'react';
import './BottomBox.css'; 

function BottomBox({ content, number, Icon, score }) {
  const [star, setStar] = useState(false);

  useEffect(() => {
    if (score) {
      setStar(true);
    }
  }, [score]);

  return (
    <div className="MBBox">
      <div className='MBTextBox'>
        <p className='MBText'>{content}</p>
        {
          star ? <p className='MBText'>{number}</p> : <p className='MBText'>{number + '건'}</p>
        }
      </div>
      <div className='MBImage'>
        {Icon && <Icon />}
      </div>
    </div>
  );
}

export default BottomBox;
