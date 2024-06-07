import React from 'react';
import './moldBox.css';
import MoldCheck from './moldCheck';

function MoldBox({ title, complete, savedState, onChange }) {
    return (
        <div className='moldBox'>
            {title}
            <MoldCheck complete={complete} savedState={savedState} onChange={onChange} />
        </div>
    );
}

export default MoldBox;
