import React from 'react';
import './roominfo.css';

function RequestForm({title, placeholder, content, onChange}) {
    console.log(content);
    return(
        <div className='room-box'>
            <p className='roomtitle'>{title}</p>
            {placeholder && !content ? (
                <input type='text' className='textInput' placeholder={placeholder} onChange={onChange}/>
            ) : (
                <>
                <p className='textInput'>{content}</p>
                
                </>
            )}
            <div className='roomline'/>
        </div>
        
    )
}

export default RequestForm;
