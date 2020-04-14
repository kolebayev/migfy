import React, { useState } from "react";
import "./Welcome.css";

function Welcome({moveDataUpward}) {
  const [isValid, setInputValidity] = useState(true);
  const [plURL, setPlURL] = useState('')
  
  // const [serverError, setServerError] = useState(false);

  const sendPlLink = async url => {
    let response = await fetch("/parseAppleLink", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: url
    });
    if (response.ok) {
      let json = await response.json()
      console.log(json)
      moveDataUpward(json)
    } else {
      // set state error
      console.log("Ошибка HTTP: " + response.status);
    }
  };

  const plLinkValidation = inputURL => {
    const url = encodeURI(inputURL)
    setPlURL(url)
    if (
      url.includes('music.apple.com/') &&
      url.includes('/playlist/') &&
      url.includes('/pl')
    ) {
      sendPlLink(url)
    } else {
      setInputValidity(false)
    }
  }

  return (
    <div style={{marginTop: '50px'}}>
      <input
        style={{ borderColor: (!isValid) ? 'red' : 'black' }}
        placeholder = 'Paste Apple Music public playlist URL'
        onKeyDown = {e => {
          if (e.key === "Enter") {
            plLinkValidation(e.target.value);
          }
        }}
        onChange = {e => setPlURL(e.target.value)}
      ></input>
      <button onClick = {() => plLinkValidation(plURL)}>SEND</button>
      {/* <div>https://music.apple.com/ru/playlist/chill/pl.u-Ymb0vqqIPW9v30L</div> */}
      <div style={{marginTop: '50px'}}>https://music.apple.com/ru/playlist/%D1%80%D0%BE%D1%86%D0%BA/pl.u-PDb4zlBFL19qGpg</div>
    </div>
  );
}

export default Welcome;
