/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const router = require('express').Router();
const cors = require('cors');

router.use(cors());
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('path', path.resolve(__dirname, '../.env'));

router.use(express.json());
const SpotifyWebApi = require('spotify-web-api-node');

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

spotifyApi.clientCredentialsGrant().then((data) => {
  spotifyApi.setAccessToken(data.body.access_token);
}).catch((err) => {
  console.log('Something went wrong when retrieving an access token', err);
});

router.get('/artist', async (req, res) => {
  const topTracks = [];
  if (req.query.name.length > 0) {
    const data = await spotifyApi.searchArtists(req.query.name, { limit: 5, offset: 0 });
    const topTrackData = await spotifyApi.getArtistTopTracks(data.body.artists.items[0].id, 'US');
    for (const track of topTrackData.body.tracks) {
      let trackObj = {};
      trackObj = {
        trackName: track.name,
        date: track.album.release_date,
        images: track.album.images[1].url,
        links: track.external_urls.spotify,
        preview: track.preview_url,
      };
      topTracks.push(trackObj);
    }
    res.json(topTracks);
  }
});

module.exports = router;
