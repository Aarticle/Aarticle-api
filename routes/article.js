const User = require('../models/user');
const Article = require('../models/article');

module.exports = (app) => {

  // CREATE ARTICLE
  app.post('/articals/:id/post', (req, res) => {
    let newArticle = new Article(req.body);
    newArticle.username = req.user.username;
    newArticle.ip = req.connection.remoteAddress;
    newArticle.save((err,article) => {
       if(err) throw err;
       res.redirect('back');
     })
   })



//   // SHOW REPORT PAGE
//   app.get('/article/:id', (req, res) => {
//
//     const findPerson = req.params.id;
//
//
//     let currentUser;
//     if (req.user) {
//         User.findById(req.user._id, (err, user) => {
//       Report.find({student : req.params.id}).then((reports) => {
//         res.render('reports-show', {findPerson, reports: reports, currentUser: user});
//        })
//      })
//      } else {
//        res.redirect('back')
//      }
//  })
//
//
//
// // DELETE REPORT
// app.delete('/reports/:id', function (req, res) {
//   console.log("DELETE report")
//   Report.findByIdAndRemove(req.body.reportId).then((report) => {
//     res.redirect('back');
//   }).catch((err) => {
//     // ???
//     console.log(err.message);
//   })
// })
//
// // DELETE ASSIGNMENT
// app.delete('/assignments/:id', function (req, res) {
//   console.log("DELETE assignment")
//   Assignment.findByIdAndRemove(req.body.assignmentId).then((assignment) => {
//     res.redirect('back');
//   }).catch((err) => {
//     // ???
//     console.log(err.message);
//   })
// })
//


} //modules.exports
