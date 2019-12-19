import React from 'react';
import reactdom from 'react-dom';


const Input = (props) => {
    return (
        <span className="formField" >
            <label name={props.name+"-label"} >{props.label}</label>
            <input type="date" name={props.name} placeholder={props.placeholder} value={props.value} required />
        </span>
    )
}

export default Input;
