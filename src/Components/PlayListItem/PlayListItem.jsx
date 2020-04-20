import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import "./PlayListItem.scss";
import AlbumPlaceholder from "../Icons/AlbumPlaceholder";
import RemoveFromProcessed from "../Icons/RemoveFromProcessed";

function PlayListItem({
  name,
  key,
  artist,
  artworkLink,
  wasFound,
  willProcessed,
  setWillProcessed
}) {
  const [onHover, setHover] = useState(false);

  const disabled = () => {
    if (willProcessed === false) {
      return { opacity: "0.3" };
    } else {
      return { opacity: "1" };
    }
  };

  return (
    <ListGroup.Item
      key={key}
      onMouseOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setHover(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setHover(false);
      }}
    >
      <div className="playlist-item">
        <div style={disabled()} className="playlist-item">
          {artworkLink.length !== 0 ? (
            <img
              className="playlist-item_artwork"
              src={artworkLink}
              alt={"img" + key}
            ></img>
          ) : (
            <div className="playlist-item_artwork">
              <AlbumPlaceholder />
            </div>
          )}

          <div className="playlist-item_data-wrapper">
            <div className="playlist-item_name">{name}</div>
            <div className="playlist-item_artist">{artist}</div>
          </div>
        </div>

        {onHover && (
          <Button variant="Light" onClick={()=>setWillProcessed(key, !willProcessed)}>
            <RemoveFromProcessed />
          </Button>
        )}
      </div>
    </ListGroup.Item>
  );
}

export default PlayListItem;
