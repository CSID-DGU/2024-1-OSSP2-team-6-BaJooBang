import React from 'react';
import './RequestForm.css'
import Roominfo from './../../components/RequestForm/roominfo';
import CheckText from '../../components/RequestForm/checkText';
import WaterBox from '../../components/RequestForm/waterBox';
import MoldBox from '../../components/RequestForm/moldBox';
import { ReactComponent as Water } from '../../components/images/water.svg';
import { ReactComponent as Sun } from '../../components/images/sun.svg';
import { ReactComponent as Mold } from '../../components/images/mold.svg';
import { ReactComponent as Sink1 } from '../../components/images/sink1.svg';
import { ReactComponent as Sink2 } from '../../components/images/sink2.svg';
import { ReactComponent as Shower } from '../../components/images/shower.svg';

function RequestForm() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className='footWorkBG'>
                <div className='pageTitle'>
                    발품 요청서 작성
                </div>
                <p className='title2'>매물 정보</p>
                <Roominfo title={'매물 주소'} placeholder={'매물 주소를 입력해주세요.'}/>
                <Roominfo title={'발품 기간'} placeholder={'발품 기간을 입력해주세요.'}/>
                <Roominfo title={'발품 가격'} placeholder={'발품 가격을 입력해주세요.'}/>
                <div className='title2'>
                    기본 요청 사항
                </div>
                <div style={{display: 'flex', marginLeft: '2.2%', alignItems: 'center'}}>
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
                    

                <div style={{display: 'flex', marginLeft: '2.2%', alignItems: 'center'}}>
                    <Sun/>
                    <p style={{color: '#5F5F5F', fontSize: '21px'}}>채광</p>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', marginLeft: '2.2%', alignItems: 'center'}}>
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
                
                <div className='title2'>
                    추가 요청 사항
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <p style={{fontSize: '15px', color: '#5F5F5F'}}>Q</p>
                    <input className='plusInput' type='text' placeholder='추가 요청사항을 작성해주세요.'/>
                </div>
                
            </div>
        </div>
      
    );
  }
  
  export default RequestForm;