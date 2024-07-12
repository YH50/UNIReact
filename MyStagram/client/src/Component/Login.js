import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import moduleName from '../style/mystagram.css'


function Login() {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const nav = useNavigate();

    function onLoginLocal(){
        if(email==""){return alert("이메일 입력하소!!");}
        if(pwd==""){return alert("비밀번호 입력하소!!");}

        axios
        .post('/api/member/loginlocal', {email, pwd})
        .then((res)=>{
            if(res.data.msg =='ok'){
                nav('/main');
            }else{
                setPwd("");
                return alert(res.data.msg);
            }
        })
        .catch((err)=>{console.error(err);})

    }

    return (
        <div className='loginform'>
            <div className='field'>
                <label>EMAIL</label>
                <input type='text' value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}}/>
            </div>
            <div className='field'>
                <label>PASSWORD</label>
                <input type='password' value={pwd} onChange={(e)=>{setPwd(e.currentTarget.value)}}/>
            </div>
            <div className='btns'>
                <button onClick={()=>{onLoginLocal()}}>로그-인</button>
                <button onClick={()=>{nav('/join ')}}>가입하기</button>
            </div>
            <div className='snslogin'>
            <button onClick={()=>{
                window.location.href='http://localhost:5000/member/kakao';
            }}>카카오</button>
            <button>네이버</button>
            <button>구글</button>
            <button>페이스북</button>
            </div>
        </div>
    )
}

export default Login
