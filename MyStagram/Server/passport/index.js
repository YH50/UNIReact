const psp = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
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
    psp.serializeUser((user, done)=>{
        done(null, user.email);
    });
    psp.deserializeUser(async (email, done)=>{
        const sql = 'select * from member where email=?'
        try {
            const con = await getConnection();
            const [rows, field] = await con.query(sql, [email]);
            done(null, rows[0])
        } catch (error) {
            done(error);
        }
    });
    local();
    kakao();
}