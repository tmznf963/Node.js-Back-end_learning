var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./router/index');// router폴더 -> index.js

//3000 port 연결
app.listen(3000, function(){
  console.log("start!! express server on port 3000");
});

//미들웨어
app.use(express.static('public'));//static디렉토리 요청
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');//ejs 뷰 엔진 사용

app.use(router);//index.js






//비동기 콜백함수로 동작하기에 출력 순서가 바뀔수도 있다.
//nodemon = supervisor
// -g 글로벌 설치
// get요청 == URL path
