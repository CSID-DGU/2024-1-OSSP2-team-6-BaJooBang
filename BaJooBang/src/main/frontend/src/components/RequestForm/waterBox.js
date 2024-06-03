import React, { useState, useEffect } from 'react';
import './CircleSelector.css';
import './waterBox.css';    
import { ReactComponent as Check } from '../../components/images/check(white).svg';

function WaterBox({ Icon, title, complete, savedState }) {
    const [selected, setSelected] = useState(null);
    const [hotWaterTime1, setHotWaterTime1] = useState('');
    const [hotWaterTime2, setHotWaterTime2] = useState('');

    useEffect(() => {
        if (complete && savedState) {
            setSelected(savedState.selected);
            setHotWaterTime1(savedState.hotWaterTime1);
            setHotWaterTime2(savedState.hotWaterTime2);
        } else {
            setSelected(null);
            setHotWaterTime1('');
            setHotWaterTime2('');
        }
    }, [complete, savedState]);

    const renderCircle = (index) => {
        const circleClass = `circle${index}`; // 원의 클래스 이름 생성
        const isSelected = selected === index; // 현재 원이 선택되었는지 확인

        return (
            <div
                className={`${circleClass} ${isSelected ? 'selected' : ''}`}
                onClick={() => !complete && setSelected(index)}
                key={index}
            >
                {isSelected ? <Check /> : (index === 1 ? '상' : index === 2 ? '중' : '하')}
            </div>
        );
    };

    return (
        <div className='waterBox'>
            <div className='waterTitle'>
                <Icon style={{ paddingRight: '0.3vw' }} />
                {title}
            </div>
            <div className='waterContent'>
                <div className='waterSmallTitle'>
                    수압 정보
                </div>
                <div className="circle-container">
                    {renderCircle(1)}
                    {renderCircle(2)}
                    {renderCircle(3)}
                </div>
                <div className='waterSmallTitle'>
                    온수 정보
                </div>
                <div className='waterTimeBox'>
                    <p style={{ color: "#5F5F5F", paddingRight: '0.2vw' }}>1.</p>
                    <input
                        type='text'
                        className='waterTextInput'
                        placeholder={'00분 00초'}
                        value={hotWaterTime1}
                        onChange={e => !complete && setHotWaterTime1(e.target.value)}
                        readOnly={complete}
                    />
                </div>
                <div className='waterTimeBox'>
                    <p style={{ color: "#5F5F5F", paddingRight: '0.2vw' }}>2.</p>
                    <input
                        type='text'
                        className='waterTextInput'
                        placeholder={'00분 00초'}
                        value={hotWaterTime2}
                        onChange={e => !complete && setHotWaterTime2(e.target.value)}
                        readOnly={complete}
                    />
                </div>
            </div>
        </div>
    );
}

export default WaterBox;
