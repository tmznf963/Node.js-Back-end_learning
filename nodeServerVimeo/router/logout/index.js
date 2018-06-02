var express = require('express');
var app = express();
var router = express.Router();//라우터 처리

router.get('/', function(req, res){
  req.logout();
  res.render('index.ejs');
});

module.exports = router;//router모듈 사용
