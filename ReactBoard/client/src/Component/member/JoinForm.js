import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import '../../style/board.css';


function JoinForm(){

    const [userid, setUserid] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd_chk, setPwdchk] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    
    const onsubmit = ()=>{
        if(!userid){return alert("아이디 입력하소!!");}
        if(!pwd){return alert("비밀번호 입력하소!!");}
        if(!name){return alert("이름 입력하소!!");}
        if(!email){return alert("이메일 입력하소!!");}
        if(!phone){return alert("전화번호 입력하소!!");}
        if(pwd!=pwd_chk){return alert("비밀번호 다시 똑디 치보소!!");}

        axios.post('/api/members/join', {userid, pwd, name, email, phone})
        .then((res)=>{
            if(res.data.msg=='ok'){
                alert("회원가입 됐심더 로그인하이소");
            }else{
                alert("회원가입에 문제가 있으니까 다시 고치고 하이소");
            }
            navigate('/');
        })
        .catch((err)=>{
            console.error(err);
            navigate('/');
        })
    }

    return (
        <div className="login">
            <form id="login-form">
                <h2>Join</h2>
                <div className="field">
                    <label>USER ID</label>
                    <input type="text" value={userid}
                     onChange={(e)=>{setUserid(e.currentTarget.value)}} />
                </div>
                <div className="field">
                    <label>PASSWORD</label>
                    <input type="password" value={pwd}
                     onChange={(e)=>{setPwd(e.currentTarget.value)}} />
                </div>
                <div className="field">
                    <label>RETYPE PWD</label>
                    <input type="password" value={pwd_chk}
                     onChange={(e)=>{setPwdchk(e.currentTarget.value)}} />
                </div>
                <div className="field">
                    <label>NAME</label>
                    <input type="text" value={name}
                     onChange={(e)=>{setName(e.currentTarget.value)}} />
                </div>
                <div className="field">
                    <label>EMAIL</label>
                    <input type="text" value={email}
                     onChange={(e)=>{setEmail(e.currentTarget.value)}} />
                </div>
                <div className="field">
                    <label>PHONE</label>
                    <input type="text" value={phone}
                     onChange={(e)=>{setPhone(e.currentTarget.value)}} />
                </div>
                <div className="btns">
                <input type='button' value="JOIN" onClick={
                    ()=>{ onsubmit(); }
                }/>
                <input type='button' value="BACK" onClick={
                    ()=>{ navigate('/'); }           
                }/>
             </div>
            </form>
        </div>
    )
}
export default JoinForm