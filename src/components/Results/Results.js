import React from 'react';
import moment from 'moment';




const Results = ( {flights} ) => {

    return (
        <div>
            {
                flights.data.map((flight) => {
                    return (
                        <div key={flight.id} >
                            <div className="flight__title" >GOING</div>
                            <div className="flight__time" >{ moment.unix(flight.route[0].dTimeUTC).format('DD/MM/YYYY hh:mm') }</div>
                            <div className="flight__airport" >{ flight.route[0].cityFrom }{ flight.route[0].flyFrom }</div>
                            <div className="flight__title" >RETURN</div>
                            <div className="flight__time" >{ moment.unix(flight.route[1].dTimeUTC).format('DD/MM/YYYY hh:mm') }</div>
                            <div className="flight__airport" >{ flight.route[1].cityFrom } { flight.route[1].flyFrom }</div>
                            <div className="flight__price" >{ flight.price }€</div>
                            <a className="flight__link" href={ flight.deep_link } target="_blank" >{ flight.deep_link }</a>
                            <br/><br/>
                        </div>
                    )
                })
            }
        </div>
    )
}

Results.defaultProps = { 
    data:[] 
}


export default Results;
