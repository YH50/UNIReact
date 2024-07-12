import React, {useState, useEffect} from 'react'
// React 에는 다른 프레임과 달리 특별한 변수 존재 >> 'state' 변수
// 2번째 줄과 같이 useState 함수를 import 하는 설정을 해줘야 사용이 가능함
// state 변수 : 페이지 내에서 사용할 수 있는 전역 변수 정도로 일단 이해할 것.
// >> 변수의 값이 바뀔 때마다 자동으로 페이지가 re-rendering 되는 변수. (Test 함수가 한번 더 호출됨)
import './Test.css'

function Test() {

    // 함수 내에서 이 페이지에서 사용할 state 변수를 생성 및 초기화함
    const [temp, setTemp] = useState(50);
    // temp : 변수 이름, setTemp : temp 변수의 값을 바꿀 수 있는 setter "함수"
    // useState(0) : temp 변수에 0으로 초기화하면서  temp 변수와 setTemp 함수를 생성


    // useEffect() : useState 와 같이 중요하고 특별한 역할을 가진 함수.
    // 누가 호출하지 않아도 페이가 처음 로딩될 때 자체적으로 호출이 실행됨
    // 실행 조건을 달아두면 그 조건에 따라 추가로 호출됨

    // ** 사용자가 임의로 호출하는 함수는 아님
    useEffect(()=>{
        console.log("Changed Temp : ", temp);
    }, [temp]);


    let str = 'Test Component';
    console.log(`${str} 가 rendering 됩니다`);

  return (
    <div>
        <h1 className="test">Test Component</h1>
        <h2>temp 변수 값 : {temp} &nbsp; </h2>
        {/* 리턴 html 안에서 스크립트 영역의 변수의 값을 같이 출력하고 싶다면 이처럼 출력하거나
        스크립트 연산을 하고 싶다면 위처럼 중괄호를 써서 표시함 ({temp}) */}
        <button onClick={()=>{
            // temp = temp + 1      >> ERROR !!
            setTemp(temp + 1);
        }}>temp 변수 값 +1 하기 </button>
        {/* 버튼을 생성하고 onclick 이벤트에 스크립트 명령을 연결하고 싶다면 위처럼 onclick={} 으로 작성.
        다만 중괄호 안에 직접 명령을 쓰지 않고 onclick={()=>{}} 처럼 익명화살표함수를 넣어서 명령들을 넣음. */}
    </div>
  )
}

export default Test

// state 변수의 값은 return 내부에서 제한 없이 사용이 가능함
// 다만 값의 변경은 반드시 setTemp 를 이용해야 함
// return 내에서 JSX(자바스크립트 문법)를 사용하려면 { } 안에서 사용.
// temp 변수값 표현 : {temp}
// onclick 에 JSX 명령을 연결하려면 onclick="함수명()" 을 사용하지 않고 onclick={()=>{}} 형식을 사용함.
// return 문 외부에 별도의 함수를 정의해놓고 그 함수를 호출할 때도 있음
// >> onclick = { 함수명(); }
