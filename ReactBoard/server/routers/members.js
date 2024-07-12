const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
async function getConnection() {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminuser",
    database: "board",
  });
  return con;
}

router.post("/login", async (req, res, next) => {
//   console.log(req.body);
  const { userid, pwd } = req.body;
  try {
    const con = await getConnection();
    const sql = "select * from member where userid=?";
    const [rows, fields] = await con.query(sql, [userid]);
    // console.log("rows : ", rows);
    if (rows.length >= 1) {
      if (rows[0].pwd == pwd) {
        const uniqInt = Date.now();
        req.session[uniqInt] = rows[0];
        res.cookie("session", uniqInt, { httpOnly: true, path: "/" });
        return res.send({msg :"ok"});
      } else {
        return res.send({ msg: "비밀번호 틀렸는데예!!" });
      }
    } else {
      return res.send({ msg: "아이디가 없는데예!!" });
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/logout", (req, res) => {
  if (req.cookies.session) {
    delete req.session[req.cookies.session];
    res.clearCookie("session", req.cookies.session, {
      httpOnly: true,
      path: "http://localhost:3000",
    });
  } else {
    req.session.destroy(); // session cookie 한번에 삭제
  }
  res.redirect("http://localhost:3000");
});

router.post('/join', async (req, res)=>{
    const {userid, pwd, name, email, phone} = req.body;
    try{
        const con = await getConnection();
        const sql = "insert into member(userid, pwd, name, email, phone) values(?,?,?,?,?)";
        const [result, fields] = await con.query(sql, [userid, pwd, name, email, phone]);
        // console.log("result 출력 : ", result);
        res.send({msg:"ok"});
    }catch(err){
        console.error(err);
    }
});

router.get('/getLoginUser', (req, res)=>{
    const loginUser = req.session[req.cookies.session];
    res.send(loginUser);
    
});

router.post('/updatemember', async (req, res)=>{
    const {userid, pwd, name, email, phone} = req.body;
    try{
        const con = await getConnection();
        const sql = "update member set pwd=?, name=?, email=?, phone=? where userid=?";
        const [result, fields] = await con.query(sql, [pwd, name, email, phone, userid]);
        req.session[req.cookies.session] = {userid, pwd, name, email, phone};
        res.send('ok');
    }catch(err){
        console.error(err);
    }
})

module.exports = router;
