var router = require('express').Router(); 
var User = require('../models/user');
var passport = require('passport');
var passportConfig = require('../config/passport');  


//entry points (create-user)
router.post('/signup', function (req, res, next) {
    var user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    User.findOne({email: req.body.email}, function(err, exts){
        if(exts){
            req.flash('errors', 'this email is already in use'); 
            console.log(exts); 
            console.log('this email is already in use'); 
            return res.redirect('/signup'); 
        }else {
            user.save(function(err, user){
                if(err) return next(err); 

                res.redirect('/'); 
            }); 
        }
    }); 
});

//entry points (login-user)
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', 
    failureRedirect: '/login', 
    failureFlash: true
})); 

router.get('/signup', function(req, res, next){
    res.render('accounts/signup.ejs', {
        errors: req.flash('errors') 
    }); 
}); 

module.exports = router;    