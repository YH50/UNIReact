import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Main() {
    const [loginUser, setLoginUser] = useState('');
    const nav = useNavigate();
    useEffect(
        ()=>{
            axios
            .get('/api/member/getLoginUser')
            .then((res)=>{
                if(!res.data.loginUser){
                    alert('로그인 하고 이용하이소!!')
                    nav('/');
                }else{
                    setLoginUser(res.data.loginUser);
                    console.log(res.data);
                }
            })
            .catch((err)=>{
                console.error(err);
                // navigate('/');
            })
        },[]
    )

  return (
    <div>
      <h1>{loginUser.nickname} 님 어서오이소</h1>
    </div>
  )
}

export default Main
