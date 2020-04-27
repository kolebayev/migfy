import React, { useState, useCallback } from "react";
import "./Welcome.scss";
import {
  Button,
  Spinner,
  InputGroup,
  FormControl,
  Card,
} from "react-bootstrap";
import ServerResponseToast from '../ServerResponseToast/ServerResponseToast'
import { useStoreActions, useStoreState, action } from 'easy-peasy';

function Welcome({ moveDataUpward }) {
  const [isValid, setInputValidity] = useState(true);
  const [plURL, setPlURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // const products = useStoreState(state => state.products.items);

  // const useRes = () => useStoreActions(actions => actions.fetchPlURL)
  const thunkCheck = useStoreActions(actions => actions.playlist.fetchPlURL)
  const check = useCallback(
    () => thunkCheck('https://music.apple.com/ru/playlist/chill/pl.u-Ymb0vqqIPW9v30L')
  )

  // const sendPlLink = async url => {
  //   setIsLoading(true);
  //   let response = await fetch("/parseApplePlaylistLink", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "text/plain;charset=utf-8",
  //     },
  //     body: url,
  //   });
  //   if (response.ok) {
  //     let json = await response.json();
  //     console.log(json);
  //     // useRes(json)
  //     moveDataUpward(json);
  //   } else {
  //     setServerError(response.status);
  //     console.log("Ошибка HTTP: " + response.status);
  //     setIsLoading(false)
  //   }
  // };

  const plLinkValidation = (inputURL) => {
    const url = encodeURI(inputURL);
    setPlURL(url);
    if (
      url.includes("music.apple.com/") &&
      url.includes("/playlist/") &&
      url.includes("/pl")
    ) {
      // sendPlLink(url);
      // useRes(url)
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
      {' '}

    
      <Button
        variant="primary"
        onClick={check}
        style={{ width: "100px" }}
      >
        {!isLoading ? (
          "CHILL"
        ) : (
          <Spinner animation="border" variant="light" size="sm" />
        )}
      </Button>


      {/* <div>
        <p>try one of the following</p>
        <div style={{ display: "flex" }}>
          {[1, 2, 3].map((el, i) => {
            return (
              <Card key={i} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="https://is2-ssl.mzstatic.com/image/thumb/Features118/v4/6a/f5/d3/6af5d3be-38a9-77e7-9bfa-bf19a535cd3b/source/268x268cc.jpg"
                />
                <Card.Body>
                  <Card.Title>Card Title {el}</Card.Title>
                  <Card.Text>Some quick example</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div> */}

      {serverError && (
        <ServerResponseToast serverError={serverError} close={(str) => setServerError(str)}/>
      )}

      
    </div>
  );
}

export default Welcome;
