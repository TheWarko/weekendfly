import React from 'react';
import Input from '../Input';
import Select from '../Select';
import axios from 'axios';
import { getDayOfWeekArray } from './../../utils/utils';
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


const Form = ( {onChildSubmit} ) => {

    const onFormSubmit = async (e) => {
        e.preventDefault();

        onChildSubmit({loading : 'Sto cercando voli...'});
        
        // Flights search Parameters
        const data = new FormData(e.target);
        const dateFrom = data.get('dateFrom');
        const dateTo = data.get('dateTo');
        const departureDay = data.get('day');
        const placeFrom = data.get('placeFrom');
        const placeTo = data.get('placeTo');
        let dayDeparture;
        const nightsInDest = data.get('days');
        const maxStopOvers = 0;
        const dtimeFrom = data.get('hFrom');
        const dtimeTo = data.get('hTo');
        const ret_dtimeFrom = data.get('ret_hFrom');
        const ret_dtimeTo = data.get('ret_hTo');
        const daysDeparture = getDayOfWeekArray(dateFrom,dateTo,departureDay);

        const results = [];

        // Loop of Fly Search in range time
        for(let i=0; i < daysDeparture.length; i++){
            dayDeparture = daysDeparture[i];
            // console.log('https://api.skypicker.com/flights?flyFrom='+placeFrom+'&to='+placeTo+'&dateFrom='+dayDeparture+'&dateTo='+dayDeparture+'&nights_in_dst_from='+nightsInDest+'&nights_in_dst_to='+nightsInDest+'&max_stopovers='+maxStopOvers+'&dtime_from='+dtimeFrom+'&dtime_to='+dtimeTo+'&ret_dtime_from='+ret_dtimeFrom+'&ret_dtime_to='+ret_dtimeTo+'&partner=picky');
            await axios.get('https://api.skypicker.com/flights?flyFrom='+placeFrom+'&to='+placeTo+'&dateFrom='+dayDeparture+'&dateTo='+dayDeparture+'&nights_in_dst_from='+nightsInDest+'&nights_in_dst_to='+nightsInDest+'&max_stopovers='+maxStopOvers+'&dtime_from='+dtimeFrom+'&dtime_to='+dtimeTo+'&ret_dtime_from='+ret_dtimeFrom+'&ret_dtime_to='+ret_dtimeTo+'&partner=marcoebbastaweekendfly')
            .then(res => {

                console.log('search call: OK');

                // Push all flights in Results[]
                for(var i in res.data.data) {
                    results.push(res.data.data[i]);
                }

            })
            .catch(function (error) {
                console.log('error: '+error);
            })
            .finally(function () {
            });
        }

        // console.log('Results: '+JSON.stringify(results));
        results.length ? onChildSubmit(results) : onChildSubmit({noresults : 'Non ci sono voli. Prova a cambiare i filtri di ricerca.'});

    }

    return (
        <FormContainer>
            <form onSubmit={onFormSubmit} >

                <Title>Trova i migliori voli per i weekend.</Title><br/>

                <Select name="placeFrom" label="" placeholder="luogo partenza" />
                <Select name="placeTo" label="✈" placeholder="luogo arrivo" />
                <br/><br/><br/>

                <Label>Periodo in cui sei disposto a partire</Label>
                <Suggestion>Inserisci un periodo di settimane o mesi nel quale effettuare la ricerca dei voli</Suggestion>
                <FormGroup>
                    <Input name="dateFrom" type="date" label="dal" placeholder="data inizio" />
                    <Input name="dateTo" type="date" label="al" placeholder="data fine" />
                </FormGroup>

                <Label>Quando vorresti partire</Label>
                <FormGroup>
                    <FormField>
                        <label name="day-label" >Giorno</label>
                        <SelectX name="day"  defaultValue={5} required>
                            <option value="1">Lunedì</option>
                            <option value="2">Martedì</option>
                            <option value="3">Mercoledì</option>
                            <option value="4">Giovedì</option>
                            <option value="5">Venerdì</option>
                            <option value="6">Sabato</option>
                            <option value="0">Domenica</option>
                        </SelectX>
                    </FormField>

                    <Input name="days" type="number" label="Quanti giorni" placeholder="2" value="2" />
                </FormGroup>

                <Label>Fascia oraria in cui partire</Label>
                <FormGroup>
                    <Input name="hFrom" type="time" label="dalle" placeholder="13:00" value="13:00" />
                    <Input name="hTo" type="time" label="alle" placeholder="14:00" value="14:00" />
                </FormGroup>

                <Label>Fascia oraria del ritorno</Label>
                <FormGroup>
                    <Input name="ret_hFrom" type="time" label="dalle" placeholder="13:00" value="13:00" />
                    <Input name="ret_hTo" type="time" label="alle" placeholder="14:00" value="14:00" />
                </FormGroup>

                <Button>Cerca voli ✈</Button>
            </form>
        </FormContainer>
    )

}


export default Form;

