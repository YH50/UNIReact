import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'


function MemberUpdate() {

    const [loginUser, setLoginUser] = useState('');

    const [userid, setUserid] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd_chk, setPwdchk] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    useEffect(
        ()=>{
            axios.get("/api/members/getLoginUser")
            .then((res)=>{
                if(!res.data){
                    alert('로그인이 필요한 서비스임 ㅅㄱ');
                    navigate('/');
                }else{
                    setUserid(res.data.userid);
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPhone(res.data.phone);
                }
           })
            .catch((err)=>{
                console.error(err);
            })
        },[]
    );

    function onsubmit(){
        if(!pwd){return alert("비밀번호 입력하소!!");}
        if(pwd!=pwd_chk){return alert("비밀번호 다시 똑디 치보소!!");}
        if(!name){return alert("이름 입력하소!!");}
        if(!email){return alert("이메일 입력하소!!");}
        if(!phone){return alert("전화번호 입력하소!!");}

        axios.post('/api/members/updateMember', {userid, pwd, name, email, phone})
        .then((res)=>{
            alert("수정 다 됐심더. 다시 로그인 해보이소");
            navigate('/main');
        })
        .catch((err)=>{
            console.error(err);
        })
    }


    
    return (
        <div className="login">
            <form id="login-form">
                <h2>Join</h2>
                <div className="field">
                    <label>USER ID</label>
                    <input type="text" value={userid} readOnly/>
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
                <input type='button' value="UPDATE" onClick={
                    ()=>{ onsubmit(); }
                }/>
                <input type='button' value="BACK" onClick={
                    ()=>{ navigate('/main'); }           
                }/>
             </div>
            </form>
        </div>
    )
}

export default MemberUpdate
