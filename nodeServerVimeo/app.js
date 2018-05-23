var express = require('express');
var app = express();
var bodyParser = require('body-parser');
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

//3000 port 연결
app.listen(3000, function(){
  console.log("start!! express server on port 3000");
});

//static디렉토리 요청
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');//ejs 뷰 엔진 사용

//url routing
app.get('/', function(req,res){
  res.sendFile(__dirname+"/public/main.html");//__dirname 최상위 디렉토리 생략
});

app.get('/main', function(req,res){
  res.sendFile(__dirname+"/public/main.html");
});

app.post('/email_post',function(req,res){
  //console.log(req.body.email);
  //res.send("<h1>Welcome!" + req.body.email + "</h1>");//post의 name값
  res.render('email.ejs',{'email' : req.body.email});
});//email.ejs에 email값을 넘겨줌

app.post('/ajax_send_email', function(req,res){
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


//비동기 콜백함수로 동작하기에 출력 순서가 바뀔수도 있다.
//nodemon = supervisor
// -g 글로벌 설치
// get요청 == URL path
