var router = require('express').Router(); 

router.get('/', function (req, res) {
    res.render('main/home.ejs');
});
router.get('/home', function(req, res){
    res.json('home'); 
});

router.get('/about', function(req, res){
    res.render('main/about.ejs'); 
}); 
router.get('/contact', function(req, res){
    res.render('main/contact.ejs'); 
}); 

router.get('/login', function(req, res){
    if(req.user) return res.redirect('/'); 
    res.render('main/login.ejs', {message: req.flash('loginMessage')}); 
}); 

router.get('/profile', function(req, res){
    res.json(user); 
    res.render('accounts/profile.ejs'); 
}); 

module.exports = router;     