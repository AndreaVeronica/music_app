var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Song = require('./song');
var Friends = require('./friends');

var UserSchema = new mongoose.Schema({
  local : {
    email    : String,
    password : String
  },
  songs : [Song.schema]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
