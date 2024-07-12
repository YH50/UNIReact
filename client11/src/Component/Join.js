import React, {useState} from 'react'
import '../css/join.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



// 입력한 내용을 state 변수에 실시간으로 저장하고 제출 버튼을 누르면 입력 내용이
// 하나의 객체 or 배열에 저장되어 list에서 출력되게 작성하기
function Join(props) {

    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();     //location.href 와 유사 기능의 함수를 생성

    const onsubmit = ()=>{

        axios.post("/api/join", {userid, pwd, name, phone, email})
        .then(()=>{alert('회원 가입 완료됐심더');})
        .catch((err)=>{console.error(err);});


        setUserid("");
        setPwd("");
        setName("");
        setPhone("");
        setEmail("");
        

    }

  return (
      <div className='container'>
            <div className='field'>
                <label>아이디</label>
                <input type="text" value={userid} onChange={(e)=>{
                    setUserid(e.currentTarget.value);
                }}/>
            </div>
            <div className='field'>
                <label>비밀번호</label>
                <input type="password" value={pwd} onChange={(e)=>{
                    setPwd(e.currentTarget.value);
                }} />
            </div>
            <div className='field'>
                <label>이름</label>
                <input type="text" value={name} onChange={(e)=>{
                    setName(e.currentTarget.value);
                }} />
            </div>
            <div className='field'>
                <label>전화번호</label>
                <input type="text" value={phone} onChange={(e)=>{
                    setPhone(e.currentTarget.value);
                }} />
            </div>
            <div className='field'>
                <label>이메일</label>
                <input type="text" value={email} onChange={(e)=>{
                    setEmail(e.currentTarget.value);
                }} />
            </div>
            <div className='btns' style={{display:"flex", width:"100%"}}>
                <button style={{flex:"1", height:"50px"}} onClick={()=>{onsubmit()}} >제출</button>
            </div>
        </div>
    )
}

export default Join
