var express = require('express');
var app = express();
var router = express.Router();//라우터 처리
var path = require('path');//상대경로 지정

var main = require('./main');//main.js
var email = require('./email');//email.js
var join = require('./join/index');// join폴더 -> index.js
var login = require('./login/index');
var logout = require('./logout/index');
var movie = require('./movie/index');
var map = require('./map/index');

//url routing
//res.sendFile(path.join(__dirname,"../views/index.html"));//__dirname 현재경로
//localhost:3000/
router.get('/', function(req,res){
  res.render('index.ejs'); //첫 화면
});

router.use('/main', main);//router
router.use('/email', email);
router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);
router.use('/movie', movie);
router.use('/map', map);


module.exports = router;
