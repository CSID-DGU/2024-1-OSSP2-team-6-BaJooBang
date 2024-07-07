import React, { useState, useRef, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RequestForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    let house_id = null;
    let request_id = null;

    if (id.startsWith('a')) {
        house_id = id.substring(1);
    } else {
        request_id = id;
    }

    //console.log("Location state:", location.state);

    const content = location.state ? location.state.content : '기본값';

    // 매물 상세 정보 페이지에서 넘어갈 때만 입력할 수 있도록 상태 정보 저장
    const isFromInformation = location.state ? location.state.isFromInformation : false;


    
    // const [requests, setRequests] = useState([
    //     {
    //         title: '콘센트 위치 확인하고 사진으로 찍어주세요.',
    //         text: '',
    //         images: []
    //     },
    //     {
    //         title: '방음 상태 확인해주세요.',
    //         text: '잘 됩니다.',
    //         images: []
    //     }
    // ]);
    

    const [inputs, setInputs] = useState([{ plus_q: '' }]);
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');
    const [write, setWrite] = useState(isFromInformation); // Set write based on navigation source
    const [apply, setApply] = useState(false); // 발품인이 신청했는지에 대한 상태
    const [complete, setComplete] = useState(false); // 발품인이 발품서를 작성했는지에 대한 상태
    const [evaluate, setEvaluate] = useState(false); // 요청인이 발품인을 평가했는지에 대한 상태

    const [requests, setRequests] = useState([]);
    //const [contentEditableStates, setContentEditableStates] = useState(requests.map(request => ({ text: request.text })));

    const contentRefs = useRef([]);
    const imageBoxRefs = useRef([]);
    const fileInputs = useRef([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 창 상태
    const [requestMessage, setRequestMessage] = useState(''); // 발품 신청 메시지
    const [propertyInfo, setPropertyInfo] = useState({}); // get info
    const [star, setStar] = useState('');
    


    const handleInputChange = (index, event) => {
        const newInputs = inputs.map((input, i) => i === index ? { plus_q: event.target.value } : input);
        setInputs(newInputs);
    };

    const handleContentChange = (index, event) => {
        if (!complete) {
            const newRequests = [...requests];
            newRequests[index].text = event.target.value; // Use value from textarea
            setRequests(newRequests);
        }
    };

    const handleAddRequest = () => {
        setInputs([...inputs, { plus_q: '' }]);
    };

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newRequests = [...requests];
                if (!newRequests[index].images) {
                    newRequests[index].images = [];
                }
                newRequests[index].images.push({ src: e.target.result, file }); // 파일 객체와 데이터 URL을 함께 저장
                setRequests(newRequests);
                //console.log('파일 추가됨:', { src: e.target.result, file }); // 디버그 로그 추가
            };
            reader.readAsDataURL(file);
        }
    };
    
    
    

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    
    // 수압 데이터
    const [waterState, setWaterState] = useState({
        sink: { selected: null, hotWaterTime1: '', hotWaterTime2: '' },
        basin: { selected: null, hotWaterTime1: '', hotWaterTime2: '' },
        shower: { selected: null, hotWaterTime1: '', hotWaterTime2: '' }
    });
    // 수압 post
    const handleWaterStateChange = (type, state) => {
        setWaterState(prevState => ({
            ...prevState,
            [type]: state
        }));
    };
    
    // 수압 get
    const updateWaterState = (data) => {
        console.log('updateWaterState 함수 호출', data);
        setWaterState({
            sink: { 
                selected: data.powerWater, // 상, 중, 하 중 선택된 값 (1: 상, 2: 중, 3: 하)
                hotWaterTime1: data.timeWater1, // 김이 모락모락 나기까지의 시간
                hotWaterTime2: data.timeWater2
            },
            basin: { 
                selected: data.powerWash, // 상, 중, 하 중 선택된 값 (1: 상, 2: 중, 3: 하)
                hotWaterTime1: data.timeWash1, // 김이 모락모락 나기까지의 시간
                hotWaterTime2: data.timeWash2
            },
            shower: { 
                selected: data.powerShower, // 상, 중, 하 중 선택된 값 (1: 상, 2: 중, 3: 하)
                hotWaterTime1: data.timeShower1, // 김이 모락모락 나기까지의 시간
                hotWaterTime2: data.timeShower2
            }
        });
    };

    // 채광 get
    const [lightState, setLightState] = useState('');
    const handleLightStateChange = (state) => { //post할 때
        setLightState(state);
    };
    const updateLightState = (data) => { 
        console.log('채광 실행', data); // 로그 추가
        setLightState(data);
    }
    useEffect(() => {
        console.log('변경된 채광 : ' + lightState);
    }, [lightState]);
    
    // 곰팡이 데이터
    const [moldStates, setMoldStates] = useState({
        livingRoom: { hasItem: null, noItem: null },
        bathroom: { hasItem: null, noItem: null },
        balcony: { hasItem: null, noItem: null },
        shoeRack: { hasItem: null, noItem: null },
        windowFrame: { hasItem: null, noItem: null },
    });
    //곰팡이 post
    const handleMoldStateChange = (type, state) => {
        //console.log('곰팡이 상태 변경:', type, state);
        setMoldStates(prevState => ({
            ...prevState,
            [type]: state
        }));
    };
    
    // 곰팡이 get 
    const updateMoldState = (data) => {
        setMoldStates({
            livingRoom: { hasItem: data.moldLiving, noItem: !data.moldLiving },
            bathroom: { hasItem: data.moldRest, noItem: !data.moldRest },
            balcony: { hasItem: data.moldVeranda, noItem: !data.moldVeranda },
            shoeRack: { hasItem: data.moldShoes, noItem: !data.moldShoes },
            windowFrame: { hasItem: data.moldWindow, noItem: !data.moldWindow },
        });
    };
    
    

    // useEffect(() => {
    //     const updatedRequests = requests.map((request, index) => ({
    //         ...request,
    //         text: complete ? contentEditableStates[index].text : '',
    //         images: complete && imageBoxRefs.current[index] ? Array.from(imageBoxRefs.current[index].children).map(img => img.src) : []
    //     }));
    //     setRequests(updatedRequests);
    // }, [complete, contentEditableStates, requests]);


    // 발품인이 발품 신청하는 api
    const requestPatch = async (request_id, message) => {
        try {
            const response = await axios.patch(`/request?request_id=${request_id}`, {
                message: message,
            }); // Replace with your actual API endpoint
            toast.success('발품 신청이 완료되었습니다.');
            console.log('Response:', response);
        } catch (error) {
            toast.success('발품 신청을 실패하였습니다. 다시 시도해주세요');
            console.error('Error fetching data:', error);
        }
    };

    // 요청인이 발품 평가하는 api
    const evaluatePatch = async ( star ) => {
        try {
            const response = await axios.patch(`/member/star`, {
                star: star,
            }); // Replace with your actual API endpoint
            toast.success('발품인 평가를 완료되었습니다.');
            console.log('Response:', response);
        } catch (error) {
            toast.success('발품인 평가를 실패하였습니다. 다시 시도해주세요');
            console.error('Error fetching data:', error);
        }
    };

    //요청인이 발품 요청서 등록하는 api
    async function WritePost() {
        console.log("라이트포스트 찍힘")
        const formData = new FormData();

        console.log('WritePost 함수 호출됨');

        console.log("W: " + write);
        // JSON 데이터를 FormData에 추가 (plus_list만 추가)
        formData.append("date", date);
        formData.append("price", price);
        formData.append("address", content);
        formData.append('jsonData', JSON.stringify({ plus_list: inputs }));

        try {
            const response = await axios.post(`/request-form?house_id=${house_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Request success:', response.data);
            toast.success('발품을 성공적으로 등록하였습니다.');
            navigate('/domap');
        } catch (error) {
            console.error('Register failed:', error);
            toast.error('발품 등록을 실패하였습니다.');
        }
    }
    
    // 발품인이 발품서 작성하는 api
    async function CompletePost() {
        const formData = new FormData();
        console.log(moldStates.livingRoom.hasItem)
        console.log(moldStates.bathroom.hasItem)
    
        const jsonData = {
            powerWater: waterState.sink.selected,
            timeWater1: waterState.sink.hotWaterTime1,
            timeWater2: waterState.sink.hotWaterTime2,
            powerWash: waterState.basin.selected,
            timeWash1: waterState.basin.hotWaterTime1,
            timeWash2: waterState.basin.hotWaterTime2,
            powerShower: waterState.shower.selected,
            timeShower1: waterState.shower.hotWaterTime1,
            timeShower2: waterState.shower.hotWaterTime2,
            lighting: lightState,
            moldLiving: moldStates.livingRoom.hasItem,
            moldRest: moldStates.bathroom.hasItem,
            moldVeranda: moldStates.balcony.hasItem,
            moldShoes: moldStates.shoeRack.hasItem,
            moldWindow: moldStates.windowFrame.hasItem,
        };
        console.log('곰팜 : '+ moldStates.livingRoom.hasItem)
    
        formData.append('jsonData', JSON.stringify(jsonData));
        formData.append('request_id', request_id);
    
        const answers = [];
        const fileCounts = [];
        let filesAdded = false;
    
        requests.forEach((request, index) => {
            answers.push(request.text);
            fileCounts.push(request.images.length);
            request.images.forEach(image => {
                if (image.file) {
                    formData.append('files', image.file); // 파일 객체를 FormData에 추가
                    filesAdded = true;
                }
            });
        });
    
        formData.append('plusAnswerData', JSON.stringify({ answers, fileCounts }));
    
        // 파일이 없는 경우 빈 Blob 추가
        if (!filesAdded) {
            formData.append('files', new Blob());
        }
    
        try {
            const response = await axios.patch(`/balpoom-form`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Request success:', response.data);
            toast.success('발품서 작성이 완료되었습니다.');
            navigate('/domap');
        } catch (error) {
            toast.error('발품서 작성을 실패하였습니다.');
            console.error('Request failed:', error);
        }
    }
    
    
    

    useEffect(() => {
        const fetchData = async () => {
            // console.log('useEffect 실행');
            // updateWaterState();
            // console.log('updateWaterState 호출');
            // updateLightState('건물에 가림');
            // console.log('updateLightState 호출');
            // updateMoldState(true);
            // console.log('updateMoldState 호출');

            if (!write) {
                try {
                    // 매물 정보 가져오기
                    const response = await axios.get(`/test-imageget?request_id=${request_id}`);
                    const data = response.data;

                    let startIndex = 0; // 슬라이싱 시작 인덱스 초기화

                    // plusRequestList를 requests 형식에 맞게 변환
                    const updatedRequests = data.balpoomForm.plusRequestList.map((item) => {
                        const fileCount = item.fileCount; // 현재 요청의 파일 개수
                        const endIndex = startIndex + fileCount; // 슬라이싱 종료 인덱스 계산

                        const images = data.fileDtos.slice(startIndex, endIndex).map(file => file.filepath); // 파일 슬라이싱

                        // 다음 요청을 위해 시작 인덱스 업데이트
                        startIndex = endIndex;

                        return {
                            title: item.plus_q,
                            text: item.plus_answer,
                            images: images
                        };
                    });
    
                    setPropertyInfo(data.balpoomForm);
                    setRequests(updatedRequests);
    
                    // status 값에 따라 상태 설정
                    if (data.balpoomForm.status === '매칭 전') {
                        setWrite(false);
                        setApply(false);
                        setComplete(false);
                        setEvaluate(false);
                    } else if (data.balpoomForm.status === '매칭 완료') {
                        setWrite(false);
                        setApply(true);
                        setComplete(false);
                        setEvaluate(false);
                    } else if (data.balpoomForm.status === '작성 완료') {
                        setWrite(false);
                        setApply(true);
                        setComplete(true);
                        setEvaluate(false);
                    } else if (data.balpoomForm.status === '평가 완료') {
                        setWrite(false);
                        setApply(true);
                        setComplete(true);
                        setEvaluate(true);
                    }
    
                    // WaterState 업데이트
                    
                    updateWaterState(data.balpoomForm);
                    updateLightState(data.balpoomForm.lighting);
                    updateMoldState(data.balpoomForm);
                } catch (error) {
                    console.error('Error fetching property info:', error);
                }
            }
        };
    
        fetchData();
    }, [write, request_id]);
    
    
    
    
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5vw', paddingBottom: '5vw', backgroundColor: '#ffffdd' }}>
            <div className='footWorkBG'>
                <div className='pageTitle'>
                    발품 요청서 작성
                </div>
                <p className='title2'>매물 정보</p>
                <div className='requestBox'>
                    {write ? 
                    <>
                        <Roominfo title={'매물 주소'} content={content} />
                        <Roominfo title={'발품 기한'} placeholder={'발품 기한을 입력해주세요. ex) 2020-02-02'} onChange={(e) => setDate(e.target.value)} />
                        <Roominfo title={'발품 가격'} placeholder={'발품 가격을 입력해주세요. ex) 10000 (숫자만 입력)'} onChange={(e) => setPrice(e.target.value)} />
                    </>
                        :
                    <>
                        <Roominfo title={'매물 주소'} content={propertyInfo.address} />
                        <Roominfo title={'발품 기간'} content={propertyInfo.requestDate} />
                        <Roominfo title={'발품 가격'} content={propertyInfo.priceRequest} />
                    </>
                     }
                    
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
                        <WaterBox 
                            Icon={Sink1} 
                            title={'싱크대'} 
                            complete={complete} 
                            savedState={waterState.sink} 
                            onChange={(state) => handleWaterStateChange('sink', state)} 
                        />
                        <WaterBox 
                            Icon={Sink2} 
                            title={'세면대'} 
                            complete={complete} 
                            savedState={waterState.basin} 
                            onChange={(state) => handleWaterStateChange('basin', state)} 
                        />
                        <WaterBox 
                            Icon={Shower} 
                            title={'샤워기'} 
                            complete={complete} 
                            savedState={waterState.shower} 
                            onChange={(state) => handleWaterStateChange('shower', state)} 
                        />
                    </div>
                </div>

                <div className='requestBox'>
                    <div style={{ display: 'flex', marginLeft: '2.2%', alignItems: 'center', marginBottom: '1.5vw' }}>
                        <Sun />
                        <p style={{ color: '#5F5F5F', fontSize: '21px' }}>채광</p>
                    </div>
                    {
                        complete ? 
                        <LightSelect complete={true} savedState={lightState} />
                        :
                        <LightSelect complete={false} savedState={lightState} onChange={handleLightStateChange} />
                    }

                    
                </div>

                <div className='requestBox'>
                    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '2.2%', alignItems: 'center', marginBottom: '1.5vw' }}>
                        <Mold />
                        <p style={{ color: '#5F5F5F', fontSize: '21px' }}>곰팡이</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    {
                        complete ? 
                        <>
                            <MoldBox title={'거실'} complete={true} savedState={moldStates.livingRoom} type="livingRoom" />
                            <MoldBox title={'화장실'} complete={true} savedState={moldStates.bathroom} type="bathroom" />
                            <MoldBox title={'베란다'} complete={true} savedState={moldStates.balcony} type="balcony" />
                            <MoldBox title={'신발장'} complete={true} savedState={moldStates.shoeRack} type="shoeRack" />
                            <MoldBox title={'창틀'} complete={true} savedState={moldStates.windowFrame} type="windowFrame" />
                        </>
                        :
                        <>
                            <MoldBox title={'거실'} complete={false} onChange={handleMoldStateChange} type="livingRoom" />
                            <MoldBox title={'화장실'} complete={false} onChange={handleMoldStateChange} type="bathroom" />
                            <MoldBox title={'베란다'} complete={false} onChange={handleMoldStateChange} type="balcony" />
                            <MoldBox title={'신발장'} complete={false} onChange={handleMoldStateChange} type="shoeRack" />
                            <MoldBox title={'창틀'} complete={false} onChange={handleMoldStateChange} type="windowFrame" />
                        </>
                    }

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
                                    justifyContent: 'center',
                                }}>
                                    <div style={{
                                        display: 'flex', 
                                        flexDirection: 'row', 
                                        alignItems: 'center', 
                                        marginBottom: '3px',
                                        width: '93%',
                                    }}>
                                        <p style={{fontSize: '18px', color: '#5F5F5F', paddingRight: '0.7vw'}}>Q</p>
                                        <input
                                            className='plusInput' 
                                            placeholder='추가 요청사항을 작성해주세요.' 
                                            onChange={e => handleInputChange(index, e)}
                                        />
                                    </div>
                                    <div className='requestLine' style={{width: '51vw', marginTop: '-10px', marginBottom: '4vw'}}/>
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
                                        <div className="plusrequestContentWrapper">
                                            <textarea
                                                className="plusrequestContent"
                                                placeholder="요청 사항을 작성해주세요."
                                                value={input.text}
                                                onChange={e => handleContentChange(index, e)}
                                                disabled={complete} // Disable textarea if complete is true
                                            />
                                        </div>


                                        <div className='plusrequestImageBox' ref={el => imageBoxRefs.current[index] = el}>
                                        {input.images.map((image, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={complete ? image : image.src} // complete가 true일 때 .src를 제거
                                                style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                                                onClick={() => setSelectedImage(complete ? image : image.src)}
                                            />
                                        ))}
                                        </div>
                                        {!complete && (
                                            <>
                                                <button className='plusrequestFile' contentEditable="false" onClick={() => document.getElementById(`fileInput-${index}`).click()}>
                                                    파일 업로드
                                                </button>
                                                <input 
                                                    type="file" 
                                                    id={`fileInput-${index}`} 
                                                    ref={el => fileInputs.current[index] = el}
                                                    style={{ display: 'none' }} 
                                                    onChange={e => handleFileChange(index, e)}
                                                    accept="image/*"
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}

                        </>
                    )}
                </div>

                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    {write ? (
                        <div onClick={ WritePost} style={{ width: '9vw', height: '3.7vw', backgroundColor: '#E9EBEF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ fontSize: '1vw', color: '#5F5F5F', marginLeft: '0.3vw' }}>발품 등록</p>
                        </div>
                    ) : (
                        apply ? (
                            complete ? (
                                evaluate ? (
                                    <></>
                                )
                                :
                                (
                                    <div onClick={openModal} style={{ width: '9vw', height: '3.7vw', backgroundColor: '#E9EBEF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p style={{ fontSize: '1vw', color: '#5F5F5F', marginLeft: '0.3vw' }}>평가하기</p>
                                    </div>
                                )
                            )
                            :
                            <div onClick={CompletePost} style={{ width: '9vw', height: '3.7vw', backgroundColor: '#E9EBEF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Check />
                                <p style={{ fontSize: '1vw', color: '#5F5F5F', marginLeft: '0.3vw' }}>발품 작성</p>
                            </div>
                         ) : (
                        <div onClick={openModal} style={{ width: '9vw', height: '3.7vw', backgroundColor: '#E9EBEF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ fontSize: '1vw', color: '#5F5F5F', marginLeft: '0.3vw' }}>발품 신청</p>
                        </div>
                         )
                    )}
                </div>


                {selectedImage && (
                    <div className='modal' onClick={closeModal}>
                        <span className='close' onClick={closeModal}>&times;</span>
                        <img className='modal-content' src={selectedImage} alt='Selected' />
                    </div>
                )}

                {isModalOpen && (
                    apply ? (
                        <div className='modal' onClick={closeModal}>
                            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                                <span className='close' onClick={closeModal}>&times;</span>
                                <p style={{fontSize: '25px', fontWeight: '500'}}>발품 평가</p>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <input 
                                        type='text' 
                                        placeholder='발품인의 별점 정보를 입력해주세요( 0.0 ~ 5.0 ).' 
                                        className='modal-input'
                                        value={star}
                                        onChange={(e) => setStar(e.target.value)}
                                    />
                                    <button 
                                        onClick={() => { evaluatePatch(star); setEvaluate(true); closeModal(); navigate('/member'); }}
                                        className='modal-button'
                                    >

                                        평가 완료
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='modal' onClick={closeModal}>
                            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                                <span className='close' onClick={closeModal}>&times;</span>
                                <p style={{fontSize: '25px', fontWeight: '500'}}>발품 신청</p>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                                    <input 
                                        type='text' 
                                        placeholder='신청 메시지를 입력하세요.  예) 홍길동 발품 신청합니다!' 
                                        className='modal-input'
                                        value={requestMessage}
                                        onChange={(e) => setRequestMessage(e.target.value)}
                                    />
                                    <button 
                                        onClick={() => { requestPatch(request_id, requestMessage); setApply(true); closeModal(); navigate('/member'); }}
                                        className='modal-button'
                                    >

                                        신청하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )

                )}
            </div>
        </div>
    );
}

export default RequestForm;
