import React from 'react';
import styled from 'styled-components';

const InputX = styled.input`
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    margin: 0 10px;
    padding: 0 10px;
    border-radius: 5px;
    outline: none;
`;

const FormField = styled.div`
`;

const Input = (props) => {

    const onFieldChange = (e) => {
        props.onChange(e)
    }

    return (
        <FormField>
            <label name={props.name+"-label"} >{props.label}</label>
            <InputX type={props.type} name={props.name} placeholder={props.placeholder} defaultValue={props.value} onChange={onFieldChange} required />
        </FormField>
    )
}

export default Input;
