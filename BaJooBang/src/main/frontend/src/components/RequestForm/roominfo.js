import React from 'react';
import './roominfo.css';

function RequestForm({title, placeholder}) {
    return(
        <div className='room-box'>
            <p className='roomtitle'>{title}</p>
            <input type='text' className='textInput' placeholder={placeholder}></input>
            <div className='roomline'/>
        </div>
        
    )
}

export default RequestForm;
