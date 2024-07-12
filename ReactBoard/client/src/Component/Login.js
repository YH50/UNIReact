import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

import "../style/board.css";

function Login() {
  const [userid, setUserid] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onsubmit = (e) => {
    e.preventDefault();
    if (!userid) {
      return alert("아이디 입력하소!!");
    }
    if (!pwd) {
      return alert("비밀번호 입력하소!!");
    }

    axios
      .post("/api/members/login", { userid, pwd })
      .then((res) => {
        console.log(res);
        if (res.data.msg === "ok") {
          navigate("/main");
        } else {
          setMessage(res.data.msg);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  };

  return (
    <div className="login">
      <form id="login-form">
        <div className="field">
          <label>USER ID</label>
          <input
            type="text"
            value={userid}
            onChange={(e) => {
              setUserid(e.currentTarget.value);
            }}
          />
        </div>
        <div className="field">
          <label>PASSWORD</label>
          <input
            type="password"
            value={pwd}
            onChange={(e) => {
              setPwd(e.currentTarget.value);
            }}
          />
        </div>
        <div className="btns">
          <input
            type="submit"
            value="LOG IN"
            onClick={(e) => {
              onsubmit(e);
            }}
          />
          <input
            type="button"
            value="JOIN"
            onClick={() => {
              navigate("/joinForm");
            }}
          />

          {/* <button onClick={
                    ()=>{ onsubmit(); }
                }>LOG-IN</button> 
                <button onClick={
                    ()=>{ navigate('/joinForm');}           // navigate : 외부보단 내부에서 이동 시 사용
                }>JOIN</button> */}
        </div>
        <div>{message}</div>
      </form>
    </div>
  );
}

export default Login;
