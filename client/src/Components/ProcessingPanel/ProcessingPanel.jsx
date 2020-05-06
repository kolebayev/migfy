import React, { useCallback } from 'react';
import { Button, Dropdown, ButtonGroup, DropdownButton } from 'react-bootstrap';
import { useStoreState } from 'easy-peasy';
import './ProcessingPanel.scss';

function ProcessingPanel() {
  const plData = useStoreState((state) => state.playlist.data);
  const willProcessedQty = useStoreState((state) => state.playlist.service.willProcessedQty);

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
        <div>items to add {willProcessedQty}</div>
        <DropdownButton
          as={ButtonGroup}
          drop="up"
          variant="secondary"
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
        <Button variant="primary" className="processing-panel_margin-button">
          Go To Spotify
        </Button>
      </div>
    </div>
  );
}

export default ProcessingPanel;
