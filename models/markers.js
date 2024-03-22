// ./models/marker.js for handling markers schema
const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    SQM_Reading: { type: String },
    Bortle_Class: { type: String },
    Reading_Day: {type: String, required: true }
});

const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;
