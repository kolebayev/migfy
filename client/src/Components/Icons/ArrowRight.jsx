import React from 'react';

function ArrowRight(props) {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="38" height="38" fill="white" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19 9L17.565 10.393L25.172 18H9V20H25.172L17.586 27.586L19 29C22.661 25.339 25.496 22.504 29 19C25.034 15.034 27.834 17.834 19 9"
        fill={props.fill}
      />
    </svg>
  );
}

export default ArrowRight;
