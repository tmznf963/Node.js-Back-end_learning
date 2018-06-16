var express = require('express');
var app = express();
var router = express.Router();//라우터 처리
var path = require('path');//상대경로 지정
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//mysql 연동
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '111111',
  database : 'mr'
});
connection.connect();

//localhost:3000/login
router.get('/', function(req,res){
  //res.sendFile(path.login(__dirname,'../../public/login.html'));
  var msg;
  var errMsg = req.flash('error');//오류메시지
  if(errMsg) msg = errMsg;
  res.render('login.ejs', {'message' : msg});// ejs템플릿 routing
});

//session 처리
passport.serializeUser(function(user, done) {
  console.log('passport session save : ', user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('passport session get id : ', id);
  done(null, id);
});


passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
	  passwordField: 'password',
	  passReqToCallback : true
	}, function(req, username, password, done) {
		var query = connection.query('select * from users where uname=?', [username], function(err,rows) {
			if(err) return done(err);
      console.log(rows[0].uname);
			if(rows.length && ((username==rows[0].uname)&&(password==rows[0].pwd))) { //post 값 == db 값 -> login
				return done(null, {'username' : rows[0].uname, 'id' : rows[0].id});//로그인 성공 , 배열 뒤엔 Field 값
			} else {
				  return done(null, false, {'message' : '아이디 혹은 비밀번호가 옳지 않습니다.'});
			}
		});
	}
));

// localhost:3000/login -> post
// Custom Callback - json
router.post('/', function(req,res,next){
  passport.authenticate('local-login', function(err,user,info){
    if(err) res.status(500).json(err);
    if (!user) return res.status(401).json(info.message);//유저가 없을시,info == 추가메시지

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
    });

  })(req, res, next);//authenticate의 추가 인자
});

module.exports = router;

// router.post('/', function(req,res){
//   var body = req.body;
//   var email = body.email;//input의 name값
//   var name = body.name;
//   var passwd = body.password;
//   //console.log(email)
//   var sql = {email : email , name : name , pw: passwd}; // 속성 : 변수
//   var query = connection.query('insert into user set ?',sql,function(err,rows){
//     if(err) throw err;
//     else res.render('welcome.ejs',{'name': name, 'id':rows.insertId});//ejs의 값 : 현재 변수 , insertId = 기본키
//   });
// });//('insert into user (email,name,pw) values ("'+email+'","'+name+'","'+passwd+'")',function(err,rows)
