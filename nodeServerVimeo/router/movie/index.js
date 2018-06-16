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

router.get("/list",function(req,res){
  res.render('movie.ejs');
});

//REST ful API
// 1. /movie GET
router.get('/',function(req,res){
    var responseData ={};

    var query = connection.query('select movie_title from movie2',function(err,rows){
      if(err) throw err;
      if(rows.length){//1이상 일 경우
        //console.log(rows);
        responseData.result = 1;
        responseData.data = rows;// 배열형태
      }else{
        responseData.result = 0;
      }
      res.json(responseData);
    });
});

// 3. /movie/:keyword , GET
router.get('/:keyword', function(req,res) {
	var keyword = req.params.keyword; //keyword == 사랑
  //console.log("keyword : ",keyword);
	var responseData = {};

	var query = connection.query('select code from keyword where val like ?', ["%"+keyword+"%"], function(err, rows) {
    //select code from keyword where val like=?
		if(err) throw err;
		if(rows[0]) {
			responseData.result = 1;
			responseData.data = rows;
		} else {
			responseData.result = 0;
		}
		res.json(responseData)
	})
})



module.exports = router;

// //Router 처리
// router.post('/form',function(req,res){
//   console.log(req.body.email);
//   res.render('email.ejs',{'email' : req.body.email});//post의 name값
// });//email.ejs에 email값을 넘겨줌
//
// router.post('/ajax', function(req,res){
//   var email = req.body.email;
//   var responseData ={};
//
//   var query = connection.query('select name from user where email="'+email+'"',function(err,rows){
//     if(err) throw err;
//     if(rows[0]){
//       responseData.result = "ok";
//       responseData.name = rows[0].name;// == minho
//     }else{
//       responseData.result = "none";
//       responseData.name = "";
//     }
//     res.json(responseData);
//   });
// });
