require('dotenv').config();

const User = require('../models/user');
const jwt = require('jsonwebtoken');

// var Recaptcha = require('express-recaptcha');
// //import Recaptcha from 'express-recaptcha'
// var recaptcha = new Recaptcha('6LciD0EUAAAAAMSM4b2xRawGOzSD0ke7mlaY-ZpQ', '6LciD0EUAAAAAH4H4CCH0EwKcfbDlQPdMUQe0SFO');


module.exports = (app) => {


  // SIGN UP POST
  app.post('/mob/sign-up/', (req, res) => {
      // Create User and JWT
      // const user = new User(req.body);

          User.findOne({
              username: req.body.username
          }, 'username password').then((user) => {
              console.log(user);

              if (user) {
                  // Username taken
                  return res.send('username taken');

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
                     // res.redirect('/');
                    res.json(user)
                     //console.log(newUser)
                  }).catch((err) => {
                      console.log(err.message);
                      return res.status(400).send({
                          err: err
                      }).then((res) => {
                        res.json(newUser)
                      })
                  });
              })
          });


  // LOGIN
  app.post('/mob/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Find this user name
    User.findOne({ username }, 'username password').then((user) => {

      if (!user) {
        // User not found

        return res.send('wrong user or password');
        res.send(user)
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.send('wrong user or password');
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
        res.json(user);
      });
    }).catch((err) => {
      console.log(err);
    });
  });



} //module.exports
