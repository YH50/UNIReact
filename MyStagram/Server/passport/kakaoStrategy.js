const psp = require("passport");
const kakaoStrategy = require("passport-kakao").Strategy;
const mysql = require('mysql2/promise');

async function getConnection(){
    const con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "adminuser",
        database: "mystagram",
    });
    return con;
}

module.exports = ()=>{
    psp.use(
        new kakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: '/member/kakao/callback',
            },
            async(accessToken, refreshToken, profile, done)=>{
                // 회원조회 -> 없으면 가입 먼저, 이후 로그인
                const con = await getConnection();
                let sql = 'select * from member where snsid=? and provider=?';
                let [rows, fields] = await con.query(sql, [profile.id,'kakao']);
                if(rows.length>=1){
                    done(null, rows[0]);
                }else{
                    sql = 'insert into member(email, nickname, snsid, provider) values(?,?,?,?)';
                    [result, fields] = await con.query(sql, [profile.displayName, profile.displayName, profile.id, 'kakao']);

                    sql = 'select * from member where snsid=? and provider=?';
                    let [rows2, fields2] = await con.query(sql, [profile.id, 'kakao']);
                    done(null, rows2[0]);
                }
            }
        )
    )
}