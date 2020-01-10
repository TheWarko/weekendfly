import React from 'react';
import moment from 'moment';
import styled from 'styled-components';




const Text = styled.div`
  text-align: center;
  width: 100%;
  font-size: 24px;
  padding: 40px 0;
`;
const Fly = styled.div`
  background-color: yellow;
  padding: 40px 50px;
  border-top: 1px solid #d372a7;
  font-size: 18px;
  color: #333;
  @media screen and (min-width: 40em) {
    display: flex;
    justify-content: space-between;
  }
`;
const Routes = styled.div`
  @media screen and (min-width: 40em) {
    width: 50%;
  }
`;
const Route = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  @media screen and (min-width: 40em) {
    > div {
        flex: 1;
    }
  }
`;
const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 12px;
  color: #000;
`;
const Btn = styled.a`
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    display: block;
    background-color: #d70b7a;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    padding: 5px;
`;
const Price = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const PriceBtn = styled.div`
    text-align: center;
`;



const Results = ( {flights} ) => {

    // console.log('flights: '+JSON.stringify(flights));

    if(flights.loading){
        return (
            <div>
                <Text>{flights.loading}</Text>
            </div>
        )
    }

    if(flights.noresults){
        return (
            <div>
                <Text>{flights.noresults}</Text>
            </div>
        )
    }

    return flights.sort( (a, b) => a.price - b.price ).map((d) => {
        return (
            <div>
                <div key={d.id} >

                    <Fly>
                        <Routes>
                            <Route>
                                <div className="flight__airport" >
                                    <Label>Areoporto</Label> 
                                    { d.route[0].cityFrom }{ d.route[0].flyFrom }
                                </div>
                                <div className="flight__time" >
                                    <Label>Giorno&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ora</Label> 
                                    { moment.unix(d.route[0].dTimeUTC).format('DD/MM/YYYY HH:mm') }
                                </div>
                            </Route>

                            <Route>
                                <div className="flight__airport" >
                                    <Label>Areoporto</Label> 
                                    { d.route[1].cityFrom }{ d.route[1].flyFrom }
                                </div>
                                <div className="flight__time" >
                                <Label>Giorno&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ora</Label> 
                                { moment.unix(d.route[1].dTimeUTC).format('DD/MM/YYYY HH:mm') }
                                </div>
                            </Route>
                        </Routes>

                        <PriceBtn>
                            <Price className="flight__price" >{ d.price }€</Price>
                            <Btn className="flight__link" href={ d.deep_link } target="_blank" rel="noopener noreferrer" >GO!</Btn>
                        </PriceBtn>
                    </Fly>

                </div>
            </div>
        )
    })
                    
}


export default Results;
