import React from 'react';
import './box.css';
import { ReactComponent as LoginLeft } from '../images/loginLeft.svg';
import Input from './Input';
import { useNavigate } from 'react-router-dom';

function LoginBox() {
    const navigate = useNavigate();
    const handleSignUpClick = () => {
        navigate('/signup'); // 여기서 '/signup'은 LoginPage.js 컴포넌트로 라우팅될 경로입니다.
    };

    return (
        <div className='box'>
            <div className='leftBox' style={{backgroundColor: '#3CB38F'}}>
                <LoginLeft />
            </div>
            <div className='rightBox'>
                <p className='title'>Log In</p>
                <div className='emptyBox'/>
                <Input title={"Email Address"} placeholder={'Email Address'}/>
                <Input title={"Password"} placeholder={'Password'}/>
                <button className='button' style={{backgroundColor: '#33BE42', marginTop: '40px'}}>Log in</button>
                <div className='line'/>
                <button className='bottomButton' onClick={handleSignUpClick}>Sign up</button>
            </div>
        </div>
    );
}

export default LoginBox;