var express = require('express');

var router = express.Router();

 

/* READ, UPDATE, DELETE users */

router.get('/', function(req, res) {

  res.send('Show user list with delete and update feature (RUD)');

});

 

/* INSERT user */

router.get('/insert_user', function(req, res) {

      res.send("Insert a new user (C)");

});

 

/* NEW user */

router.get('/new', function(req, res) {

      res.render('user-new');

});

/* INSERT user */

router.post('insert_user', function(req, res) {

      // Get the only one db instance in our app

      var db = req.db;

 

      // Get POST values, It's easy

      var userName = req.body.name;

      var userEmail = req.body.email;

      console.log('POST VALUES: ' + userName + ' ' + userEmail);

     

      // Fetch from 'users' collection

      var userCollection = db.get("users");

      userCollection.insert({

            'username' : userName,

            'email' : userEmail

      }, function(err, doc) {

            if(err) res.send('Problem occured when inserting in users collection');

            else {

                  console.log("Inserted");

                  res.location('users');

                  res.redirect('/users');

            }

      });

});

/* NEW user */

router.get('/new', function(req, res) {

      res.render('user-new');

});

/* READ, UPDATE, DELETE users */

router.get('/', function(req, res) {

      // Get the only one db instance in our app

      var db = req.db;

      // Fetch from 'users' collection

      var userCollection = db.get("users");

      userCollection.find({}, {}, function(e, docs) {

            res.render('user-list', {'userlist' : docs});

      });

});

 

module.exports = router;