import axios from 'axios'
import { getDayOfWeekArray } from './../../utils/utils';
import { FETCH_SEARCH_REQUEST,FETCH_SEARCH_SUCCESS,FETCH_SEARCH_FAILURE } from '../actions/actionTypes'


export const fetchSearchRequest = () => {
    return {
        type: FETCH_SEARCH_REQUEST
    }
}

const fetchSearchSuccess = searchResults => {
    return {
        type: FETCH_SEARCH_SUCCESS,
        payload: searchResults
    }
}

const fetchSearchFailure = error => {
    return {
        type: FETCH_SEARCH_FAILURE,
        payload: error
    }
}

export const fetchSearch = (data) => {
    return function(dispatch) {

        let dayDeparture;
        const daysDeparture = getDayOfWeekArray(data.dateFrom,data.dateTo,data.day);

        // Loop of Fly Search in range time
        for(let i=0; i < daysDeparture.length; i++){
            dispatch(fetchSearchRequest())
            dayDeparture = daysDeparture[i];
            axios.get('https://api.skypicker.com/flights?flyFrom='+data.placeFrom+
            '&to='+data.placeTo+
            '&dateFrom='+dayDeparture+
            '&dateTo='+dayDeparture+
            '&nights_in_dst_from='+data.days+
            '&nights_in_dst_to='+data.days+
            '&max_stopovers=0'+
            '&dtime_from='+data.hFrom+
            '&dtime_to='+data.hTo+
            '&ret_dtime_from='+data.ret_hFrom+
            '&ret_dtime_to='+data.ret_hTo+
            '&partner=picky')
            .then(res => {
                console.log('Searching flight...')

                // TO DO: understands if needs to append instead of replace data all times
                for(let j in res.data.data) {
                    dispatch(fetchSearchSuccess(res.data.data[j]))
                }

            })
            .catch(err => {
                dispatch(fetchSearchFailure(err.message))
            })
        }
    }
}