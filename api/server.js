const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const app = express();
const session = require('express-session');
const puppeteerFunction = require('./controllers/formdataHandler');

const port = process.env.PORT || 5500;

// ************ MIDDLEWARE ************ //

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use(
  session({
    secret: process.env.SUPER_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 }, // expires after 1 hour
  })
);

// ************ ROUTES ************ //

app.get('/', (req, res) => {
  res.redirect('./login');
});

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.post('/login', (req, res) => {
  if (req.body.password == process.env.USER_PASSWORD) {
    req.session.isLoggedIn = true;
    res.redirect('/home');
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/home', (req, res) => {
  if (req.session.isLoggedIn === true) {
    res.sendFile(path.join(__dirname, '../public/home.html'));
  } else {
    res.redirect('/login');
  }
});

app.post('/water-stats', (req, res) => {
  const { hot, cold } = req.body;
  res.send(JSON.stringify('Got a POST request at /api/water-stats'));
  puppeteerFunction(hot, cold);
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
