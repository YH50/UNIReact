import './App.css';
import Test from './Test';    // './js 페이지' 에서 함수를 import 해온다
import Login from './Login';


// Test.js 같은 파일 : 함수를 export 하는 파일 >> Component
// 누군가 그를 import 해서 하나의 태그로 사용하면 include 와 같은 형식으로 삽입이 가능함

// Component 생성 규칙
// 1. 컴포넌트 이름은 "반드시" 대문자로 시작
// 2. 컴포넌트는 다른 컴포넌트에서 사용할 수 있도록 "반드시" export 해야함
// 3. 다른 컴포넌트를 사용하려면 "반드시" import 해야함
// 4. export - import 관계에서 서로를 인식할 수 있는 이름을 "반드시" 맞춰서 사용
// 5. import 된 컴포넌트는 태그형식으로 사용하며 필요에 따라 여러번 표시되도록 태그를 필요한 곳에 여러번 사용 가능

function App() {
    return (
        <div className="App">
            <h1>Vamos Hacerlo</h1>
            <Test />
            <h1>Vamos Hacerlo</h1>
            <Test />
            <h1>Formulario De Entrada</h1>
            <Login/>
        </div>
    );
}

export default App;
