import React from "react";
import "./App.scss";
import Welcome from "./Components/Welcome/Welcome";
import Desk from "./Components/Desk/Desk";
import { useStoreState } from "easy-peasy";

function App() {
  const tracklist = useStoreState((state) => state.playlist.data.tracklist);

  return (
    <div className="App">{tracklist.length === 0 ? <Welcome /> : <Desk />}</div>
  );
}

export default App;
