import React, { useState } from "react";
import "./Desk.scss";
import "../PlayListItem/PlayListItem";
// import PlayListItem from "../PlayListItem/PlayListItem";
import { ListGroup, Button } from "react-bootstrap";
import AlbumPlaceholder from '../Icons/AlbumPlaceholder'
import RemoveFromProcessed from '../Icons/RemoveFromProcessed'

function Desk({ plData }) {
  const disabled = (willProcessed) => {
    if (willProcessed === false) {
      return { opacity: "0.3" };
    } else {
      return { opacity: "1" };
    }
  };

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
            <ListGroup.Item key={el.id}>
              <div className="playlist-item">
                <div
                  style={disabled(el.willProcessed)}
                  className="playlist-item"
                >
                  {el.artworkLink.length !== 0 ? (
                    <img
                      className="playlist-item_artwork"
                      src={el.artworkLink}
                      alt={"img" + el.id}
                    ></img>
                  ) : (
                    <div className="playlist-item_artwork">
                      
                      <AlbumPlaceholder />
                    </div>
                  )}

                  <div className="playlist-item_data-wrapper">
                    <div className="playlist-item_name">{el.name}</div>
                    <div className="playlist-item_artist">{el.artist}</div>
                  </div>
                </div>

                <Button variant="light">
                  
                  <RemoveFromProcessed />
                </Button>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default Desk;
