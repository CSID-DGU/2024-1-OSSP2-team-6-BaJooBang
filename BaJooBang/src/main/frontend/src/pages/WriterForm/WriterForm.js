import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WriterForm.css'
import Roominfo from './../../components/RequestForm/roominfo';
import CheckText from '../../components/RequestForm/checkText';
import WaterBox from '../../components/RequestForm/waterBox';
import MoldBox from '../../components/RequestForm/moldBox';
import LightSelect from '../../components/RequestForm/lightSelect';
import { ReactComponent as Water } from '../../components/images/water.svg';
import { ReactComponent as Sun } from '../../components/images/sun.svg';
import { ReactComponent as Mold } from '../../components/images/mold.svg';
import { ReactComponent as Sink1 } from '../../components/images/sink1.svg';
import { ReactComponent as Sink2 } from '../../components/images/sink2.svg';
import { ReactComponent as Shower } from '../../components/images/shower.svg';
import { ReactComponent as Plus1 } from '../../components/images/plus1.svg';
import { ReactComponent as Check } from '../../components/images/check(heavy).svg';

    function WriterForm() {
        const navigate = useNavigate();
        // const [additionalRequests, setAdditionalRequests] = useState([]);
        const location = useLocation();
        console.log(location.state);  // 전체 state 로깅
        const { house_id } = useParams();

        const content = location.state ? location.state.content : '기본값';
        console.log(content);  // content 값 로깅

        const handleAddRequest = () => {
            // 추가 요청사항 폼을 배열에 추가
            // setAdditionalRequests(prevRequests => [...prevRequests, {}]);
            setInputs([...inputs, { plus_q: '' }]);
        };

        const [inputs, setInputs] = useState([{ plus_q: '' }]);  // 입력을 담당할 상태
        const [price, setPrice] = useState('');
        const [date, setDate] = useState('');

        const handleInputChange = (index, event) => {
            const newInputs = inputs.map((input, i) => i === index ? { plus_q: event.target.value } : input);
            setInputs(newInputs);
        };

        // const handleAddRequest = () => {
        //     setInputs([...inputs, { plus_q: '' }]);
        // };

        async function RequestPost() {
            const data = {
                price_request: price,
                request_date: date,
                plus_list: inputs
            };
            try {
                console.log(price);
                console.log(date);
                console.log(inputs);
                const response = await axios.post(`http://localhost:8000/request-form?house_id=${house_id}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('Request success:', response.data);
                navigate('/domap');
            } catch (error) {
                console.error('Request failed:', error);
            }
        }

        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5vw', paddingBottom: '5vw', backgroundColor: '#ffffdd'}}>
                <div className='footWorkBG'>
                    <div className='pageTitle'>
                        발품 요청서 작성
                    </div>
                    <p className='title2'>매물 정보</p>
                    <div className='requestBox'>
                        <Roominfo title={'매물 주소'} content={content}/>
                        <Roominfo title={'발품 기간'} placeholder={'발품 기간을 입력해주세요.'} onChange={(e) => setDate(e.target.value)}/>
                        <Roominfo title={'발품 가격'} placeholder={'발품 가격을 입력해주세요.'} onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    

                    <div className='title2' style={{marginTop: '5vw', marginBottom: '1.5vw'}}>
                        기본 요청 사항
                    </div>
                    

                    <div className='requestBox'>
                        <div style={{display: 'flex', marginLeft: '2.2%', alignItems: 'center', marginBottom: '1.5vw'}}>
                            <div style={{display: 'flex'}}>
                                <Water/>
                            </div>
                            
                            <p style={{display: 'flex',color: '#5F5F5F', fontSize: '21px'}}>수압 & 온수</p>
                        </div>
                        <CheckText title={'수압 체크'} content1={'가이드 사진을 토대로 비교하여 상 중 하 선택'}/>
                        <CheckText 
                        title={'온수 체크(온수 조절기를 가장 뜨거운 쪽으로 둔 상태에서 수행)'} 
                        content1={'1. 자신의 체온보다 높은 온수가 나오기까지의 시간'}
                        content2={'2. 김이 모락모락 나기까지의 시간'}
                        />
                        <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <WaterBox Icon={Sink1} title={'싱크대'}/>
                            <WaterBox Icon={Sink2} title={'세면대'}/>
                            <WaterBox Icon={Shower} title={'샤워기'}/>
                        </div>
                    </div>
                        

                    

                    <div className='requestBox'>

                        <div style={{display: 'flex', marginLeft: '2.2%', alignItems: 'center', marginBottom: '1.5vw'}}>
                            <Sun/>
                            <p style={{color: '#5F5F5F', fontSize: '21px'}}>채광</p>
                        </div>
                        <LightSelect/>
                    </div>
                    
                    
                    <div className='requestBox'>
                        <div style={{display: 'flex', flexDirection: 'row', marginLeft: '2.2%', alignItems: 'center', marginBottom: '1.5vw'}}>
                            <Mold/>
                            <p style={{color: '#5F5F5F', fontSize: '21px'}}>곰팡이</p>
                        
                        </div>
                        <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <MoldBox title={'거실'}/>
                            <MoldBox title={'화장실'}/>
                            <MoldBox title={'베란다'}/>
                            <MoldBox title={'신발장'}/>
                            <MoldBox title={'창틀'}/>
                        </div>
                    </div>
                        
                    

                    <div className='title2' style={{marginBottom: '1.5vw'}}>추가 요청 사항</div>

                    <div className='requestBox'>
                        <div className='plusrequestBox'>
                            
                        </div>
                        
                    </div>

                    <div style={{width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <div onClick={RequestPost} style={{width: '9vw', height: '3.7vw', backgroundColor: '#E9EBEF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <Check />
                            <p style={{fontSize: '1vw', color: '#5F5F5F', marginLeft: '0.3vw'}}>작성완료</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default WriterForm;