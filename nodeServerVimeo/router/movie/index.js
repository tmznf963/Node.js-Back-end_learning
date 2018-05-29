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

    var query = connection.query('select title from movie',function(err,rows){
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

//2. /movie POST
router.use('/',function(req,res){
  var title = req.body.title;
  var type = req.body.type;
  var grade = req.body.grade;
  var actor = req.body.actor;

  var sql = {title,type,grade,actor};// db : 값
  var query = connection.query('insert into movie set ?',sql,function(err,rows){
    if(err) throw err;
    return res.json({'result' : 1});
  });
});

// 3. /movie/:title GET
router.get('/:title',function(req,res){
  var title = req.params.title;

    var responseData ={};

    var query = connection.query('select * from movie where title =?',[title],function(err,rows){
      if(err) throw err;
      if(rows[0]){//0값이 있을 경우
        responseData.result = 1;
        responseData.data = rows;// 배열형태
      }else{
        responseData.result = 0;
      }
      res.json(responseData);
    });
});

// 4. /movie/:title DELETE
router.delete('/:title',function(req,res){
  var title = req.params.title;

    var responseData ={};

    var query = connection.query('delete from movie where title =?', [title], function(err, rows) {
  	 	if(err) throw err;

  		if(rows.affectedRows > 0) {
  			responseData.result = 1;
  			responseData.data = title;
  		} else {
  			responseData.result = 0;
  		}
  		res.json(responseData)
    });
});


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
