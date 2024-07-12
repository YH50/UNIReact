const express = require("express");
const path = require("path");
const app = express();
const mysql = require('mysql2/promise');
const port = 5000;


async function getConnection(){
    let connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'adminuser',
        database: 'board',
    });
    return connection;              // 빼먹지 마라!!!!
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.send("<h1>Busan Lotte Giants</h1>");
});
                               
app.post('/join', async (req, res, next)=>{
    const {userid, pwd, name, phone, email} = req.body;
    console.log('클라이언트에서 전송된 내용');
    console.log(userid, pwd, name, phone, email);
    try{
        const connection = await getConnection();
        const sql = 'insert into member(userid, pwd, name, email, phone) values(?,?,?,?,?)';
        const [result, field] = await connection.query(sql, [userid, pwd, name, email, phone]);
        res.send('ok');
    }catch(err){
        next(err);
    }
})

app.get('/getmember', async (req, res, next)=>{
    try{
        const con = await getConnection();
        const sql = 'select * from member';
        const [rows, field] = await con.query(sql);
        res.send(rows);
    }catch(err){
        next(err);
    }
})

app.listen(port, ()=>{console.log(`${port} port Server Opened`);});