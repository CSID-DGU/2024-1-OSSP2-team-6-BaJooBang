import React from 'react';
import './Input.css';

function Input({ isPrivate, title, placeholder, onChange }) {
    return (
        <div className='inputBox'>
            <p className='inputTitle'>{title}</p>
            { isPrivate ? 
            <input 
            type="password" 
            className='input' 
            placeholder={placeholder} 
            onChange={onChange}  // onChange 이벤트를 외부에서 제공받은 함수로 연결
            />
            :
            <input 
                    type="text" 
                    className='input' 
                    placeholder={placeholder} 
                    onChange={onChange}  // onChange 이벤트를 외부에서 제공받은 함수로 연결
                />
            }
        </div>
    );
}

export default Input;
