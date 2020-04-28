import React from "react";
import "./Desk.scss";
import "../PlayListItem/PlayListItem";
import PlayListItem from "../PlayListItem/PlayListItem";
import { ListGroup } from "react-bootstrap";
import { useStoreState } from 'easy-peasy';

function Desk() {
  const plData = useStoreState(state => state.playlist.data)

  return (
    <div className="desk">
      <div>
        <img
          width={64}
          height={64}
          className="mr-3"
          src={plData.cover}
          alt="placeholder"
        />
        <span>{plData.name}</span>
      </div>

      <ListGroup>
        {plData.tracklist.map(el => {
          return (
            <PlayListItem
              name={el.name}
              key={el.id}
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
