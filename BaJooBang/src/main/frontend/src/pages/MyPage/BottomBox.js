import React from 'react';
import './BottomBox.css'; 

function BottomBox({content, number}) {
    return (
      <div className="MBBox">
        <div className='MBTextBox'>
            <p className='MBText'>{content}</p>
            <p className='MBText'>{number + '건'}</p>
        </div>
      </div>
    );
  }
  
  export default BottomBox;