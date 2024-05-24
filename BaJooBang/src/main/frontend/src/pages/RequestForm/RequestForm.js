import React, { useState, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RequestForm.css';
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

function RequestForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { house_id } = useParams();

    const content = location.state ? location.state.content : '기본값';

    const [requests, setRequests] = useState([
        { title: '콘센트 위치 확인하고 사진으로 찍어주세요.' },
        { title: '방음 상태 확인해주세요.' },
        { title: '창문 잠금장치 상태 확인해주세요.' }
    ]);

    const [inputs, setInputs] = useState([{ plus_q: '' }]);
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [write, setWrite] = useState(false);
    const [contentEditableStates, setContentEditableStates] = useState(requests.map(request => ({ text: '' })));
    const contentRefs = useRef([]);
    const imageBoxRefs = useRef([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleInputChange = (index, event) => {
        const newInputs = inputs.map((input, i) => i === index ? { plus_q: event.target.value } : input);
        setInputs(newInputs);
    };

    const handleContentEditableChange = (index, event) => {
        const newContentEditableStates = contentEditableStates.map((state, i) => i === index ? { text: event.target.textContent } : state);
        setContentEditableStates(newContentEditableStates);
    };

    const handleAddRequest = () => {
        setInputs([...inputs, { plus_q: '' }]);
    };

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

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '50px'; // 이미지 정사각형 크기 조절
                img.style.height = '50px';
                img.style.cursor = 'pointer';
                img.onclick = () => setSelectedImage(img.src); // 이미지 클릭 시 모달 열기
                if (imageBoxRefs.current[index]) {
                    imageBoxRefs.current[index].appendChild(img);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5vw', paddingBottom: '5vw', backgroundColor: '#ffffdd' }}>
            <div className='footWorkBG'>
                <div className='pageTitle'>
                    발품 요청서 작성
                </div>
                <p className='title2'>매물 정보</p>
                <div className='requestBox'>
                    <Roominfo title={'매물 주소'} content={content} />
                    <Roominfo title={'발품 기간'} placeholder={'발품 기간을 입력해주세요.'} onChange={(e) => setDate(e.target.value)} />
                    <Roominfo title={'발품 가격'} placeholder={'발품 가격을 입력해주세요.'} onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div className='title2' style={{ marginTop: '5vw', marginBottom: '1.5vw' }}>
                    기본 요청 사항
                </div>

                <div className='requestBox'>
                    <div style={{ display: 'flex', marginLeft: '2.2%', alignItems: 'center', marginBottom: '1.5vw' }}>
                        <div style={{ display: 'flex' }}>
                            <Water />
                        </div>
                        <p style={{ display: 'flex', color: '#5F5F5F', fontSize: '21px' }}>수압 & 온수</p>
                    </div>
                    <CheckText title={'수압 체크'} content1={'가이드 사진을 토대로 비교하여 상 중 하 선택'} />
                    <CheckText
                        title={'온수 체크(온수 조절기를 가장 뜨거운 쪽으로 둔 상태에서 수행)'}
                        content1={'1. 자신의 체온보다 높은 온수가 나오기까지의 시간'}
                        content2={'2. 김이 모락모락 나기까지의 시간'}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <WaterBox Icon={Sink1} title={'싱크대'} />
                        <WaterBox Icon={Sink2} title={'세면대'} />
                        <WaterBox Icon={Shower} title={'샤워기'} />
                    </div>
                </div>

                <div className='requestBox'>
                    <div style={{ display: 'flex', marginLeft: '2.2%', alignItems: 'center', marginBottom: '1.5vw' }}>
                        <Sun />
                        <p style={{ color: '#5F5F5F', fontSize: '21px' }}>채광</p>
                    </div>
                    <LightSelect />
                </div>

                <div className='requestBox'>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '2.2%', alignItems: 'center', marginBottom: '1.5vw' }}>
                        <Mold />
                        <p style={{ color: '#5F5F5F', fontSize: '21px' }}>곰팡이</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <MoldBox title={'거실'} />
                        <MoldBox title={'화장실'} />
                        <MoldBox title={'베란다'} />
                        <MoldBox title={'신발장'} />
                        <MoldBox title={'창틀'} />
                    </div>
                </div>

                <div className='title2' style={{ marginBottom: '1.5vw' }}>추가 요청 사항</div>

                <div className='requestBox' style={{ paddingTop: '3vw' }}>
                    {write ? (
                        <>
                            {inputs.map((request, index) => (
                                <div key={index} style={{
                                    width: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    alignItems: 'center', 
                                    justifyContent: 'center'
                                }}>
                                    <div style={{
                                        display: 'flex', 
                                        flexDirection: 'row', 
                                        alignItems: 'center', 
                                        marginBottom: '3px',
                                        width: '93%',
                                    }}>
                                        <p style={{fontSize: '18px', color: '#5F5F5F', paddingRight: '0.7vw'}}>Q</p>
                                        <textarea 
                                            className='plusrequestContent' 
                                            placeholder='추가 요청사항을 작성해주세요.' 
                                            onChange={e => handleInputChange(index, e)}
                                        />
                                    </div>
                                    <div className='requestLine' style={{width: '51vw', marginBottom: '1vw'}}/>
                                </div>
                            ))}
                            <div style={{width: '100%', height: '8vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <div className='plusCircle' onClick={handleAddRequest}>
                                    <Plus1/>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {requests.map((input, index) => (
                                <div className='plusrequestBox' key={index}>
                                    <div>
                                        <div className='plusrequestTitle'>
                                            요청 사항
                                            <div style={{ width: '1.5px', height: '1.5vw', backgroundColor: '#5F5F5F', borderRadius: '1px', marginLeft: '1vw', marginRight: '1vw' }} />
                                            Q. {input.title}
                                        </div>
                                        <div
                                            className="plusrequestContent"
                                            contentEditable="true"
                                            placeholder="요청 사항을 작성해주세요."
                                            onInput={e => handleContentEditableChange(index, e)}
                                            ref={el => contentRefs.current[index] = el}
                                        >
                                            {/* {contentEditableStates[index].text} */}
                                        </div>
                                        <div className='plusrequestImageBox' ref={el => imageBoxRefs.current[index] = el}></div>
                                        <button className='plusrequestFile' contentEditable="false" onClick={() => document.getElementById(`fileInput-${index}`).click()}>
                                            파일 업로드
                                        </button>
                                        <input 
                                            type="file" 
                                            id={`fileInput-${index}`} 
                                            style={{ display: 'none' }} 
                                            onChange={e => handleFileChange(index, e)}
                                            accept="image/*"
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <div onClick={RequestPost} style={{ width: '9vw', height: '3.7vw', backgroundColor: '#E9EBEF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check />
                        <p style={{ fontSize: '1vw', color: '#5F5F5F', marginLeft: '0.3vw' }}>작성완료</p>
                    </div>
                </div>

                {selectedImage && (
                    <div className='modal' onClick={closeModal}>
                        <span className='close' onClick={closeModal}>&times;</span>
                        <img className='modal-content' src={selectedImage} alt='Selected' />
                    </div>
                )}
            </div>
        </div>
    );
}

export default RequestForm;
