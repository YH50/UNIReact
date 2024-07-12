import React from 'react'
import {Link} from 'react-router-dom';

function Heading() {
  return (
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", padding:"10px"}}>
      {/* HOME, JOIN, LIST 메뉴 구성하기 */}
        <Link to="/">HOME</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Join">JOIN</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/List">LIST</Link>&nbsp;&nbsp;&nbsp;
    </div>
  )
}

export default Heading
