var User = require('../models/user');

exports.list = function list(request, response) {
    return User.find({}).then((users) => {
        return response.json({users})
    })
   }

exports.create =  function create(request, response) {
    let {recruiterName, email, companyName, companyCity, companyState, recruiterHobbies} = request.body;
    var newUser = new User({recruiterName, email, companyName, companyCity, companyState, recruiterHobbies});
    return newUser.save((err) => {
        if(err) response.json({success: false});
        return response.json({success: true});
    })
   }

   