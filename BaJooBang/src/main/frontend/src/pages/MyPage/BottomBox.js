import React from 'react';
import './BottomBox.css'; 

function BottomBox({content, number, Icon}) {
    return (
      <div className="MBBox">
        <div className='MBTextBox'>
            <p className='MBText'>{content}</p>
            <p className='MBText'>{number + '건'}</p>
        </div>
        <div className='MBImage'>
            {Icon && <Icon />}
        </div>
        
      </div>
    );
  }
  
  export default BottomBox;