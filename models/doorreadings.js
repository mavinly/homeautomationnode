var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var sensorReadingSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    readingdatetime: { type: Date, required: true },
    open: { type: Boolean, required: true }
});

var SensorReading = mongoose.model('SensorReading', sensorReadingSchema);

module.exports = SensorReading;