require('dotenv').config();

const User = require('../models/user');
const jwt = require('jsonwebtoken');

// var Recaptcha = require('express-recaptcha');
// //import Recaptcha from 'express-recaptcha'
// var recaptcha = new Recaptcha('6LciD0EUAAAAAMSM4b2xRawGOzSD0ke7mlaY-ZpQ', '6LciD0EUAAAAAH4H4CCH0EwKcfbDlQPdMUQe0SFO');


module.exports = (app) => {

  // SIGN UP FORM
  app.get('/sign-up',  (req, res) => {
    res.render('auth/sign-up.handlebars');
  });

  // SIGN UP POST
  app.post('/sign-up/', (req, res) => {
      // Create User and JWT
      // const user = new User(req.body);

          User.findOne({
              username: req.body.username
          }, 'username password').then((user) => {
              console.log(user);

              if (user) {
                  // Username taken
                  return res.render('auth/sign-up0.handlebars');

              }
                  // make a user with username and Password
                  let userData = {...req.body}
                  let newUser = new User(userData)
                  newUser.save().then((user) => {
                    var token = jwt.sign({
                         _id: user._id
                     }, process.env.SECRET, {
                         expiresIn: "60 days"
                     });
                     res.cookie('nToken', token, {
                         maxAge: 9000000,
                         httpOnly: true
                     });
                     res.send(token);
                  }).catch((err) => {
                      console.log(err.message);
                      return res.status(400).send({
                          err: err
                      });
                  });
              })
          });

  // LOGOUT
  app.get('/logout', (req, res) => {
    res.clearCookie('nToken');

    res.redirect('/');
  });

  // LOGIN FORM
  app.get('/login', (req, res) => {
    var currentUser = req.user;
    res.render('auth/login.handlebars', { currentUser });
  });

  // LOGIN
  app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Find this user name
    User.findOne({ username }, 'username password').then((user) => {

      if (!user) {
        // User not found

        return res.render('auth/login0.handlebars');
        res.send(user)
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.render('auth/login0.handlebars');
        }
        // Create a token

        // const obj = { ...user } // ???

        const token = jwt.sign(
          { _id: user._id,
            username: user.username,
            admin: user.admin,
            banned: user.banned,
          }, process.env.SECRET);
        //  { expiresIn: "60 days" }
        if (user.banned) {
          res.redirect('/logout');
        }
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 90000000000, httpOnly: true });
        res.redirect('/');
      });
    }).catch((err) => {
      console.log(err);
    });
  });



} //module.exports
