var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  album: { type: String, required: true },
  title: { type: String, required: true },
 // albumCover: { type: String, required: false }
});

module.exports = mongoose.model('Song', SongSchema);
