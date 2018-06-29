var express = require('express');
var app = express();
var router = express.Router();//라우터 처리
var path = require('path');//상대경로 지정
var mysql = require('mysql');

//mysql 연동
var connection = mysql.createConnection({//'localhost'
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '111111',
  database : 'mr'
});
connection.connect();

router.get("/mng",function(req,res){
  res.render('movie2.ejs');
});

//REST ful API
// 1. /admin GET
router.get('/',function(req,res){
    var responseData ={};
    var query = connection.query('select movie_title,code from movie2',function(err,rows){
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

// users 회원
router.get('/user',function(req,res){
    var responseData ={};
    console.log("users");
    var query = connection.query('select uname from users where uname NOT IN("admin")',function(err,rows){
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

// 2. /admin , POST
router.post('/', function(req,res){
	var code = req.body.code;
	var movie_title = req.body.movie_title;
	var point = req.body.point;
	var genres = req.body.Genres;
  var times = req.body.Times;
  var releases = req.body.Releases;
  var directors = req.body.Directors;
  var actors = req.body.Actors;
  var grades = req.body.Grades;

	var sql = {code,movie_title,point,genres,times,releases,directors,actors,grades};
	var query = connection.query('insert into movie2 set ?', sql, function(err,rows) {
		if(err) throw err
		return res.json({'result' : 1});
	})

})

// 4. /admin/:movie_title , DELETE
router.delete('/:movie_title', function(req,res) {
	var movie_title = req.params.movie_title;

	var responseData = {};

	var query = connection.query('delete from movie2 where movie_title =?', [movie_title], function(err, rows) {
		if(err) throw err;

		if(rows.affectedRows > 0) {
			responseData.result = 1;
			responseData.data = movie_title;
		} else {
			responseData.result = 0;
		}
		res.json(responseData)
	})
})

// 5. /admin/:uname , DELETE
router.delete('/user/:uname', function(req,res) {
	var uname = req.params.uname;
  if(uname == "admin"){
    uname = "";
  }

	var responseData = {};

	var query = connection.query('delete from users where uname =?', [uname], function(err, rows) {
		if(err) throw err;

		if(rows.affectedRows > 0) {
			responseData.result = 1;
			responseData.data = uname;
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
