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

// 3. /admin/:keyword , GET
router.get('/:keyword', function(req,res) {
	var keyword = req.params.keyword; //keyword == 사랑
  //console.log("keyword : ",keyword);
	var responseData = {};

  	var query = connection.query('select m.movie_title,m.point,m.code from movie2 m inner join keyword k on m.code = k.code where k.val like ?', ["%"+keyword+"%"], function(err, rows) {
    //select m.movie_title from movie2 m inner join keyword k on m.code = k.code where k.val like '%사랑%';
    //select code from keyword where val like ?
    //console.log(rows);
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
