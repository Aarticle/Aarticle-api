const express = require('express');

require('dotenv').config();

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const methodOverride = require('method-override')


//initialize Express
const app = express();


const request = require('request');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aarticle', {  });


// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))


//Handlbars set up
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//Middleware

//checkAuth middleware
var checkAuth = (req, res, next) => {
//  console.log("Checking authentication");
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next()
}


app.use(cookieParser()); // Add this after you initialize express.

app.use(checkAuth);





//ROUTES
require('./routes/root.js')(app);
require('./routes/auth.js')(app);
require('./routes/article.js')(app);
require('./routes/mobileAuth.js')(app);
require('./routes/mobileArticle.js')(app);


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Aarticle is listening on port ${port}!`);
})
