var express = require('express');
var router = express.Router();

var Song = require('../models/song');


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next) {
  var songs = global.currentUser.songs;
  res.render('songs/index', { songs: songs, message: req.flash() });
});

// NEW
router.get('/new', authenticate, function(req, res, next) {
  var song = {
    artist: '',
    album: '',
    title: ''

  };
  res.render('songs/new', { song: song } );
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var song = currentUser.songs.id(req.params.id);
  if (!song) return next(makeError(res, 'Document not found', 404));
  res.render('songs/show', { song: song, message: req.flash() } );


});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  var song = new Song({
    artist: req.body.artist,
    album: req.body.album,
    title: req.body.title
  });
  currentUser.songs.push(song);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/songs');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', function(req, res, next) {
  var song = currentUser.songs.id(req.params.id);
    if (!song) return next(makeError(res, 'Document not found', 404));
    res.render('songs/edit', { song: song, message: req.flash() });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var song = currentUser.songs.id(req.params.id);
    if (!song) return next(makeError(res, 'Document not found', 404));
      else {
        song.artist = req.body.artist,
        song.album = req.body.album,
        song.title = req.body.title
        currentUser.save()
      .then(function(saved) {
        res.redirect('/songs');
      }, function(err) {
        return next(err);
      });
   }
});


// DESTROY
router.delete('/:id', function(req, res, next) {
  var song = currentUser.songs.id(req.params.id);
    if (!song) return next(makeError(res, 'Document not found', 404));
     var index = currentUser.songs.indexOf(song);
      currentUser.songs.splice(index, 1);
      currentUser.save()
      .then(function(saved) {
      res.redirect('/songs');
      }, function(err) {
      return next(err);
  });
});

// SHARE
router.get('/:id/share', function(req, res, next) {
  var song = currentUser.songs.id(req.params.id);
    if (!song) return next(makeError(res, 'Document not found', 404));
    res.render('songs/share', { song: song, message: req.flash() });
});

module.exports = router;
