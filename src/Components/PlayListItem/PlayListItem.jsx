import React from "react";
import { ListGroup } from "react-bootstrap";
import "./PlayListItem.scss";

function PlayListItem({
  name,
  key,
  artist,
  artworkLink,
  wasFound,
  willProcessed,
}) {
  const disabled = () => {
    if (willProcessed === false) {
      return { opacity: '0.3' };
    } else {
      return { opacity: '1' };
    }
  };

  return (
    <ListGroup.Item action>
      <div className="playlist-item">
        <div style={disabled()} className="playlist-item">
        <img
          className="playlist-item_artwork"
          src={artworkLink}
          alt={"img" + key}
        ></img>
        <div className="playlist-item_data-wrapper">
          <div className='playlist-item_name'>{name}</div>
          <div className='playlist-item_artist'>{artist}</div>
        </div>
        </div>
      </div>

    </ListGroup.Item>
  );
}

export default PlayListItem;
