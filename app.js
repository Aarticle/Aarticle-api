const express = require('express');

require('dotenv').config();

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const methodOverride = require('method-override')


//initialize Express
const app = express();


const request = require('request');
const bodyParser = require('body-parser');

/*Put Models Here
const Comment = require('./models/comment');
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var Recaptcha = require('express-recaptcha');
// //import Recaptcha from 'express-recaptcha'
// var recaptcha = new Recaptcha('6LciD0EUAAAAAMSM4b2xRawGOzSD0ke7mlaY-ZpQ', '6LciD0EUAAAAAH4H4CCH0EwKcfbDlQPdMUQe0SFO');



var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/2b2tonline', {  });


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

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Aarticle is listening on port ${port}!`);
})
