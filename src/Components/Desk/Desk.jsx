import React, { useState } from "react";
import "./Desk.scss";
import "../PlayListItem/PlayListItem";
import PlayListItem from "../PlayListItem/PlayListItem";
import { ListGroup } from "react-bootstrap";

function Desk({ plData, moveDataUpward }) {
  const [data, setData] = useState(plData)
  const setWillProcessed = (id, value) => {
    setData(data.tracklist.forEach(el => {
      el.id === id && (el.willProcessed = value)
    }))
  }

  return (
    <div className="desk">
      <div>
        <img
          width={64}
          height={64}
          className="mr-3"
          src={plData.title.cover}
          alt="placeholder"
        />
        <span>{plData.title.name}</span>
      </div>

      <ListGroup>
        {plData.tracklist.map((el, i) => {
          return (
            <PlayListItem
              name={el.name}
              key={el.id}
              artist={el.artist}
              artworkLink={el.artworkLink}
              wasFound={el.wasFound}
              willProcessed={el.willProcessed}
              setWillProcessed={setWillProcessed}
            />
          );
        })}
      </ListGroup>
    </div>
  );
}

export default Desk;
