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

router.get('/', function(req,res){
  res.sendFile(path.join(__dirname,'../../public/join.html'));
});

router.post('/', function(req,res){
  var body = req.body;
  var email = body.email;//input의 name값
  var name = body.name;
  var passwd = body.password;
  //console.log(email)
  var query = connection.query('insert into user (email,name,pw) values ("'+email+'","'+name+'","'+passwd+'")',function(err,rows){
    if(err){throw err;}
    console.log("ok db insert");
  });
});

module.exports = router;
