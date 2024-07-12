const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const app = express();

app.set('port', process.env.PORT || 5000);
dotenv.config();
app.use('/images', express.static(path.join(__dirname, 'images')));       //static folder
app.use('/upimg', express.static(path.join(__dirname, 'uploads')));  
app.use('/', express.static(path.join(__dirname, 'public'))); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));                                                  
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false, saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie: {httpOnly: true, secure: false,},})
);

const psp = require('passport');
const passportConfig = require('./passport');
passportConfig();
app.use(psp.initialize());
app.use(psp.session());

const memRouter = require('./Routers/member');
app.use('/member', memRouter);

app.get('/', (req, res)=>{res.send('<h1>Mystagram</h1>')})


app.listen(app.get('port'), ()=>{console.log(app.get('port'), "port server opened ");});