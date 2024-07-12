import React from 'react'
import {Link} from 'react-router-dom';

function Heading() {
  return (
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", padding:"10px"}}>
        <Link to="/">HOME</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Upload">UPLOAD</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/List">LIST</Link>&nbsp;&nbsp;&nbsp;
    </div>
    // return문 내에서 직접 css 스타일 속성 지정 시 {{}} 형태로 써줘야함
    // 스타일 내용이 객체 ({}) 형식으로 전달돼야 하고 JSX 형식의 객체로 구성된 스타일이 지정되므로
    // style = {} 중괄호 안에 {} 객체가 전달되는 형식.
  )
}

export default Heading
