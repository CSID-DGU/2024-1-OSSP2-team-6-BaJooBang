import React, { useState, useEffect, useCallback, useRef } from 'react';
import './CircleSelector.css';
import './waterBox.css';    
import { ReactComponent as Check } from '../../components/images/check(white).svg';

function WaterBox({ Icon, title, complete, savedState, onChange }) {
    const [selected, setSelected] = useState(savedState?.selected || null);
    const [hotWaterTime1, setHotWaterTime1] = useState(savedState?.hotWaterTime1 || '');
    const [hotWaterTime2, setHotWaterTime2] = useState(savedState?.hotWaterTime2 || '');

    const prevSavedStateRef = useRef();

    useEffect(() => {
        if (prevSavedStateRef.current !== savedState && complete === true) {
            setSelected(savedState?.selected || null);
            setHotWaterTime1(savedState?.hotWaterTime1 || '');
            setHotWaterTime2(savedState?.hotWaterTime2 || '');
            prevSavedStateRef.current = savedState;
        }
    }, [savedState, complete]);

    const handleCircleClick = useCallback((index) => {
        if (!complete) {
            setSelected(index);
            if (onChange) {
                onChange({ selected: index, hotWaterTime1, hotWaterTime2 });
            }
        }
    }, [complete, hotWaterTime1, hotWaterTime2, onChange]);

    const handleTimeChange = useCallback((setter, value) => {
        if (!complete) {
            setter(value);
            if (onChange) {
                onChange({ selected, hotWaterTime1: setter === setHotWaterTime1 ? value : hotWaterTime1, hotWaterTime2: setter === setHotWaterTime2 ? value : hotWaterTime2 });
            }
        }
    }, [complete, selected, hotWaterTime1, hotWaterTime2, onChange]);

    const renderCircle = (index) => {
        const circleClass = `circle${index}`;
        const isSelected = selected === index;

        return (
            <div
                className={`${circleClass} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleCircleClick(index)}
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
                        onChange={e => handleTimeChange(setHotWaterTime1, e.target.value)}
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
                        onChange={e => handleTimeChange(setHotWaterTime2, e.target.value)}
                        readOnly={complete}
                    />
                </div>
            </div>
        </div>
    );
}

export default WaterBox;
