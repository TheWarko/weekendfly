import React,{ useState } from 'react';
import Input from '../Input';
import Select from '../Select';
import axios from 'axios';
import moment from 'moment';
import { getDayOfWeekArray } from './../../utils/utils';



const Form = ( {onChildSubmit} ) => {

    const [dati, setDati] = useState([]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        
        // Flights search Parameters
        const data = new FormData(e.target);
        const dateFrom = data.get('dateFrom');
        const dateTo = data.get('dateTo');
        const placeFrom = data.get('placeFrom');
        const placeTo = data.get('placeTo');
        let dayDeparture;
        const nightsInDest = data.get('days');
        const maxStopOvers = 0;
        const dtimeFrom = '13:00';
        const dtimeTo = '14:00';
        const ret_dtimeFrom = '13:00';
        const ret_dtimeTo = '14:00';
        const daysDeparture = getDayOfWeekArray(dateFrom,dateTo);

        // Loop of Fly Search in range time
        for(let i=0; i < daysDeparture.length; i++){
            dayDeparture = daysDeparture[i];
            // console.log('https://api.skypicker.com/flights?flyFrom='+placeFrom+'&to='+placeTo+'&dateFrom='+dayDeparture+'&dateTo='+dayDeparture+'&nights_in_dst_from='+nightsInDest+'&nights_in_dst_to='+nightsInDest+'&max_stopovers='+maxStopOvers+'&dtime_from='+dtimeFrom+'&dtime_to='+dtimeTo+'&ret_dtime_from='+ret_dtimeFrom+'&ret_dtime_to='+ret_dtimeTo+'&partner=picky');
            axios.get('https://api.skypicker.com/flights?flyFrom='+placeFrom+'&to='+placeTo+'&dateFrom='+dayDeparture+'&dateTo='+dayDeparture+'&nights_in_dst_from='+nightsInDest+'&nights_in_dst_to='+nightsInDest+'&max_stopovers='+maxStopOvers+'&dtime_from='+dtimeFrom+'&dtime_to='+dtimeTo+'&ret_dtime_from='+ret_dtimeFrom+'&ret_dtime_to='+ret_dtimeTo+'&partner=picky')
            .then(res => {
                // console.log('search call: '+JSON.stringify(res.data));
                onChildSubmit(res.data);
                // setDati(dati => [...dati, res.data]);    // fallo funzionare
                // onChildSubmit(dati);
            })
            .catch(function (error) {
                console.log('error: '+error);
            })
            .finally(function () {
            });
        }

    }

    return (
        <form onSubmit={onFormSubmit} >
            <Select name="placeFrom" label="Da" placeholder="luogo partenza" />
            <Select name="placeTo" label="a" placeholder="luogo arrivo" />
            <br/><br/>
            <Input name="dateFrom" label="Dal" placeholder="data inizio" />
            <Input name="dateTo" label="al" placeholder="data fine" />
            <br/><br/>
            <span className="formField" >
                <label name="days-label" >Quanti giorni</label>
                <input type="number" name="days" value="2" required />
            </span>

            <br/><br/>
            <button>Scansiona voli</button>
        </form>
    )

}


export default Form;




/*

    TO DO
    aggiungere al form i campi:
    ° giorno della settimana di partenza
    ° fascia oraria di partenza andata
    ° fascia oraria di partenza ritorno

*/