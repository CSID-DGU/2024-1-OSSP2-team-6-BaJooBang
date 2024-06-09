import React, { useState } from 'react';
import './box.css';
import axios from 'axios';
import { ReactComponent as LoginLeft } from '../images/loginLeft.svg';
import Input from './Input';
import { useNavigate } from 'react-router-dom';

function SignUpBox() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [address, setAddress] = useState('');

    const handleLoginClick = () => {
        navigate('/login');
    };

    async function SignUpPost() {
        const data = {
            name: name,
            email: email,
            pw: pw,
            address: address,
        };
        try {
            console.log(name);
            const response = await axios.post('/signup', data, {
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
            <div className='leftBox' style={{ backgroundColor: '#61AF77' }}>
                <LoginLeft />
            </div>
            <div className='rightBox'>
                <p className='title'>Sign Up</p>
                <Input isPrivate={false} title={"Name"} placeholder={'Name'} onChange={(e) => setName(e.target.value)} />
                <Input isPrivate={false} title={"Email Address"} placeholder={'Email Address'} onChange={(e) => setEmail(e.target.value)} />
                <Input isPrivate={true} title={"Password"} placeholder={'Password'} onChange={(e) => setPw(e.target.value)} />
                <Input isPrivate={false} title={"Location Address"} placeholder={'Location Address'} onChange={(e) => setAddress(e.target.value)} />
                <button className='button' style={{ backgroundColor: '#377D3E' }} onClick={SignUpPost}>Sign up</button>
                <div className='line' />
                <button className='bottomButton' onClick={handleLoginClick}>Log in</button>
            </div>
        </div>
    );
}

export default SignUpBox;
