const express = require('express');
const app = express();
const User = require('../models/user');




module.exports = (app) => {

  //ROOT INDEX (This will show all approved coords)
  app.get('/', (req, res) => {

    if (req.user) {
      User.findById(req.user._id, (err, user) => {
          res.render('root.handlebars', {currentUser: user});
        })
    } else {
        res.render('root.handlebars');
        }
      })




}//modules.exports