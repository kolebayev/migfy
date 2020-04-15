import React, { useState } from "react";
import "./Desk.scss";
import "../PlayListItem/PlayListItem";
import PlayListItem from "../PlayListItem/PlayListItem";
import { ListGroup } from 'react-bootstrap'

function Desk({ plData }) {
  // const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="Desk">
      <ListGroup>
        {plData.map(el => {
          return (
            <PlayListItem
              key={el.id}
              name={el.name}
              artist={el.artist}
              artworkLink={el.artworkLink}
              wasFound={el.wasFound}
              willProcessed={el.willProcessed}
            />
          );
        })}
      </ListGroup>
    </div>
  );
}

export default Desk;
