import React, { Fragment } from 'react';
import './Desk.scss';
import '../PlayListItem/PlayListItem';
import PlayListItem from '../PlayListItem/PlayListItem';
import { ListGroup } from 'react-bootstrap';
import { useStoreState } from 'easy-peasy';
import ProcessingPanel from '../ProcessingPanel/ProcessingPanel';

function Desk() {
  const plData = useStoreState((state) => state.playlist.data);

  return (
    <Fragment>
      <div className="desk">
        <div>
          <img width={100} height={100} className="mr-3" src={plData.cover} alt="placeholder" />
          <span>{plData.name}</span>
        </div>

        <ListGroup>
          {plData.tracklist.map((el) => {
            return (
              <PlayListItem
                name={el.name}
                key={el.id}
                id={el.id}
                artist={el.artist}
                artworkLink={el.artworkLink}
                wasFound={el.wasFound}
                willProcessed={el.willProcessed}
              />
            );
          })}
        </ListGroup>
      </div>
      <ProcessingPanel />
    </Fragment>
  );
}

export default Desk;
