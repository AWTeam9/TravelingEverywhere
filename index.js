const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');
const passport = require('passport');
const fs = require('fs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { mainModule } = require('process');
var ejs = require('ejs');
const { response, query } = require('express');
const { connect } = require('http2');
const bodyParser = require('body-parser')

const app = express();
const PORT = 52273;

// db session store options
require('dotenv').config();

//Google Developers Console 의 client ID와 secret
const GOOGLE_CLIENT_ID = process.env.client_id;
const GOOGLE_CLIENT_SECRET = process.env.client_secret;



const options = {
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
}

const connection = mysql.createConnection(options);

const bgm_src = []

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

// mysql session store 생성
const sessionStore = new MySQLStore(options);

// app.use(frameguard());
app.use(
    session({
        secret: "secret key",
        store: sessionStore, // mysql 연결 어떻게?
        resave: false,
        saveUninitialized: false,
    })
);

// 정적 파일 불러오기
app.use(express.static(__dirname + "/public"));

// passport 초기화 및 session 연결
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// login이 최초로 성공했을 때만 호출되는 함수
// done(null, user.id)로 세션을 초기화 한다.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// 사용자가 페이지를 방문할 때마다 호출되는 함수
// done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser(function (id, done) {
    done(null, id);
});

let temp_profile;

// Google login 전략
// 로그인 성공 시 callback으로 request, accessToken, refreshToken, profile 등이 나온다.
// 해당 콜백 function에서 사용자가 누구인지 done(null, user) 형식으로 넣으면 된다.
// 이 예시에서는 넘겨받은 profile을 전달하는 것으로 대체했다.
passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:52273/auth/google/callback",
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            console.log(profile);
            console.log(accessToken);

            temp_profile = profile;

            connection.query('SELECT userId from userInfo', (error, rows) => {
                var hasId = false;
                if (error) {
                    console.log(error);
                }
                else {
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].userId == profile.id) {
                            hasId = true;
                            console.log("hasId is same!");
                        }
                    }
                    if (!hasId) {
                        connection.query("INSERT INTO userInfo VALUES(?,?,?)",
                            [profile.id, profile.displayName, profile.emails[0].value],
                            function (error) {
                                if (error)
                                    throw error;
                                hasId = false;
                            }
                        )
                    }
                }
            });

            return done(null, profile);
        }
    )
);

// 라우팅 정의
app.get("/", (req, res) => {
    res.redirect("/select");
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Listen : ${PORT}`);
});

// login 화면
// 이미 로그인한 회원이라면(session 정보가 존재한다면) main화면으로 리다이렉트
app.get("/login", (req, res) => {
    if (req.user) return res.redirect("/mypage");
    fs.readFile("./public/html/login.html", (error, data) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    });
});

// login 화면
// 로그인 하지 않은 회원이라면(session 정보가 존재하지 않는다면) login화면으로 리다이렉트
app.get("/mypage", (req, res) => {
    if (!req.user) return res.redirect("/login");
    fs.readFile("./public/html/mypage.html", "utf-8", (error, data) => {
        if (error) {
            console.log(error);
            return res.sendStatus(500);
        }
        else {
            connection.query("SELECT * from userInfo where userId=?",
                req.user,
                function (error, item) {

                    console.log(req.user);
                    if (error)
                        throw error;

                    res.send(ejs.render(data, {
                        data: item[0]
                    }))

                }
            );


            //connection.query("SELECT * from ") todo 랭킹 차트 불러오기
        }


        // res.writeHead(200, { "Content-Type": "text/html" });
        // res.end(data);
    });
});


// google login 화면
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

// google login 성공과 실패 리다이렉트
app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/mypage",
        failureRedirect: "/login",
    })
);

// logout
app.get("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

// 노래 끝날 때 다음 노래 찾기
app.get('/music', (req, res) => {
    console.log("query:" + req.query);
    if (req.query.num == null) {
        res.sendFile(__dirname + "/public/html/test.html");
        console.log(req.query);
    } else {
        console.log(req.query)
        num = parseInt(req.query.num)

        num = num % bgm_src.length;

        const result = {
            src: bgm_src[num],
            size: bgm_src.length
        }

        console.log(result)
        res.json(result);
    }
});



//여행지 선택 화면 호출
app.get("/select", (req, res) => {
    res.sendFile(__dirname + "/public/html/select.html");
    //영상 자료 넣어줘야 하나?
})



//영상 페이지
app.get("/main", async (req, res) => {
    console.log("query:" + req.query.location);
    var place = req.query.location;
    if (req.query.location == null) {
        res.redirect("/select");
        console.log(req.query);
    } else {
        console.log(place);


        fs.readFile(__dirname + "/public/html/main.html", 'utf-8', function (error, data) {
            connection.query("SELECT url from Video where location=?",
                req.query.location,
                function (error, item) {
                    if (error)
                        throw error;

                    res.send(ejs.render(data, {
                        data: {
                            data: item[0],
                            place: place
                        }
                    }))

                }
            )
        })
    }

})

app.post("/go", (req, res) => {
    console.log("go");
    console.log(req.body.time);
    console.log(req.body.location);
})

app.post("/sendTime", (req, res) => {
    console.log("SendTime!");
    // 변수를 선언합니다.
    var body = req.body;


    if (req.user) {
        // 데이터베이스 쿼리를 실행합니다.
        connection.query('SELECT * from viewingTime', (error, rows) => {
            var hasData = false;
            var index = 0;
            var time = 0;
            console.log(req.user);

            if (error) {
                console.log(error);
            }
            else {
                if (req.user) {

                }
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].userId == req.user && rows[i].location == body.location) {
                        hasData = true;
                        time = Number(rows[i].period);
                        console.log("hasData!");
                    }
                }
                if (!hasData) {
                    connection.query("INSERT INTO viewingTime VALUES(?,?,?)",
                        [req.user, body.location, body.time],
                        function (error) {
                            if (error)
                                throw error;
                            hasData = false;
                        }
                    )
                }
                else {
                    time += Number(body.time);
                    connection.query("UPDATE viewingTime set period=? where userId=? AND location=?",
                        [time, req.user, body.location],
                        function (error) {
                            if (error)
                                throw error;
                            hasData = false;
                            index = 0;
                            time = 0;
                        }
                    )
                }
            }
        });

    }


})


//상세 페이지 
app.get("/detail", (req, res) => {
    console.log("query:" + req.query.location);
    if (req.query.location == null) {
        res.redirect("/select");
        console.log(req.query);
    } else {
        console.log(req.query);
        fs.readFile(__dirname + "/public/html/detail.html", 'utf-8', function (error, data) {
            connection.query("SELECT * from locationInfo where locationName=?",
                req.query.location,
                function (error, item) {
                    if (error)
                        throw error;

                    res.send(ejs.render(data, {
                        data: item[0]
                    }))

                }
            )
        })
        // 해당 장소 정보 매칭해주기
        // main에서의 쿼리와 같은 방식으로 받아주기

    }
}
)