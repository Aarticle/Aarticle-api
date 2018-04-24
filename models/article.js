const mongoose = require('mongoose');
const Schema = mongoose.Schema


const articleSchema = mongoose.Schema({
  title: String,
  content: String,
  imageurl: String,
  ip: String,
  student : String,
  studentId: { type: Schema.Types.ObjectId, ref: 'User' },
  date : String,
  comments : [{}]
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
