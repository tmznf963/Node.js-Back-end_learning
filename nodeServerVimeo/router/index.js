var express = require('express');
var app = express();
var router = express.Router();//라우터 처리
var path = require('path');//상대경로 지정

//var main = require('./main');//main.js
//var email = require('./email');//email.js
var join = require('./join/index');// join폴더 -> index.js
var login = require('./login/index');
var logout = require('./logout/index');
var movie = require('./movie/index');//사용자
var ad_moive = require('./admin/index');//관리자
var map = require('./map/index');

//url routing
//res.sendFile(path.join(__dirname,"../views/index.html"));//__dirname 현재경로
//localhost:3000/
router.get('/', function(req,res){
  var id = req.user; //유저값
  if(!id) res.render('index.ejs');//첫 화면(유저값 없을 경우)
  res.render('main.ejs',{'id' : id}); //ejs -> username
});

//router.use('/main', main);//router
//router.use('/email', email);
router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);
router.use('/movie', movie);//사용자
router.use('/admin', ad_moive);//관리자
router.use('/map', map);


module.exports = router;
