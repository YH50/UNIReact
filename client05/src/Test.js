import React, {useState, useEffect} from 'react'
import './Test.css'

function Test() {

    const [temp, setTemp] = useState('Test');
    // state 변수에는 어떤 형태의 자료형으로 초기화가 가능함
    // const [tempArr, setTempArr] = useState([1,2,3])      >> 이렇게도 초기화 가능

    // 반드시 배열 값이 하나 이상 존재하지 않아도 됨
    // >>> const [tempObj, setTempObj] = useState({});
    const [tempArr, setTempArr] = useState([]);
    const [number, setNumber] = useState(10);

    useEffect(
        ()=>{
           // tempArr.push(number);     >> 이거보다 밑에를 더 많이 씀
            let arr = [];
            arr = [...tempArr];
            arr.push(number);
            setTempArr([...arr]);
        }, [number]
    );

    // (result)?(<></>):(null);     >> 에러 나고 난리나면 이렇게 삼항연산 쓸거임
    
    return (
    <div>
      <h2>{temp} Component {number}</h2>
      <h2>{tempArr}</h2>
      <button onClick={()=>{
        setNumber(number + 1);
        // tempArr.push(number);
      }}>배열 요소 추가하기</button>
      {/* setNumber 와 같은 state 변수 변경 함수 >> 대표적인 비동기함수 */}
    </div>
  )
}

export default Test
