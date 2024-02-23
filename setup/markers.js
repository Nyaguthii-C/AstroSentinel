// marker.js for handling markers schema
const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    statement: { type: String, required: true },
});

const Marker = mongoose.model('Marker', markerSchema);

module.exports = Marker;
