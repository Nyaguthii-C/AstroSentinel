const express = require('express');
const router = express.Router();
const limiter = require('./ratesLimit')


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

// display map for adding  markers with rate limit
router.get('/index', limiter, (req, res) => {
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



module.exports = router;
