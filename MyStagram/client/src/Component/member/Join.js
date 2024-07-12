import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


function Join() {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdchk, setPwdChk] = useState('');
    const [nic, setNic] = useState('');
    const [tel, setTel] = useState('');
    const [intro, setIntro] = useState('');
    const [imgsrc, setImgSrc] = useState('');
    const [imgStyle, setImgStyle] = useState({display:"none"});

    const nav = useNavigate();

    async function onsubmit(){
        if(email==""){return alert("이메일 입력하소!!");}
        if(pwd==""){return alert("비밀번호 입력하소!!");}
        if(pwd!=pwdchk){return alert("비밀번호 똑디 치소!!");}
        if(nic==""){return alert("닉네임 입력하소!!");}

        try {
            let res = await axios.post('/api/member/emailcheck', {email});
            if(res.data.msg == 'N'){
                return alert('이메일 중복입니더!!');
            }
            res = await axios.post('/api/member/niccheck', {nic});
            if(res.data.msg == 'N'){
                return alert('닉네임 중복입니더!!');
            }
            res = await axios.post('/api/member/join', {email, pwd, nic, tel, intro, filename:imgsrc});
            if(res.data.msg == 'ok'){
                alert('가입 완료, 로그인하이소.');
                nav('/');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function fileupload(e){
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        const res = await axios.post('/api/member/fileupload', formData);
        setImgSrc(`http://localhost:5000/upimg/${res.data.filename}`);
        setImgStyle({display:"block", width:"300px"});
    }

    
  return (
    <div className='loginform'>
        <div className="logo" style={{fontSize:"2rem"}}>Come & Join Us</div>
        <div className="field">
            <label>이-메일</label>
            <input type="text" value={email} onChange={(e)=>{setEmail(e.currentTarget.value)}} />
        </div>
        <div className="field">
            <label>암호</label>
            <input type="password" value={pwd} onChange={(e)=>{setPwd(e.currentTarget.value)}} />
        </div>
        <div className="field">
            <label>암호 재입력</label>
            <input type="password" value={pwdchk} onChange={(e)=>{setPwdChk(e.currentTarget.value)}} />
        </div>
        <div className="field">
            <label>닉-네임</label>
            <input type="text" value={nic} onChange={(e)=>{setNic(e.currentTarget.value)}} />
        </div>
        <div className="field">
            <label>전화번호</label>
            <input type="text" value={tel} onChange={(e)=>{setTel(e.currentTarget.value)}} />
        </div>
        <div className="field">
            <label>소개글</label>
            <input type="text" value={intro} onChange={(e)=>{setIntro(e.currentTarget.value)}} />
        </div>
        <div className="field">
            <label>프로필 사진</label>
            <input type="file" onChange={(e)=>{fileupload(e)}} />
        </div>
        <div className="field">
            <label>사진 미리보기</label>
            <div><img src={imgsrc} style={imgStyle}/></div>
        </div>

        <div className="btns">
            <button onClick={()=>{onsubmit()}}>가입</button>
            <button onClick={()=>{nav('/')}}>돌아가기</button>
        </div>
    </div>
  )
}

export default Join
