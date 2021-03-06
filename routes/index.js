var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){
	
	/* GET login page. */
	router.get('/', function(req, res) {
		// Show the coming soon page
		res.render('coming_soon', { });
	});
	
	router.get('/dev', function(req, res) {
		// Display the Login page with any flash message, if any	
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/my_account',
		failureRedirect: '/dev',
		failureFlash : true 
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/my_account',
		failureRedirect: '/signup',
		failureFlash : true 
	}));

	/* GET Account Page */
	router.get('/my_account', isAuthenticated, function(req, res){
		res.render('my_account', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/dev');
	});
	
	return router;
}
