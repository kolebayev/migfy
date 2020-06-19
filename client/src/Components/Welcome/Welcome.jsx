import React, { useState, useCallback } from 'react';
import './Welcome.scss';
import { Button, Spinner, FormControl } from 'react-bootstrap';
import ServerResponseToast from '../ServerResponseToast/ServerResponseToast';
import { useStoreActions, useStoreState } from 'easy-peasy';
import ArrowRight from '../Icons/ArrowRight';

function Welcome() {
  const [isValid, setInputValidity] = useState(true);
  const [plURL, setPlURL] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const fetchPlURL = useStoreActions((actions) => actions.playlist.fetchPlURL);
  const doFetchPlURL = useCallback(() => fetchPlURL(plURL), [fetchPlURL, plURL]);

  const isLoading = useStoreState((state) => state.playlist.service.isLoading);
  const setIsLoading = useStoreActions((actions) => actions.playlist.setIsLoading);

  const serverError = useStoreState((state) => state.playlist.service.serverError);
  const removeServerError = useStoreActions((actions) => actions.playlist.removeServerError);
  const doRemoveServerError = useCallback(() => removeServerError(), [removeServerError]);

  const plLinkValidation = (inputURL) => {
    const url = encodeURI(inputURL);
    setPlURL(url);
    if (url.includes('music.apple.com/') && url.includes('/playlist/') && url.includes('/pl')) {
      setIsLoading(true);
      doFetchPlURL(url);
    } else {
      setInputValidity(false);
    }
  };

  return (
    <div className="welcome">
      <div className="welcome_content">
        <ArrowRight fill={inputFocus ? 'rgb(0, 105, 217)' : 'grey'} />
        <FormControl
          className="welcome_input"
          placeholder="Paste Apple Music public playlist URL"
          aria-label="Playlist URL"
          aria-describedby="basic-addon1"
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          style={{
            backgroundColor: !isValid && 'rgba(255, 0, 0, .1)',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              plLinkValidation(e.target.value);
            }
          }}
          onChange={(e) => setPlURL(e.target.value)}
        />

        <Button
          variant="primary"
          onClick={() => plLinkValidation(plURL)}
          style={{ width: '100px' }}
        >
          {!isLoading ? 'Parse link' : <Spinner animation="border" variant="light" size="sm" />}
        </Button>

        {serverError && (
          <ServerResponseToast serverError={serverError} close={doRemoveServerError} />
        )}
      </div>
    </div>
  );
}

export default Welcome;
