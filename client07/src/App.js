import './App.css';
import React, { useState } from 'react'   // 단축키 imrc



// input 태그의 사용
// input type='text' 에 입력된 내용을 state 변수로 추출하는 방법

function App() {

  // 입력란에 쓰여진 내용이 저장될 state 변수를 생성
  const [content, setContent] = useState('');
  const [contentList, setContentList] = useState([]);
  // 단어들을 배열로 저장할 배열

  // 전송버튼을 클릭하면 입력란의 값을 배열에 추가하고 입력란은 비움
  function onsubmit(){
    let tempArr = [...contentList];
    tempArr.push(content);
    setContentList([...tempArr]);
    setContent('');
  }

  return (
    <div className="App">
        <input type="text" value={content} onChange={(e)=>{
            setContent(e.currentTarget.value)
        }}/>
        {/* 입력란 입력 >> content 변수로 입력값을 전달 >> 입력란 value 값으로 복귀
        위와 같은 동작이 연속됨, 입력란의 최신 내용은 content에 계속 업데이트됨 */}
        <button onClick={()=>{
            onsubmit();
        }}>전송</button><br/>
        {
        contentList.map((con, idx)=>{
            return <div key={idx}>{con}</div>
        })
        // map 함수 안에서 배열의 요소들로 화면에 표시하려고 한다면 이렇게
        // 익명함수에다 return 명령을 사용
 
        // map 함수를 이용해서 같은 종류의 태그가 연속해서 같은 위치에 등장한다면
        // 각 태그들에 key 라는 속성을 부여해줘야 경고나 에러가 발생하지 않음.
        }
    </div>
  );
}

export default App;
