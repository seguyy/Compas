/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-undef */
import React, { useRef, useState } from 'react';

function SongPlayer({ src }) {
  const audioRef = useRef(null);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isPlayerActive, setIsPlayerActive] = useState(false);

  const handlePause = () => {
    setShowPlayButton(!showPlayButton);
    if (isPlayerActive) {
      audioRef.current.pause();
      setIsPlayerActive(false);
    }
  };

  const handlePlay = () => {
    if (isPlayerActive) {
      console.log(isPlayerActive);
      audioRef.current.pause();
    }
    setIsPlayerActive(true);
    setShowPlayButton(!showPlayButton);
    if (isPlayerActive === false) {
      audioRef.current.play();
    }
  };

  return (
    <div className="playButton-container">
      <audio ref={audioRef}>
        <source src={src} type="audio/mpeg" />
      </audio>
      {showPlayButton ? (
        <button
          type="button"
          className="play-button"
          // disabled={isPlayerActive}
          onClick={() => {
            handlePlay();
          }}
        >
          <svg
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            className="play-icon"
            style={{
              pointerEvents: 'none',
              display: 'block',
              width: '100%',
              height: '100%',
            }}
          >
            <g className="style-icon"><path d="M6,4l12,8L6,20V4z" className="icon" /></g>
          </svg>
        </button>
      ) : (
        <button className="pause-button" onClick={() => handlePause()} type="button">
          <svg
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
            className="style-icon"
            style={{
              pointerEvents: 'none',
              display: 'block',
              width: '100%',
              height: '100%',
            }}
          >
            <g height="24" viewBox="0 0 24 24" width="24" className="style-scope icon"><path d="M9,19H7V5H9ZM17,5H15V19h2Z" className="style-icon" /></g>
          </svg>
        </button>
      ) }
    </div>

  );
}

export default SongPlayer;
