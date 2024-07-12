import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../../style/board.css';

function UserInfo() {

    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();

    useEffect(
        ()=>{
            axios.get("/api/members/getLoginUser")
            .then((res)=>{
                if(!res.data){
                    alert('로그인이 필요한 서비스임 ㅅㄱ');
                    navigate('/');
                }else{
                    setLoginUser(res.data);
                }
           })
            .catch((err)=>{
                console.error(err);
                // navigate('/');
            })
        },[]);

    function onLogout(){
        axios.get('/api/members/logout')
        .then(()=>{
            navigate('/');
        })
        .catch((err)=>{
            console.error(err);
        })
    }

  return (
    <div className='loginUser'>
        {
            (loginUser)?(
                <h3>{loginUser.name}({loginUser.userid})님 반갑십니다 &nbsp;</h3>
            ):(null)
        }
        <button onClick={
            ()=>{navigate('/memberUpdate');}
        }>회원정보 수정</button>
        <button onClick={
            ()=>{onLogout();}
        }>로그아웃</button>
        <button onClick={
            ()=>{navigate('/writeBoard');}
        }>게시물 작성</button>
    </div>
  )
}

export default UserInfo
