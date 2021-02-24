import React from 'react';
import Form from './components/Form';
import Results from './components/Results';
import styled from 'styled-components';

import { Provider } from 'react-redux'
import store from './store/store'



const Body = styled.div`
  background-color: yellow;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;


function App() {

  return (
    <Provider store={store} >
      <Body>
        <Form />
        <Results />
      </Body>
    </Provider>
  );
}

export default App;
