/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import SongPlayer from './SongPlayer';

function Tracks({ topTracks }) {
  return topTracks ? (
    <div className="topTracks">
      <ol>
        {topTracks.map((track, index) => (
          <li key={index}>
            <img className="albumImage" src={track.images} alt="album" />
            <br />
            <span>{track.trackName}</span>
            &nbsp;
            <span className="release-date">{track.date}</span>
            <span className="title-playOnSpotify">PLAY ON SPOTIFY</span>
            <span>
              <a href={track.links}>
                <img className="spotify-logo" src="assets/Spotify_Logo_RGB_White.png" alt="spotifylogo" />
              </a>
            </span>
            {track.preview ? (
              <figure>
                <SongPlayer src={track.preview} />
              </figure>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  ) : null;
}
export default Tracks;
