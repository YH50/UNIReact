import React from 'react'
import './Login.css';

// css 파일 : 위 2번 줄 문장처럼 import 하여 적용 가능
// 현재 위치는 html 태그 내부가 아닌 react(JSX) 내부이므로 <link> 태그가 사용 불가함
// 이렇게 만들어진 css 파일들의 적용은 최종 index.html 에서 적용되는 것이기 때문에
// 암만 파일을 쪼개고 component 가 다르더라도 css 내부의 selector 가 모든 index.html 내용에 영향을 끼침.


function Login() {
  return (
    <div>
        <form>
            아이디 : <input type='text'/><br/>
            패스워드 : <input type='password'/><br/>
            <button>로그인</button>
        </form>
    </div>
  )
}

export default Login
