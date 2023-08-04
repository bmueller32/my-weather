const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
location:{ type: String}

})


module.exports = mongoose.model('City', citySchema);