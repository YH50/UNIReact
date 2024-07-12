import React, { useState, useEffect } from 'react'
import axios from 'axios'


function List(props) {
  const [members, setMembers] = useState([]);

    useEffect(
      ()=>{
        // 멤버를 조회해서 members 변수에 저장하고 아래 return 에서 전송받은 데이터를 화면에 출력하기
        axios.get('/api/getmember')
        .then((result)=>{
          //console.log('출력 결과');
          //console.log(result.data);
          setMembers([...result.data])
        })
        .catch((err)=>{
          console.error(err);
        })
      },[]  //  useEffect 가 실행될 조건 : 대괄호 안 넣으면 계속 돌림
      // 주의) [] 안에 넣는 변수를 함수 내에서 변경하지 말 것
    )
  
  return (
    <div>
        {/* props 로 전달된 배열을 내용에 적절하게 출력하기 */}
        {
            members.map((content, idx)=>{
                return (<div key={idx}>userid:{content.userid}, pwd:{content.pwd}, name:{content.name}, phone: {content.phone} </div>)
            })
        }
    </div>
  )
}

export default List
