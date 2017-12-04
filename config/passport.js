var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;  
var User = require('../models/user'); 

passport.serializeUser(function(user , done){
    done(null, user._id); 
});

passport.deserializeUser(function(user, done){
    User.finById(function(err, user){
        done(err, user); 
    }); 
}); 

passport.use('local-login', new LocalStrategy({
        userEmailField : 'email', 
        passwordField : 'password', 
        passReqToCallback   : true
        }, function(req, email, password, done){
            User.findOne({email: email}, function(err , user){
                if(err) return done(err);
                
                if(!user){
                    done(null, false, req.flash('loginMessage', 'no one user can be found '));
                }

                if (!user.comparePassword(password)){
                    return done(null, false, req.flash('loginMessage', 'incorrect password')); 
                }

                return done(null, user); 
            }); 
        })); 
            


exports.isAuthenticated = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
         
    }else{
        res.redirect('/login'); 
        
    }
}