var express = require('express');
var app = express();
var router = express.Router();//라우터 처리
var path = require('path');//상대경로 지정

//localhost:3000/main
router.get('/', function(req,res){
  console.log('main js loaded : ', req.user);
  var id = req.user;
  res.render('main.ejs',{'id' : id}); //ejs -> id
  //res.sendFile(path.join(__dirname,'../public/main.html'));
});// __dirname == 현재경로

module.exports = router;//다른 파일에서 이 파일을 사용하기 위해
