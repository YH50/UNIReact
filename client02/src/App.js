import logo from './logo.svg';
import './App.css';

// function app(){} : 하나의 태그를 구성해서 리턴해주느 ㄴ함수
// App() 함수는 index.js 에서 import 되고 그 내용은 public 폴더의 index.html 중 id = root 인 div 태그에 내용을 넣어줌
// 아래 함수의 return 내부 내용이 index.html 에 표시될 예정이며, 내용의 변경은 저장 즉시 반영됨.




function App() {
  return (
    // 리턴되는 태그는 반드시 하나의 태그로 묶여있어야 함
    // 최상위 태그는 반드시 div이어야만 하는 것은 아님 >> 묶여있기만 하면 됨
    // >>> '<> </>' 같은 태그를 많이 사용함
    <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>집. 보내.달라. 당장. NOW</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    {/* html 파일에서는 <!-- --> 를 주석 구문으로 사용하나
    현재 영역에서는 리턴값들의 영역이기에 주석기호가 이처럼 중괄호 & 자바스크립트 주석문 형식으로 사용됨 */}

    {/* 태그의 id는 이전과 같은 형식으로 사용하나 class는 className 이라는 이름으로 사용함 (대소문자 구분 必) */}
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
    </>
  );
}

export default App;
