import React, { useState } from 'react';
import './App.css';
import Welcome from './Components/Welcome/Welcome'

function App() {
  // const [isLoading, setIsLoading] = useState(false)
  const [plData, setPlData] = useState([])

  return (
    <div className="App">
      <Welcome moveDataUpward={data => setPlData(data)}/>
    </div>
  );
}

export default App;
