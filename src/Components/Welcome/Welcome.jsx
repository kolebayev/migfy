import React, { useState, useCallback } from "react";
import "./Welcome.scss";
import {
  Button,
  Spinner,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import ServerResponseToast from "../ServerResponseToast/ServerResponseToast";
import { useStoreActions, useStoreState } from "easy-peasy";

function Welcome() {
  const [isValid, setInputValidity] = useState(true);
  const [plURL, setPlURL] = useState("");

  const fetchPlURL = useStoreActions((actions) => actions.playlist.fetchPlURL);
  const doFetchPlURL = useCallback(() => fetchPlURL(plURL), [fetchPlURL, plURL]);
  
  const isLoading = useStoreState(state => state.playlist.service.isLoading);
  const setIsLoading = useStoreActions(actions => actions.playlist.setIsLoading)
  
  const serverError = useStoreState(state => state.playlist.service.serverError);
  const removeServerError = useStoreActions((actions) => actions.playlist.removeServerError);
  const doRemoveServerError = useCallback(() => removeServerError(), [removeServerError]);

  const plLinkValidation = inputURL => {
    const url = encodeURI(inputURL);
    setPlURL(url);
    if (
      url.includes("music.apple.com/") &&
      url.includes("/playlist/") &&
      url.includes("/pl")
    ) {
      setIsLoading(true)
      doFetchPlURL(url)
    } else {
      setInputValidity(false);
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Paste Apple Music public playlist URL"
          aria-label="Playlist URL"
          aria-describedby="basic-addon1"
          style={{
            borderColor: !isValid && "var(--danger)",
            boxShadow: !isValid && "0 0 0 .2rem rgba(220, 53, 69,.25)",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              plLinkValidation(e.target.value);
            }
          }}
          onChange={(e) => setPlURL(e.target.value)}
        />
      </InputGroup>

      <Button
        variant="primary"
        onClick={() => plLinkValidation(plURL)}
        style={{ width: "100px" }}
      >
        {!isLoading ? (
          "Parse link"
        ) : (
          <Spinner animation="border" variant="light" size="sm" />
        )}
      </Button>

      {serverError && (
        <ServerResponseToast
          serverError={serverError}
          close={doRemoveServerError}
        />
      )}
    </div>
  );
}

export default Welcome;
