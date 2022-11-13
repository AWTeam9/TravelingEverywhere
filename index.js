const PORT = 52273;
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');
const mysql = require('mysql');


const app = express();

const bgm_src = []

require('dotenv').config();

console.log(process.env.DATABASE_USERNAME)

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

connection.connect();
connection.query('SELECT * from bgm', (error, rows) => {
    if (error) {
        console.log(error);
    }
    else {
        for (var i = 0; i < rows.length; i++) {
            bgm_src[i] = rows[i].file_location;
        }
    }

    console.log(bgm_src);
});

// 정적 파일 불러오기
app.use(express.static(__dirname + "/public"));

// 라우팅 정의
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/test.html");
});



app.get('/music', (request, response) => {
    console.log("query:" + request.query);
    if (request.query.num == null) {
        response.sendFile(__dirname + "/public/html/test.html");
        console.log(request.query);
    } else {
        console.log(request.query)
        num = parseInt(request.query.num)

        num = num % bgm_src.length;

        const result = {
            src: bgm_src[num],
            size: bgm_src.length
        }

        console.log(result)
        response.json(result);
        /*response.set("src", bgm_src[num]);
        response.set("size", bgm_src.length);*/
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Listen : ${PORT}`);
});

connection.end();

