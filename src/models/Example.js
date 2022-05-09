const mongoose = require('mongoose');

const ExampleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    url: String,
});

module.exports = mongoose.model('Example', ExampleSchema);
