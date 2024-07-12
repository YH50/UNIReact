import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function BoardView() {
  const nav = useNavigate();
  const [board, setBoard] = useState({});
  const [replyList, setReplyList] = useState([]);
  const [loginUser, setLoginUser] = useState({});
  const [cDateTime, setCDateTime] = useState(""); // ex) 07/11 10:30
  const [rContent, setRContent] = useState("");

  const { num } = useParams();

  useEffect(() => {
    // 게시물 조회 & Readcount 올리기
    axios
      .get(`/api/boards/getBoard/${num}`)
      .then((res) => {
        setBoard(res.data.board);
      })
      .catch((err) => {
        console.log(err);
      });


    // 댓글 조회
    axios
      .get(`/api/boards/getReply/${num}`)
      .then((res) => {
        //console.log(res.data.replyList);
        setReplyList(res.data.replyList);
        //console.log("결과 : ", replyList);
      })
      .catch((err) => {
        console.log(err);
      });

    //로그인 유저 조회
    axios
      .get("/api/members/getLoginUser")
      .then((res) => {
        setLoginUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // 댓글 쓸 때 표시될 항목 생성
    const date = new Date();
    const months = String(date.getMonth() + 1).padStart(2, "0");
    const days = String(date.getDate() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const mins = String(date.getMinutes()).padStart(2, "0");
    setCDateTime(`${months}/${days}/${hours}/${mins}`);
  }, []);

  async function addRep() {
    try {
      // 댓글 추가
      await axios.post("/api/boards/addRep", {
        userid: loginUser.userid,
        content: rContent,
        num,
      });

      // 댓글 다시 조회하여 댓글리스트 갱신하기 (replyList 변수에 새 리스트가 들어가면 자동 갱신되게끔)
      const res = await axios.get(`/api/boards/getReply/${num}`);
      setReplyList([...res.data.replyList]);
    } catch (error) {
      console.error(error);
    }
    setRContent("");
  }

  async function delRep(replynum) {
    if (window.confirm("해당 댓글을 지울까예?")) {
      try {
        await axios.delete("/api/boards/delRep/" + replynum);
        const res = await axios.get(`/api/boards/getReply/${num}`);
        setReplyList([...res.data.replyList]);
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
  }

  function deleteBoard(num) {
    const pass = window.prompt('삭제할라믄 비번 치소');
    if(board.pass != pass){return alert('비밀번호 틀렸는데예!!')}
    axios.delete(`/api/boards/deleteBoard/${board.num}`)
    .then(()=>{nav('/main')})
    .catch((err)=>{console.error(err);})

  }

  return (
    <div className="boardView">
      <h2>Board View</h2>
      <div className="field">
        <label>작성자</label>
        <div>{board.userid}</div>
      </div>
      <div className="field">
        <label>이메일</label>
        <div>{board.email}</div>
      </div>
      <div className="field">
        <label>제목</label>
        <div>{board.title}</div>
      </div>
      <div className="field">
        <label>내용</label>
        <div>
          <pre>{board.content}</pre>
        </div>
      </div>
      <div className="field">
        <label>이미지</label>
        <div>
          <img
            src={`http://localhost:5000/img/${board.savefilename}`}
            style={{ width: "300px" }}
          />
        </div>
      </div>
      <div className="btns">
        <button
          onClick={() => {
            nav(`/updateBoard/${board.num}`);
          }}
        >
          UPDATE
        </button>
        <button
          onClick={() => {
            deleteBoard(board.num);
          }}
        >
          DELETE
        </button>
        <button
          onClick={() => {
            nav("/main");
          }}
        >
          BACK
        </button>
      </div>
      <br />
      <br />
      <div className="head-row">
        <div className="head-col">작성일시</div>
        <div className="head-col">작성자</div>
        <div className="head-col">내용</div>
        <div className="head-col">★</div>
      </div>

      <div className="new-rep-row">
        <div className="new-rep-col">{cDateTime}</div>
        <div className="new-rep-col">{loginUser.userid}</div>
        <div className="new-rep-col">
          <input
            type="text"
            value={rContent}
            onChange={(e) => {
              setRContent(e.currentTarget.value);
            }}
          />
        </div>
        <div className="new-rep-col">
          <button
            onClick={() => {
              addRep();
            }}
          >
            댓글 작성
          </button>
        </div>
      </div>

      {replyList.map((reply, idx) => {
        return (
          <div className="new-rep-row" key={idx}>
            <div className="new-rep-col">
              {reply.writedate.substring(5, 10)}
            </div>
            <div className="new-rep-col">{reply.userid}</div>
            <div className="new-rep-col">{reply.content}</div>
            <div className="new-rep-col">
              {loginUser.userid == reply.userid ? (
                <button onClick={()=>{
                    delRep(reply.replynum)}}>삭제</button>
              ) : (
                "★"
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BoardView;
