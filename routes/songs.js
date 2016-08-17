var express = require('express');
var router = express.Router();

var Song = require('../models/song');


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}


// INDEX
router.get('/', function(req, res, next) {
  // get all the songs and render the index view
  Song.find({})
  .then(function(songs) {
    res.render('songs/index', { songs: songs } );
  }, function(err) {
    return next(err);
  });
});

// NEW
router.get('/new', function(req, res, next) {
  var song = {
    artist: '',
    album: '',
    title: ''

  };
  res.render('songs/new', { song: song } );
});

// SHOW
router.get('/:id', function(req, res, next) {
  Song.findById(req.params.id)
  .then(function(song) {
    if (!song) return next(makeError(res, 'Document not found', 404));
    res.render('songs/show', { song: song });
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', function(req, res, next) {
  var song = new Song({
    artist: req.body.artist,
    album: req.body.album,
    title: req.body.title
  });
  song.save()
  .then(function(saved) {
    res.redirect('/songs');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
  Song.findById(req.params.id)
  .then(function(song) {
    if (!song) return next(makeError(res, 'Document not found', 404));
    res.render('songs/edit', { song: song });
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', function(req, res, next) {
  Song.findById(req.params.id)
  .then(function(song) {
    if (!song) return next(makeError(res, 'Document not found', 404));
    song.artist = req.body.artist,
    song.album = req.body.album,
    song.title = req.body.title
    return song.save();
  })
  .then(function(saved) {
    res.redirect('/songs');
  }, function(err) {
    return next(err);
  });
});


// DESTROY
router.delete('/:id', function(req, res, next) {
  Song.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/songs');
  }, function(err) {
    return next(err);
  });
});



module.exports = router;
