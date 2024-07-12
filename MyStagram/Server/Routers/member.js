const express = require("express")
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer')
const path = require("path");
const fs = require("fs");
const psp = require("passport");

async function getConnection(){
    const con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "adminuser",
        database: "mystagram",
    });
    return con;
}

try {
    fs.readdirSync('uploads/');
} catch (error) {
    console.error('upload 폴더를 생성합니다');
    fs.mkdirSync('uploads/');
}

const uploadObj = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, "uploads/");
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  });
router.post('/fileupload', uploadObj.single('image'), (req, res)=>{
    res.send({filename: req.file.filename});
})

router.post('/emailcheck', async(req, res)=>{
    const {email} = req.body;
    try {
        const con = await getConnection();
        const sql = 'select * from member where email=?';
        const [rows, fields] = await con.query(sql, [email]);
        console.log("rows : ", rows);
        console.log(rows.length);
        if(rows.length >= 1){
            res.send({msg:'N'});
        }else{
            res.send({msg:'ok'});
        }
    } catch (error) {
        console.error(error);
    }
})
router.post('/niccheck', async(req, res)=>{
    const {nic} = req.body;

    try {
        const con = await getConnection();
        const sql = 'select * from member where nickname=?';
        const [rows, fields] = await con.query(sql, [nic]);
        if(rows.length >= 1){
            res.send({msg:'N'});
        }else{
            res.send({msg:'ok'});
        }
    } catch (error) {
        console.error(error);
    }
})
router.post('/join', async(req, res)=>{
    const {email, pwd, nic, tel, intro, filename} = req.body;
    try {
        const con = await getConnection();
        const sql = 'insert into member(email, pwd, nickname, phone, profilemsg, profileimg) values(?,?,?,?,?,?)';
        const [result, fields] = await con.query(sql, [email, pwd, nic, tel, intro, filename]);
        res.send({msg:'ok'});
    } catch (error) {
        console.error(error);
    }
})

router.post("/loginlocal", (req, res, next)=>{
    psp.authenticate('local',
        (authError, user, info)=>{
            if(authError){
                // server Error
                console.error(authError);
                return;
            }
            if(!user){
                // no email or wrong pwd
                console.log(info.message);
                return res.send({msg: info.message})
            }
            // 정상 로그인 : // req.login() : req가 갖고 있는 로그인 관련함수
             return req.login(user, (loginError)=>{
                if(loginError){
                     console.error(loginError);
                     return next(loginError);
                }
                return res.send({msg:'ok', loginUser : req.user})
             })
        }
    )(req, res, next);
})

router.get('/kakao', psp.authenticate('kakao'));

router.get('/kakao/callback',
    psp.authenticate('kakao', {failureRedirect: 'http://localhost:3000/'}),
    (req, res)=>{
        res.redirect('http://localhost:3000/main');
    }
);

router.get('/getLoginUser', (req, res)=>{
res.send({loginUser:req.user});
});

module.exports = router;