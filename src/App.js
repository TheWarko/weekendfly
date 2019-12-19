import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Form from './components/Form';
import Results from './components/Results';



function App() {

  const [data, setData] = useState({data:[]});

  const handleChildSubmit = (data) => {
    setData(data);
    console.log('App data OK: '+JSON.stringify(data));
  }

  return (
    <div>
      <Form onChildSubmit={handleChildSubmit} />
      <Results flights={data} />
    </div>
  );
}

export default App;
