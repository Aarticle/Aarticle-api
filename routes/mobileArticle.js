const User = require('../models/user');
const Article = require('../models/article');

module.exports = (app) => {




  // CREATE ARTICLE
  app.post('/mob/article/post', (req, res) => {
    let newArticle = new Article(req.body);
    newArticle.username = req.user.username;
    newArticle.save((err,article) => {
       if(err) throw err;
       res.json(article);
     })
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
