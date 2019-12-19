import React,{ useState, useEffect } from 'react';
import reactdom from 'react-dom';
import axios from 'axios';


const Select = (props) => {

    const [data, setData] = useState([]);

    const getLocations = async () => {
        const axios = require('axios');
    
        axios.get('https://api.skypicker.com/locations?type=box&low_lat=35.469059&low_lon=-13.182548&high_lat=63.576525&high_lon=31.107951&locale=en-US&location_types=city&limit=1000&sort=name&active_only=true&source_popularity=bookings')
        .then(res => {
            setData(res.data.locations);
            // console.log('loc-1: '+JSON.stringify(res.data.locations));
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
    }

    useEffect( () => {
        getLocations();
    }, []);

    return (
        <span className="formField" >
            <label name={props.name+"-label"} >{props.label}</label>
            <select name={props.name} required >
                {
                    data.map((d) => {
                        if(d.rank <= 7){
                            // console.log(d.name+" "+d.rank);
                            return <option key={d.id} value={d.code} selected={d.name == 'Milan' ? 'selected' : ''} >{d.name}</option>;
                        }
                    })
                }
            </select>
        </span>
    )
}



export default Select;
