import React, { useState } from 'react';
import './box.css';
import axios from 'axios';
import { ReactComponent as LoginLeft } from '../images/loginLeft.svg';
import Input from './Input';
import { useNavigate } from 'react-router-dom';

function LoginBox() {
    const navigate = useNavigate();
    const handleSignUpClick = () => {
        navigate('/signup'); // 여기서 '/signup'은 LoginPage.js 컴포넌트로 라우팅될 경로입니다.
    };

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    async function LoginPost() {
        const data = {
            email: email,
            pw: pw,
        };
        try {
            console.log(email);
            const response = await axios.post('http://localhost:8000/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Signup success:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
        }
    }

    return (
        <div className='box'>
            <div className='leftBox' style={{backgroundColor: '#3CB38F'}}>
                <LoginLeft />
            </div>
            <div className='rightBox'>
                <p className='title'>Log In</p>
                <div className='emptyBox'/>
                <Input title={"Email Address"} placeholder={'Email Address'} onChange={(e) => setEmail(e.target.value)} />
                <Input title={"Password"} placeholder={'Password'}  onChange={(e) => setPw(e.target.value)}/>
                <button className='button' style={{backgroundColor: '#33BE42', marginTop: '40px'}} onClick={LoginPost}>Log in</button>
                <div className='line'/>
                <button className='bottomButton' onClick={handleSignUpClick}>Sign up</button>
            </div>
        </div>
    );
}

export default LoginBox;