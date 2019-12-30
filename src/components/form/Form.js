import React,{ useState, useEffect, useReducer } from 'react';
import Input from '../Input';
import Select from '../Select';
import axios from 'axios';
import { getDayOfWeekArray } from './../../utils/utils';
import styled from 'styled-components';



const FormContainer = styled.div`
  background-color: yellow;
  min-height: 100vh;
  padding: 50px;
`;

const Title = styled.div`
  font-size: 42px;
  margin-bottom: 40px;
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
`;

// const reducer = (state, action) => {
//     switch(action.type) {
//       case 'append':
//         return [...state, action.payload]
//     }
//   }

const Form = ( {onChildSubmit} ) => {

    // const [dati, dispatch] = useReducer(reducer, [])

    const [dati, setDati] = useState([]);

    // useEffect(() => {
    //     setFlights([...flights, dati ]);
                
    //     console.log('search call 2: '+flights);

    //     onChildSubmit(flights);
    // })


    const onFormSubmit = async (e) => {
        e.preventDefault();
        
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

        // Loop of Fly Search in range time
        for(let i=0; i < daysDeparture.length; i++){
            dayDeparture = daysDeparture[i];
            // console.log('https://api.skypicker.com/flights?flyFrom='+placeFrom+'&to='+placeTo+'&dateFrom='+dayDeparture+'&dateTo='+dayDeparture+'&nights_in_dst_from='+nightsInDest+'&nights_in_dst_to='+nightsInDest+'&max_stopovers='+maxStopOvers+'&dtime_from='+dtimeFrom+'&dtime_to='+dtimeTo+'&ret_dtime_from='+ret_dtimeFrom+'&ret_dtime_to='+ret_dtimeTo+'&partner=picky');
            axios.get('https://api.skypicker.com/flights?flyFrom='+placeFrom+'&to='+placeTo+'&dateFrom='+dayDeparture+'&dateTo='+dayDeparture+'&nights_in_dst_from='+nightsInDest+'&nights_in_dst_to='+nightsInDest+'&max_stopovers='+maxStopOvers+'&dtime_from='+dtimeFrom+'&dtime_to='+dtimeTo+'&ret_dtime_from='+ret_dtimeFrom+'&ret_dtime_to='+ret_dtimeTo+'&partner=picky')
            .then(res => {

                // dispatch({type: 'append', payload: res.data})

                // setDati(dati => ([...dati, res.data]));  // NON VA! Fallo funzionare.
                // setDati([...dati, res.data]);

                // setDati(res.data);
                // setFlights([...flights, dati ]);
                // console.log('search call 1: '+JSON.stringify(res.data));
                // console.log('search call 2: '+JSON.stringify(flights));

                onChildSubmit(res.data);

            })
            .catch(function (error) {
                console.log('error: '+error);
            })
            .finally(function () {
            });
        }

        // onChildSubmit(dati);

    }

    return (
        <FormContainer>
            <form onSubmit={onFormSubmit} >

                <Title>Trova i migliori voli per i weekend.</Title>

                <Select name="placeFrom" label="Da" placeholder="luogo partenza" />
                <Select name="placeTo" label="a" placeholder="luogo arrivo" />
                <br/><br/>

                <Input name="dateFrom" type="date" label="Dal" placeholder="data inizio" />
                <Input name="dateTo" type="date" label="al" placeholder="data fine" />
                <br/><br/>

                <span className="formField" >
                    <label name="day-label" >Giorno della partenza</label>
                    <select name="day" required>
                        <option value="1">Lunedì</option>
                        <option value="2">Martedì</option>
                        <option value="3">Mercoledì</option>
                        <option value="4">Giovedì</option>
                        <option value="5" selected >Venerdì</option>
                        <option value="6">Sabato</option>
                        <option value="0">Domenica</option>
                    </select>
                </span>

                <Input name="days" type="number" label="Quanti giorni" placeholder="2" value="2" />
                <br/><br/>
                
                <Input name="hFrom" type="time" label="Orario di partenza dalle" placeholder="13:00" value="13:00" />
                <Input name="hTo" type="time" label="alle" placeholder="14:00" value="14:00" />
                <br/>

                <Input name="ret_hFrom" type="time" label="Orario di ritorno dalle" placeholder="13:00" value="13:00" />
                <Input name="ret_hTo" type="time" label="alle" placeholder="14:00" value="14:00" />

                <Button>Scansiona voli</Button>
            </form>
        </FormContainer>
    )

}


export default Form;




/*

    TO DO
    ° I risultati dei voli vengono sovrascritti. Vanno stampati concatenati. Row 41.
    ° Style it. Row 11.

*/