var express = require('express');
var app = express();
var router = express.Router();//라우터 처리
var path = require('path');//상대경로 지정

//localhost:3000/map
router.get('/', function(req,res){
  res.render('daumMapAPI.ejs'); //ejs -> id
});

module.exports = router;//다른 파일에서 이 파일을 사용하기 위해
