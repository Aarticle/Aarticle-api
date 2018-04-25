const User = require('../models/user');
const Article = require('../models/article');

module.exports = (app) => {

  //CREATE ARTICLE PAGE
  app.get('/new-article', (req, res) => {

    if (req.user) {
      User.findById(req.user._id, (err, user) => {
          res.render('create-article.handlebars', {currentUser: user});
        })
    } else {
        res.render('create-article.handlebars');
        }
      })



  // CREATE ARTICLE
  app.post('/article/post', (req, res) => {
    let newArticle = new Article(req.body);
    // newArticle.username = req.user.username;
    newArticle.save((err,article) => {
       if(err) throw err;
       res.redirect('/article/' + article._id);
     })
   })



  // SHOW ARTICLE PAGE
  app.get('/article/:id', (req, res) => {

    let currentUser;
    if (req.user) {
        User.findById(req.user._id, (err, user) => {
        Article.findById(req.params.id).then((article) => {
        res.render('article-show', {article, currentUser: user});
       })
     })
     } else {
       Article.findById(req.params.id).then((article) => {
       res.render('article-show', {article});
     })
     }
 })



// DELETE ARTICLE
app.delete('/article/:id', function (req, res) {
  console.log("DELETE article")
  Article.findByIdAndRemove(req.body.articleId).then((article) => {
    res.redirect('back');
  }).catch((err) => {
    console.log(err.message);
  })
})




} //modules.exports
