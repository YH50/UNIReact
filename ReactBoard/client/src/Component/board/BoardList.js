import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../style/board.css";

function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [paging, setPaging] = useState({});
  const [beginend, setBeginEnd] = useState([]);

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get("/api/boards/getBoardList/1")
      .then((res) => {
        setBoardList([...res.data.boardList]);
        //console.log(res.data.BoardList);
        setPaging(res.data.paging);

        const pageArr = [];
        const {beginPage, endPage} = res.data.paging;
        for (
          let i = res.data.paging.beginPage;
          i <= res.data.paging.endPage;
          ++i
        ) {
          pageArr.push(i);
        }
        setBeginEnd([...pageArr]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(
    ()=>{
      window.addEventListener('scroll', Scroller);
      // >> window에 scroll 이벤트 발생 시 Scroller 함수를 호출하여 실행하라는 뜻

      // 컴포넌트 종료 시
      return ()=>{
        // scroller eventListener 해제
        window.removeEventListener('scroll', Scroller);
      }
    }
  )

  const Scroller = ()=>{
    const scrheight = document.documentElement.scrollHeight - 10;       // scroll 가능한 크기
    const scrtop = document.documentElement.scrollTop;             // 현재 위치
    const clntheight = document.documentElement.clientHeight;     // 내용물의 크기
    // 스크롤을 시도하여 이동한 현재 위치값에 내용물 크기를 더한 값이 스크롤할 수 있는 크기를 넘어섰다면
    // >> 화면 밑에까지 스크롤을 내렸다면?
    if(scrtop + clntheight >= scrheight){
      onPageMove(Number(paging.page) + 1);
    }
  }


  function onBoardView(num) {
    nav(`/boardView/${num}`);
  }

  function onPageMove(page) {
    // 매개변수로 전달된 페이지로 게시물 검색 후 리스트를 갱신하기
    

    // 스크롤 방식

        axios.get(`/api/boards/getBoardList/${page}`)
        .then((res)=>{
          setPaging(res.data.paging);
          let boards = [];
          boards = [...boardList];    // 현재 boardList 내용 복사
          boards = [...boards, ...res.data.boardList];   // 새로 조회한 페이지의 목록과 병합(Merge)
          setBoardList([...boards]);      // Merge된 리스트를 boardList로 복사


          })
        .catch((err) => {
          console.error(err);
        });



    // paging 표시 방식 (근데 나 안되는데..?)


    // axios.get(`/api/boards/getBoardList/${page}`)
    // .then((res)=>{
    //   setBoardList([...res.data.boardList]);
    //   console.log(res.data.boardList);
    //   setPaging(res.data.paging);
    //   const pageArr = [];
    //     for (
    //       let i = res.data.paging.beginPage;
    //       i <= res.data.paging.endPage;
    //       ++i
    //     ) {
    //       pageArr.push(i);
    //     }
    //     setBeginEnd([...pageArr]);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    }
  

  return (
    <div className="boardList">
      <div className="titlerow">
        <div className="titlecol">번호</div>
        <div className="titlecol">제목</div>
        <div className="titlecol">글쓴이</div>
        <div className="titlecol">작성일</div>
        <div className="titlecol">조회수</div>
      </div>
      {boardList.map((board, idx) => {
        return (
          <div className="row" key={idx}>
            <div className="col">{board.num}</div>
            <div
              className="col"
              onClick={() => {
                onBoardView(board.num);
              }}
            >
              {board.title}
            </div>
            <div className="col">{board.userid}</div>
            <div className="col">{board.writedate.substring(0, 10)}</div>
            <div className="col">{board.readcount}</div>
          </div>
        );
      })}
{/* 
      <div id="paging">
        {
          (paging.prev) ? (
            <span
              style={{ cursor: "default" }}
              onClick={() => {
                onPageMove(paging.beginPage - 1);
              }}
            >
              &nbsp;◀&nbsp;
            </span>
          ) : (<></>)
        }
        {
          (beginend)?(
          beginend.map((page, idx)=>{
          return (
           <span style={{cursor:'default'}} onClick={
            ()=>{onPageMove(paging.beginPage-1)}
           }>&nbsp;{page}&nbsp;</span>
           )
           })
           ):(<></>)
        }
        {
         (paging.next)?(
          <span style={{cursor:'default'}} onClick={
           ()=>{onPageMove(paging.beginPage+1)}
           }>&nbsp;▶&nbsp;</span>
           ):(<></>)
        }
      </div> */}
    </div>
  );
}

export default BoardList;
