var mongoose = require('mongoose');
var Song = require('./models/song');

mongoose.connect('mongodb://localhost/songs');

    // our script will not exit until we have disconnected from the db.
    function quit() {
      mongoose.disconnect();
      console.log('\nQuitting!');
    }

    // a simple error handler
    function handleError(err) {
      console.log('ERROR:', err);
      quit();
      return err;
    }

    console.log('removing old Songs...');
    Song.remove({})
    .then(function() {
      console.log('old Songs removed');
      console.log('creating some new Songs...');
      var mj  = new Song({ artist: 'Michael Jackson', album: 'Thriller', title: 'Thriller' });
      var adele = new Song({ artist: 'Adele Atkins', album: '21', title: 'Rolling in the Deep' });
       var test  = new Song({ artist: 'Test Tester', album: 'The Test', title: 'Tested' });

      return Song.create([mj, adele, test]);
    })
    .then(function(savedSongs) {
      console.log('Just saved', savedSongs.length, 'Songs.');
      return Song.find({});
    })
    .then(function(allSongs) {
      console.log('Printing all Songs:');
      allSongs.forEach(function(song) {
        console.log(song);
      });
      return Song.findOne({artist: 'Test Tester'});
    })
    .then(function(test) {
      test.album = 'The Next Test';
      return test.save();
    })
    .then(function(test) {
      console.log('updated test:', test);
      return test.remove();
    })
    .then(function(deleted) {
      return Song.find({});
    })
    .then(function(allSongs) {
      console.log('Printing all Songs:');
      allSongs.forEach(function(song) {
        console.log(song);
      });
      quit();
    });
