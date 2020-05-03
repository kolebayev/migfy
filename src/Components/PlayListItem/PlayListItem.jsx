import React, { useState, useCallback } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import './PlayListItem.scss';
import AlbumPlaceholder from '../Icons/AlbumPlaceholder';
import RemoveFromProcessed from '../Icons/RemoveFromProcessed';
import AddToProcessed from '../Icons/AddToProcessed';
import { useStoreActions } from 'easy-peasy';

function PlayListItem({ name, id, artist, artworkLink, wasFound, willProcessed }) {
  const [onHover, setHover] = useState(false);
  const setWillProcessed = useStoreActions((actions) => actions.playlist.setWillProcessed);
  const doSetWillProcessed = useCallback(() => setWillProcessed(id), [setWillProcessed, id]);

  const disabled = () => {
    if (willProcessed === false) {
      return { opacity: '0.5' };
    } else {
      return { opacity: '1' };
    }
  };

  return (
    <ListGroup.Item
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
            <img className="playlist-item_artwork" src={artworkLink} alt={'img' + id}></img>
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
          <Button variant="Light" onClick={doSetWillProcessed}>
            {!willProcessed ? <RemoveFromProcessed /> : <AddToProcessed />}
          </Button>
        )}
      </div>
    </ListGroup.Item>
  );
}

export default PlayListItem;
