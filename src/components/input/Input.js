import React from 'react';


const Input = (props) => {
    return (
        <span className="formField" >
            <label name={props.name+"-label"} >{props.label}</label>
            <input type={props.type} name={props.name} placeholder={props.placeholder} value={props.value} required />
        </span>
    )
}

export default Input;
