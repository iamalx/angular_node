const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request'); // deprecated 
const axios = require('axios'); // replace request

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);

app.get('/api/members', (req, res) => {
  // request('http://localhost:3000/members', (err, response, body) => {
  //   if (response.statusCode <= 500) {
  //     res.send(body);
  //   }
  // });
  axios.get('http://localhost:3000/members')
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.send(response.data);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  // request('http://localhost:3000/teams', (err, response, body) => {
  //   if (response.statusCode <= 500) {
  //     res.send(body);
  //   }
  // });
  axios.get('http://localhost:3000/teams')
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.send(response.data);

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
});

// Submit Form!
app.post('/api/addMember', (req, res) => {
  console.log(req.body, 'nono')
  axios.post('http://localhost:3000/members', req.body)
    .then(function (response) {
      console.log(response);
      res.status(201).json({message: 'Success'});
    })
    .catch(function (error) {
      console.log('error: ', error);
    });

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
