const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
location:{ type: string}
})


module.exports = mongoose.model('Card', cardSchema);