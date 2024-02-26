const express = require('express');
const router = express.Router();

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

// display map for adding  markers
router.get('/index', (req, res) => {
    res.render('index')
});


module.exports = router;
