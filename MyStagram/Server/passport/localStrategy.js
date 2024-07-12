const psp = require("passport");
const localStrategy = require("passport-local").Strategy;
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
        new localStrategy(      // 카카오에서는 카카오 아이디와 callbackURL
            {
                usernameField:'email',
                passwordField:'pwd',
            },
            async(email, pwd, done)=>{
                try {
                    const con = await getConnection();
                    const sql = 'select * from member where email=?';
                    const [rows, fields] = await con.query(sql, [email]);
                    if(rows.length >= 1){
                        if(pwd == rows[0].pwd){
                            // 정상 로그인
                            done(null, rows[0], null);
                        }else{
                            // 비번 불일치
                            done(null, false, {msg:"비밀번호 틀렸는데예!!"});
                        }
                    }else{
                        // 아이디 음슴
                        done(null, false, {msg: '아이디가 없는데예!!'})
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        )
    )
}