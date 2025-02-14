import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/board.css";

function WriteBoard() {
  const [loginUser, setLoginUser] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pass, setPass] = useState("");
  const [image, setImage] = useState("");
  const [savefilename, setSavefilename] = useState("");
  const [imgStyle, setImgStyle] = useState({display:'block '});
  const [imgSrc, setImgSrc] = useState('http://via.placeholder.com/300x200');

  const nav = useNavigate();

  useEffect(
    ()=>{
        axios.get("/api/members/getLoginUser")
        .then((res)=>{
            setLoginUser(res.data);
        })
    }
  )

    function onSubmit(){
        axios.post('/api/boards/insertBoard', {userid: loginUser.userid, email: loginUser.email, pass, title, content, image, savefilename})
        .then(()=>{
            nav('/main')
        })
        .catch((err)=>{
            console.error(err);
        })
    }

   async function onFileUpload(e){
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const res = await axios.post('/api/boards/fileupload', formData);
    setSavefilename(res.data.savefilename);
    setImage(res.data.image);

    setImgSrc(`http://localhost:5000/img/${res.data.savefilename}`);
    setImgStyle({width:"300px"});
  }

  return (
    <div className='writeBoard'>
            <h2>UPLOAD POSTING</h2>
            <div className='field'>
                <label>작성자</label><input type="text" value={loginUser.userid} readOnly/>
            </div>
            <div className='field'>
                <label>이메일</label><input type="text"  value={loginUser.email} readOnly/>
            </div>
            <div className='field'>
                <label>비밀번호</label><input type="password"  value={pass}
                    onChange={(e)=>{setPass(e.currentTarget.value)}}/>
            </div>
            <div className='field'>
                <label>제목</label>
                <input type="text" value={title} onChange={
                    (e)=>{ setTitle( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>내용</label>
                <textarea rows="10" value={content} onChange={
                    (e)=>{ setContent( e.currentTarget.value ) }
                }></textarea>
            </div>
            <div className='field'>
                <label>이미지</label>
                <input type="file" onChange={(e)=>{ onFileUpload(e); }  }/>
                {/* e 를 전달인수로 전달해야 해당함수에서 방금 선택한 이미지를 인식할 수 있습니다. */}
            </div>
            <div className='field'>
                <label>이미지 미리보기</label>
                <div><img src={imgSrc} style={imgStyle} alt=""/></div>
            </div>
            <div className='btns'>
                <button onClick={ ()=>{ onSubmit() } }>작성완료</button>
                <button onClick={ ()=>{ nav('/main') }}>돌아가기</button>
            </div>
    </div>
  );
}

export default WriteBoard;
