import './App.css';
import React, {useState} from 'react'

// state 변수를 만들어서 그 변수 값에 따라 (true, false) 
//<h2>App.js Component</h2>가 보이거나 안보이게 하는 버튼 만들기

function App() {
  const [temp, setTemp] = useState(true);
  return (
    <div className="App">
      {/* return() 안에서는 if-else 를 쓸 수 없으므로
      대신 삼항연산자인 ()?():()  를 사용함  */}
      
        <button onClick={()=>{
          setTemp(!temp);
        }}>{(temp)?'숨기기':'보이기'}</button>
      {
        (temp)?(<h2>App.js Component</h2>):(null)
      }
    </div>
  );
}

export default App;
