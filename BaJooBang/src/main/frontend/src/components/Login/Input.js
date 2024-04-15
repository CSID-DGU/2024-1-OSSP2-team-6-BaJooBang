import React from 'react';
import './Input.css';

function Input({title, placeholder}) {
    return (
        <div className='inputBox'>
            <p className='inputTitle'>{title}</p>
            <input type="text" className='input' placeholder={placeholder}></input>
        </div>
    );
}

export default Input;