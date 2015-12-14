var mongoose = require('mongoose');

var SensorReadingSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    readingdatetime: { type: Date, required: true },
    open: { type: Boolean, required: true }
});

mongoose.model('SensorReading', SensorReadingSchema);

// var SensorReading = mongoose.model('SensorReading', SensorReadingSchema);
// 
// module.exports = SensorReading;