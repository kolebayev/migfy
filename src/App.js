import React, { useState } from "react";
import "./App.scss";
import Welcome from "./Components/Welcome/Welcome";
import Desk from "./Components/Desk/Desk";

function App() {
  // const [isLoading, setIsLoading] = useState(false)
  const [plData, setPlData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="App">
      {plData.length === 0 ? (
        <Welcome
          moveDataUpward={(data) => setPlData(data)}
        />
      ) : (
        <Desk plData={plData} moveDataUpward={(data) => setPlData(data)}/>
      )}
    </div>
  );
}

export default App;
