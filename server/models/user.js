var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  recruiterName: String,
  email: String,
  companyName: String,
  companyCity: String,
  companyState: String,
  recruiterHobbies: []
});

var User = mongoose.model('User', UserSchema );

module.exports = User;