const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

async function getConnection() {
  const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminuser",
    database: "board",
  });
  return con;
}

let paging = {
  page: 1,
  totalCount: 0,
  beginPage: 0,
  endPage: 0, 
  displayRow: 10,
  displayPage: 10,
  prev: false,
  next: false,
  startNum: 0,
  endNum: 0,

  calPaging: function () {
    this.endPage = Math.ceil(this.page / this.displayPage) * this.displayPage;
    this.beginPage = this.endPage - (this.displayPage - 1);
    let totalPage = Math.ceil(this.totalCount / this.displayRow);
    if (totalPage < this.endPage) {
      this.endPage = totalPage;
      this.next = false;
    } else {
      this.next = true;
    }
    this.prev = this.beginPage == 1 ? false : true;
    this.startNum = (this.page - 1) * this.displayRow + 1;
    this.endNum = this.page * this.displayRow;
    console.log(
      this.beginPage +
        " " +
        this.endPage +
        " " +
        this.startNum +
        " " +
        this.endNum +
        " " +
        this.totalCount
    );
  },
};

router.get("/getBoardList/:page", async (req, res, next) => {
  if (req.params.page != undefined) {
    paging.page = req.params.page;
    req.session.page = req.params.page;
  } else if (req.session.page != undefined) {
    paging.page = req.params.page;
  } else {
    req.session.page = "";
  }

  try {
    const con = await getConnection();
    let sql = "select * from board";
    let [rows, field] = await con.query(sql);
    paging.totalCount = rows.length;
    paging.calPaging();

    sql = "select * from board order by num desc limit ? offset ?";
    let [rows2, field2] = await con.query(sql, [
      paging.displayRow,
      paging.startNum - 1,
    ]);
    //console.log(rows);
    res.send({ boardList: rows2, paging });
  } catch (err) {
    console.error(err);
  }
});

router.get("/getBoard/:num", async (req, res) => {
  try {
    const con = await getConnection();
    let sql = "update board set readcount = readcount + 1 where num=?";
    const [ress, field] = await con.query(sql, [req.params.num]);

    sql = "select * from board where num=?";
    const [result, fields] = await con.query(sql, [req.params.num]);
    res.send({ board: result[0] });
  } catch (err) {
    console.error(err);
  }
});

router.get("/getReply/:num", async (req, res) => {
  try {
    const con = await getConnection();
    sql = "select * from reply where boardnum=? order by replynum desc";
    const [result2, fields2] = await con.query(sql, [req.params.num]);
    //console.log(fields2);
    res.send({ replyList: result2 });
  } catch (err) {
    console.error(err);
  }
});

router.post("/addRep", async (req, res) => {
  const { userid, content, num } = req.body;
  try {
    const con = await getConnection();
    let sql = "insert into reply(boardnum, userid, content) values(?,?,?)";
    const [rows, fields] = await con.query(sql, [num, userid, content]);
    res.send("ok");
  } catch (error) {
    console.error(error);
  }
});

router.delete("/delRep/:replynum", async (req, res) => {
  try {
    const con = await getConnection();
    let sql = "delete from reply where replynum=?";
    const [rows, fields] = await con.query(sql, [req.params.replynum]);
    res.send("ok");
  } catch (error) {
    console.error(error);
  }
});
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

router.post("/fileupload", uploadObj.single("image"), (req, res) => {
  res.send({ savefilename: req.file.filename, image: req.file.originalname });
});

router.post("/insertBoard", async (req, res) => {
  const { userid, email, pass, title, content, image, savefilename } = req.body;
  try {
    const con = await getConnection();
    const sql =
      "insert into board(userid, email, pass, title, content, image, savefilename) values(?,?,?,?,?,?,?)";
    const [re, field] = await con.query(sql, [
      userid,
      email,
      pass,
      title,
      content,
      image,
      savefilename,
    ]);
    res.send("o");
  } catch (error) {
    console.error(error);
  }
});

router.post("/updateBoard/:num", async (req, res) => {
  const { userid, email, pass, title, content, image, savefilename } = req.body;
  console.log(req.body);
  try {
    const con = await getConnection();
    const sql =
      "update board set title=?, content=?, image=?, savefilename=? where num=?";
    const [ress, field] = await con.query(sql, [
      title,
      content,
      image,
      savefilename,
      req.params.num,
    ]);
    res.send("o");
  } catch (error) {
    console.error(error);
  }
});

router.delete("/deleteboard/:num", async (req, res) => {
  try {
    const con = await getConnection();
    const sql = "delete from board where num=?";
    const [ress, field] = await con.query(sql, [req.params.num]);
    res.send("o");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
