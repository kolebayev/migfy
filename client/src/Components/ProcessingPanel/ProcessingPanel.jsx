import React, { useCallback } from 'react';
import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { useStoreState, useStoreActions } from 'easy-peasy';
import './ProcessingPanel.scss';

function ProcessingPanel() {
  const plData = useStoreState((state) => state.playlist.data);
  const willProcessedQty = useStoreState((state) => state.playlist.service.willProcessedQty);
  const login = useCallback(async () => {
    let response = await fetch('/login');
    if (response.ok) {
      let loginURI = await response.text();
      window.location.assign(loginURI);
    } else {
      console.log('error');
    }
  }, []);

  const getProcessed = {
    json: function () {
      let processed = [];
      plData.tracklist.forEach((el) => {
        el.willProcessed && processed.push({ name: el.name, artist: el.artist });
      });
      return processed;
    },
    csv: function () {
      let str = 'Name\tArtist\n';
      plData.tracklist.forEach((el) => {
        if (el.willProcessed === true) {
          str += [el.name, el.artist].join('\t');
          str += '\n';
        }
      });
      return str;
    },
  };

  const getJSONURL = useCallback(() => {
    const json = JSON.stringify(getProcessed.json(), null, 2),
      blob = new Blob([json], { type: 'application/json' }),
      url = window.URL.createObjectURL(blob);
    return url;
  }, [getProcessed]);

  const getTSVURL = useCallback(() => {
    return 'data:text/tsv;charset=utf-8,' + encodeURI(getProcessed.csv());
  }, [getProcessed]);

  return (
    <div className="processing-panel">
      <div className="processing-panel_content">
        <div>
          <div className="processing-panel_content_label">Tracks to add</div>
          <div className="processing-panel_content_quantity">{willProcessedQty}</div>
        </div>
        <DropdownButton
          as={ButtonGroup}
          drop="up"
          variant="outline-primary"
          title="Export as "
          className="processing-panel_margin-button"
        >
          <Dropdown.Item
            eventKey="1"
            download={'migfy-' + plData.name.replace(' ', '-') + '.json'}
            href={getJSONURL()}
          >
            .json
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            download={'migfy-' + plData.name.replace(' ', '-') + '.csv'}
            href={getTSVURL()}
          >
            .tsv
          </Dropdown.Item>
        </DropdownButton>
        <Button onClick={login} variant="primary" className="processing-panel_margin-button">
          Go To Spotify
        </Button>
        {/* <Button
          onClick={() => {
            fetch('/getMe');
          }}
          variant="primary"
          className="processing-panel_margin-button"
        >
          get me
        </Button>
        <Button
          onClick={() => {
            fetch('/getPl');
          }}
          variant="primary"
          className="processing-panel_margin-button"
        >
          get pl
        </Button> */}
      </div>
    </div>
  );
}

export default ProcessingPanel;
