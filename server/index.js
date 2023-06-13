require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const router = require('./spotifyApi');

const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.use(express.static(path.join(__dirname, '../client/dist')));

const PORT = process.env.PORT || 5678;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});
