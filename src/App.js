import React, {useState} from 'react';
import Form from './components/Form';
import Results from './components/Results';
import styled from 'styled-components';



const Body = styled.div`
  background-color: yellow;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;


function App() {

  const [data, setData] = useState([]);

  const handleChildSubmit = (data) => {
    setData(data);
    console.log('APP: '+JSON.stringify(data));
  }

  return (
    <Body>
      <Form onChildSubmit={handleChildSubmit} />
      <Results flights={data} />
    </Body>
  );
}

export default App;
