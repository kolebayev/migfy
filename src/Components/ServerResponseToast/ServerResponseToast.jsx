import React from "react";
import { Toast } from "react-bootstrap";

function Welcome({ doRemoveServerError, serverError }) {
  return (
    <Toast
      style={{
        position: "absolute",
        bottom: 0,
        center: 0,
      }}
      onClose={doRemoveServerError}
      animation={true}
    >
      <Toast.Header>
        {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
        <strong className="mr-auto" style={{color: 'var(--danger)'}}>Parsing error</strong>
        {/* <small>just now</small> */}
      </Toast.Header>
      <Toast.Body>"Ошибка HTTP: " {serverError}</Toast.Body>
    </Toast>
  );
}

export default Welcome;
