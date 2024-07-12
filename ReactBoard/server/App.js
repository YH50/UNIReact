const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({resave:false, saveUninitialized:false, secret:"qwer",}));
app.set('port', process.env.PORT || 5000);
app.use('/img', express.static(path.join(__dirname, 'uploads')));       //static folder

const membersRouter = require('./routers/members');
app.use('/members', membersRouter);
const boardsRouter = require('./routers/boards');
app.use('/boards', boardsRouter);

app.get('/', (req, res)=>{
    res.send("<h1>Busan Lotte Giants</h1>");
});
      

app.listen(app.get('port'), ()=>{console.log(app.get('port'), "port server opened ");});