import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import Input from '../Input';
import Select from '../Select';
import { fetchSearch } from '../../store/actions/search';
import styled from 'styled-components';



const FormContainer = styled.div`
  padding: 30px;
  font-size: 16px;
  @media screen and (min-width: 40em) {
    padding: 50px;
  }
`;

const Title = styled.div`
    font-size: 42px;
    margin-bottom: 40px;
    color: #fff;
    background-color: #d70c7b;
    padding: 10px;
    display: inline-block;
    border-radius: 5px;
    font-weight: bold;
`;

const Suggestion = styled.span`
    font-size: 12px;
    color: #444;
    font-weight: normal;
    margin-top: -5px;
    padding-bottom: 5px;
    display: block;
`;

const Button = styled.button`
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  display: block;
  background-color: #d70b7a;
  width: 140px;
  height: 40px;
  line-leight: 40px;
  cursor: pointer;
  margin-top: 40px;
  outline: none;
`;

const SelectX = styled.select`
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    margin: 0 10px;
    padding: 0 10px;
    border-radius: 5px;
    outline: none;
`;

const FormGroup = styled.div`
    display: flex;
    margin-bottom: 30px;
    max-width: 407px;
    justify-content: space-between;
`;
const FormField = styled.div`
`;
const Label = styled.p`
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 5px;
    color: #000;
`;


const Form = () => {

    const initialFormData = Object.freeze({
        placeFrom: "",
        placeTo: "",
        dateFrom: "",
        dateTo: "",
        day: 5,
        days: "2",
        hFrom: "08:00",
        hTo: "22:00",
        ret_hFrom: "08:00",
        ret_hTo: "22:00",
    });
    const [formData,setFormData] = useState(initialFormData);
    const dispatch = useDispatch()


    const onFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        console.log('data',formData);
        dispatch(fetchSearch(formData))
    }

    return (
        <FormContainer>
            <form onSubmit={onFormSubmit} >

                <Title>Trova i migliori voli per i weekend.</Title><br/>

                <Select name="placeFrom" label="" placeholder="luogo partenza" onChange={onFormChange} />
                <Select name="placeTo" label="✈" placeholder="luogo arrivo" onChange={onFormChange} />
                <br/><br/><br/>

                <Label>Periodo in cui sei disposto a partire</Label>
                <Suggestion>Inserisci un periodo di settimane o mesi nel quale effettuare la ricerca dei voli</Suggestion>
                <FormGroup>
                    <Input name="dateFrom" type="date" label="dal" placeholder="data inizio" onChange={onFormChange} />
                    <Input name="dateTo" type="date" label="al" placeholder="data fine" onChange={onFormChange} />
                </FormGroup>

                <Label>Quando vorresti partire</Label>
                <FormGroup>
                    <FormField>
                        <label name="day-label" >Giorno</label>
                        <SelectX name="day"  defaultValue={initialFormData.day} onChange={onFormChange} required>
                            <option value="1">Lunedì</option>
                            <option value="2">Martedì</option>
                            <option value="3">Mercoledì</option>
                            <option value="4">Giovedì</option>
                            <option value="5">Venerdì</option>
                            <option value="6">Sabato</option>
                            <option value="0">Domenica</option>
                        </SelectX>
                    </FormField>

                    <Input name="days" type="number" label="Quanti giorni" placeholder={initialFormData.days} value={initialFormData.days} onChange={onFormChange} />
                </FormGroup>

                <Label>Fascia oraria in cui partire</Label>
                <FormGroup>
                    <Input name="hFrom" type="time" label="dalle" placeholder={initialFormData.hFrom} value={initialFormData.hFrom}  onChange={onFormChange} />
                    <Input name="hTo" type="time" label="alle" placeholder={initialFormData.hTo} value={initialFormData.hTo}  onChange={onFormChange} />
                </FormGroup>

                <Label>Fascia oraria del ritorno</Label>
                <FormGroup>
                    <Input name="ret_hFrom" type="time" label="dalle" placeholder={initialFormData.ret_hFrom} value={initialFormData.ret_hFrom}  onChange={onFormChange} />
                    <Input name="ret_hTo" type="time" label="alle" placeholder={initialFormData.ret_hTo} value={initialFormData.ret_hTo} onChange={onFormChange} />
                </FormGroup>

                <Button>Cerca voli ✈</Button>
            </form>
        </FormContainer>
    )

}


export default Form;

