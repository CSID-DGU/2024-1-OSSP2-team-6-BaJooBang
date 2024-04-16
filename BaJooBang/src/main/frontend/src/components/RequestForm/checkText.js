import React from 'react';
import {ReactComponent as CheckLight } from '../images/check(light).svg';

function CheckText({title, content1, content2}) {
    return (
      <>
        <div style={{display: 'flex', marginLeft: '5.2%', alignItems: 'center', height: '15px'}}>
            <CheckLight/>
            <p style={{color: '#5F5F5F', fontSize: '18px'}}>{title}</p>
        </div>
        <p style={{color: '#5F5F5F', fontSize: '14px', marginLeft: '11%'}}>{content1}</p>
        <p style={{color: '#5F5F5F', fontSize: '14px', marginLeft: '11%', paddingBottom: '2%'}}>{content2}</p>
      </>
    );
}

export default CheckText;