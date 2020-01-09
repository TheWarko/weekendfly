import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SelectX = styled.select`
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    margin: 0 10px;
    border-radius: 5px;
    outline: none;
    padding: 0 10px;
    font-size: 14px;
    @media screen and (min-width: 40em) {
        font-size: 20px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
      }
`;

const FormField = styled.span`
`;


const Select = (props) => {

    const [data, setData] = useState([]);

    const getLocations = async () => {
    
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
        <FormField>
            <label name={props.name+"-label"} >{props.label}</label>
            <SelectX name={props.name} defaultValue={'MIL'} required >
                {
                    data.map((d) => {
                        if(d.rank <= 7){
                            // console.log(d.name+" "+d.rank);
                            return <option key={d.id} value={d.code} >{d.name}</option>;
                        }else{
                            return false;
                        }
                    })
                }
            </SelectX>
        </FormField>
    )
}



export default Select;
