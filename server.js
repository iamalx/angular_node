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
  axios.get('http://localhost:3000/members')
    .then(response => res.status(200).send(response.data))
    .catch(error => {
      console.log(error);
    })
});

// TODO: Dropdown!
app.get('/api/teams', (req, res) => {
  axios.get('http://localhost:3000/teams')
    .then(response => res.status(200).send(response.data))
    .catch(error => {
      console.log(error);
    })
});

// Submit Form!
app.post('/api/addMember', (req, res) => {
  axios.post('http://localhost:3000/members', req.body)
    .then(response => res.status(200).json({message: 'Success'}))
    .catch(error => {
      console.log('error: ', error);
    });

});

app.delete('/api/deleteMember/:memberId', (req, res) => {
  const id = req.params.memberId;
  axios.delete(`http://localhost:3000/members/${id}`)
    .then(response => res.status(200).json({message: 'Member Deleted Successfully', id}))
    .catch(error => {
      console.log('error: ', error);
    });
})

app.put('/api/editMember/:memberId', (req, res) => {
  const id = req.params.memberId;
  axios.put(`http://localhost:3000/members/${id}`, req.body)
    .then(response => res.status(200).json({message: 'Member Edited Successfully', id}))
    .catch(error => {
      console.log('error: ', error);
    });
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', _ => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
