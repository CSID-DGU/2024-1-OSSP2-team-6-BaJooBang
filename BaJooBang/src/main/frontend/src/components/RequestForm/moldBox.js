import React from 'react';
import './moldBox.css';
import MoldCheck from './moldCheck';

function MoldBox({ title, complete, savedState, onChange, type }) {
    return (
        <div className='moldBox'>
            {title}
            <MoldCheck
                complete={complete}
                savedState={savedState}
                onChange={(checkedState) => {
                    //console.log('MoldCheck onChange:', checkedState);
                    onChange(type, checkedState);
                }}
            />
        </div>
    );
}

export default MoldBox;
