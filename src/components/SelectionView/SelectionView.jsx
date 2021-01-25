import React from 'react';
import './SelectionView.css';

function SelectionView(props) {
    const stuffData = props.data;

    console.log(stuffData);

    return (
        <ul>
        {stuffData && stuffData.map(s =>
            <li key={s.id}>
                {s.id}
            </li>
        )}
        </ul>
    );
}

export default SelectionView;
