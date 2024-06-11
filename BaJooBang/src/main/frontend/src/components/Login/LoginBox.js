import React, { useState, useContext } from 'react';
import './box.css';
import axios from 'axios';
import { ReactComponent as LoginLeft } from '../images/loginLeft.svg';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginBox() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
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
            const response = await axios.post('/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                // 로그인 성공 시 세션 값 저장
                login();
                toast.success('로그인에 성공했습니다.');
                navigate('/helpmap'); // 로그인 성공 후 리다이렉트할 경로 설정
            } else {
                console.error('Login failed:', response.data);
                toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
        }
    }

    return (
        <div className='box'>
            <div className='leftBox' style={{ backgroundColor: '#3CB38F' }}>
                <LoginLeft />
            </div>
            <div className='rightBox'>
                <p className='title'>Log In</p>
                <div className='emptyBox' />
                <Input isPrivate={false} title={"Email Address"} placeholder={'Email Address'} onChange={(e) => setEmail(e.target.value)} />
                <Input isPrivate={true} title={"Password"} placeholder={'Password'} onChange={(e) => setPw(e.target.value)} />
                <button className='button' style={{ backgroundColor: '#33BE42', marginTop: '40px' }} onClick={LoginPost}>Log in</button>
                <div className='line' />
                <button className='bottomButton' onClick={handleSignUpClick}>Sign up</button>
            </div>
        </div>
    );
}

export default LoginBox;
