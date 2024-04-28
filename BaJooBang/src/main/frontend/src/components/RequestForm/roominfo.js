import React from 'react';
import './roominfo.css';

function RequestForm({title, placeholder, content}) {
    console.log(content);
    return(
        <div className='room-box'>
            <p className='roomtitle'>{title}</p>
            {placeholder && !content ? (
                <input type='text' className='textInput' placeholder={placeholder} />
            ) : (
                <>
                <p className='textInput'>{content}</p>
                <p>{content}</p>
                </>
            )}
            <div className='roomline'/>
        </div>
        
    )
}

export default RequestForm;
