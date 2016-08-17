var mongoose = require('mongoose');
var User = require('./user');

var FriendsSchema = new mongoose.Schema({
    friends : [User.schema]
});

module.exports = mongoose.model('Friends', FriendsSchema);
