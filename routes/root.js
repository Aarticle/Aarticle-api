const express = require('express');
const app = express();
const User = require('../models/user');
const Article = require('../models/article');



module.exports = (app) => {

  //ROOT INDEX (This will show all approved coords)
  app.get('/', (req, res) => {

    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        Article.find({}).then((article) => {
          res.render('root.handlebars', {currentUser: user, article});

        })
        })
    } else {
        res.render('root.handlebars');
        }
      })


      app.get('/page2', (req, res) => {

        if (req.user) {
          User.findById(req.user._id, (err, user) => {
              res.render('page2.handlebars', {currentUser: user});
            })
        } else {
            res.render('page2.handlebars');
            }
          })




}//modules.exports
