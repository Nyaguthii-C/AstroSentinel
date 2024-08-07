const express = require('express');
const router = express.Router();
const limiter = require('./ratesLimit');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');


// display landing page
router.get('/', (req, res) => {
    res.render('landing')
});

//display map with the added markers
router.get('/map', (req, res) => {
    res.render('map')
});

// display measurements guide
router.get('/guide', (req, res) => {
   res.render('guide')
});

// display map for adding  markers with rate limit, (requires authentication)
router.get('/index', authenticationMiddleware, limiter, (req, res) => {
    res.render('index')
});

// display about  page
router.get('/about', (req, res) => {
    res.render('about')
});

// display measurements logging guide
router.get('/measurement', (req, res) => {
    res.render('measurement')
});

//display light pollution information
router.get('/light-pollution', (req, res) => {
    res.render('lightPollution')
});


module.exports = router;
