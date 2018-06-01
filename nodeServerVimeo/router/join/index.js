var express = require('express');
var app = express();
var router = express.Router();//라우터 처리
var path = require('path');//상대경로 지정
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var alert = require('alert-node');


//mysql 연동
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '111111',
  database : 'mr'
});
connection.connect();

//localhost:3000/join
router.get('/', function(req,res){
  //res.sendFile(path.join(__dirname,'../../public/join.html'));
   var msg;
   var errMsg = req.flash('error');//오류메시지
   if(errMsg) msg = errMsg; //에러메시지가 있을경우
   res.render('join.ejs', {'message' : msg}); //ejs템플릿 routing
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


passport.use('local-join', new LocalStrategy({
    usernameField: 'email',   //join.ejs -> form-input -> name값
    passwordField: 'password',
    passReqToCallback : true
  }, function(req,email,password,done){
    var query = connection.query('select * from user where email=?',[email],function(err,rows){
      if(err) return done(err);

      if(rows.length){//db -> email 중복
        console.log('existed user');
        return done(null,false,{message : 'your email is already used'});
      } else{
        //alert
        alert('회원가입 되셨습니다.');
        var sql = {email : email, pw : password}; // db : 값
        var query = connection.query('insert into user set ?',sql,function(err,rows){
          if(err) throw err;
          return done(null,{'email' : email , 'id' : rows.insertId});
        });
      }
    });
  }
));

//  localhost:3000/join -> post
router.post('/',
passport.authenticate('local-join',
                                { successRedirect: '/join',
                                 failureRedirect: '/join',
                                 failureFlash: true })
);

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

module.exports = router;
