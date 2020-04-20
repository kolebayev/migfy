import React, {useState} from "react";
import { ListGroup, Button } from "react-bootstrap";
import "./PlayListItem.scss";

function PlayListItem({
  name,
  key,
  artist,
  artworkLink,
  wasFound,
  willProcessed,
}) {
  // const [onHover, setHover] = useState(false)

  const disabled = () => {
    if (willProcessed === false) {
      return { opacity: "0.3" };
    } else {
      return { opacity: "1" };
    }
  };

  return (
    <ListGroup.Item key={key}>
      <div className="playlist-item" >
        <div style={disabled()} className="playlist-item">
          {artworkLink.length !== 0 ? (
            <img
              className="playlist-item_artwork"
              src={artworkLink}
              alt={"img" + key}
            ></img>
          ) : (
            <div className="playlist-item_artwork">
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="35" height="35" rx="4" fill="#F2F2F2" />
                <path
                  d="M15.5 24.6986C17.9029 24.6986 19.8579 22.7437 19.8579 20.3407C19.8579 19.6266 19.8579 14.5536 19.8579 13.9052L22.1583 15.0554C22.8683 15.4103 23.7317 15.1226 24.0868 14.4126C24.4419 13.7025 24.1541 12.8391 23.444 12.484L19.0633 10.2937C18.1092 9.8168 16.983 10.5111 16.983 11.5793V15.9829H15.4999C13.097 15.9829 11.1421 17.9379 11.1421 20.3407C11.1421 22.7437 13.097 24.6986 15.5 24.6986V24.6986ZM15.5 18.8577H16.9831V20.3407C16.9831 21.1585 16.3177 21.8238 15.5 21.8238C14.6822 21.8238 14.0169 21.1585 14.0169 20.3407C14.0169 19.5231 14.6822 18.8577 15.5 18.8577V18.8577Z"
                  fill="#BFBFBF"
                />
              </svg>
            </div>
          )}

          <div className="playlist-item_data-wrapper">
            <div className="playlist-item_name">{name}</div>
            <div className="playlist-item_artist">{artist}</div>
          </div>
        </div>

 
            <Button variant="light">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
            <path d="M6.6627 6.00075L11.8625 0.800963C12.0455 0.617893 12.0455 0.321081 11.8625 0.138035C11.6794 -0.0450116 11.3826 -0.0450351 11.1995 0.138035L5.99975 5.33782L0.799987 0.138035C0.616917 -0.0450351 0.320105 -0.0450351 0.137058 0.138035C-0.0459882 0.321105 -0.0460116 0.617917 0.137058 0.800963L5.33682 6.00073L0.137058 11.2005C-0.0460116 11.3836 -0.0460116 11.6804 0.137058 11.8634C0.180542 11.907 0.232211 11.9416 0.289097 11.9652C0.345983 11.9887 0.406963 12.0008 0.468534 12.0007C0.530105 12.0008 0.591084 11.9887 0.64797 11.9652C0.704855 11.9416 0.756525 11.907 0.80001 11.8634L5.99975 6.66368L11.1995 11.8634C11.291 11.955 11.411 12.0007 11.531 12.0007C11.651 12.0007 11.7709 11.955 11.8625 11.8634C12.0455 11.6804 12.0455 11.3836 11.8625 11.2005L6.6627 6.00075Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0">
            <rect width="12" height="12" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </Button>


      </div>
    </ListGroup.Item>
  );
}

export default PlayListItem;
