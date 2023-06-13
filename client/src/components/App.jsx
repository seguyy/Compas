/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import Tracks from './Tracks';

export default function App() {
  const [artist, setArtist] = useState('');
  const [topTracks, setTopTracks] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setArtist(event.target.value);
  };

  const searchArtist = (event) => {
    event.preventDefault();
    if (searched) {
      setTopTracks([]);
    } else {
      setSearched(true);
    }
    axios.get('/artist', { params: { name: artist } }).then((response) => {
      setTopTracks(response.data);
    }).catch((err) => {
      console.log('There was a problem in the server when searching:', err);
    });
    setArtist('');
  };

  return (
    <div id="App">
      <form>
        <div>
          <label htmlFor="msg">Enter Artist Name</label>
        </div>
        <textarea id="artist" value={artist} name="artist" onChange={handleChange} />
        <div>
          <button className="search-button" type="submit" onClick={searchArtist}>Submit</button>
        </div>
      </form>
      {
      topTracks.length > 0 ? (
        <Tracks topTracks={topTracks} />
      ) : null
      }
    </div>
  );
}
