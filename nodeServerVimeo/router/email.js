var express = require('express');
var app = express();
var router = express.Router();//라우터 처리
var path = require('path');//상대경로 지정
var mysql = require('mysql');

//mysql 연동
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '111111',
  database : 'mr'
});
connection.connect();

//Router 처리
router.post('/form',function(req,res){
  console.log(req.body.email);
  res.render('email.ejs',{'email' : req.body.email});//post의 name값
});//email.ejs에 email값을 넘겨줌

router.post('/ajax', function(req,res){
  var email = req.body.email;
  var responseData ={};

  var query = connection.query('select name from user where email="'+email+'"',function(err,rows){
    if(err) throw err;
    if(rows[0]){
      responseData.result = "ok";
      responseData.name = rows[0].name;// == minho
    }else{
      responseData.result = "none";
      responseData.name = "";
    }
    res.json(responseData);
  });
});

module.exports = router;
