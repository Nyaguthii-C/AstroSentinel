// markersroutes.js
const express = require('express');
const router = express.Router();
const Marker = require('../models/markers'); // Import marker model
const limiter = require('./ratesLimit')


// Retrieve markers
router.get('/get-marker', async (req, res) => {
  try {
    const markers = await Marker.find();
    res.json(markers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// add markers to map, with rate limit
router.post('/add-marker', limiter, async (req, res) => {
    try {
        const { lat, lng, SQM_Reading, Bortle_Class, Reading_Day } = req.body;

        // Create a new marker instance
        const newMarker = new Marker({
            lat,
            lng,
            SQM_Reading,
            Bortle_Class,
            Reading_Day
        });

        // Save the marker data to your "markers" collection in MongoDB
        await newMarker.save();

        // Respond with a success message
        res.status(200).json({ message: 'Marker added successfully. Thank You for your Contribution!' });
    } catch (error) {
        console.error('Error during marker addition:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
