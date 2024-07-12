import React from 'react'

function List(props) {
  return (
    <div>
        {/* props 로 전달된 배열을 내용에 적절하게 출력하기 */}
        {
            props.contentList.map((content, idx)=>{
                return (<div>userid:{content.userid}, pwd:{content.pwd}, name:{content.name}, phone: {content.phone} </div>)
            })
        }
    </div>
  )
}

export default List
