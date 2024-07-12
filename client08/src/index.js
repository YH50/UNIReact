import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {BrowserRouter, Routes, Route} from "react-router-dom";
import A from './Component/A';
import B from './Component/B';
import C from './Component/C';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    {/* 컴포넌트가 BrowserRouter 안에서 route 로 바인딩되지 않고 태그로 사용되었다면
          항상 화면에 표시하겠다는 뜻 >> 그리고 아래 Route들에 의해 선택된 컴포넌트가 아래에 선택 표시됨 */}
    <App/>
       {/* App 컴포넌트는 그대로 있고 A,B,C만 바뀌게끔 */}
      {/* <Routes>
        <Route path='/A' element={<A/>}></Route>
        <Route path='/B' element={<B/>}></Route>
        <Route path='/C' element={<C/>}></Route>
      </Routes> */}


      {/*
       <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/A' element={<A/>}></Route>
        <Route path='/B' element={<B/>}></Route>
        <Route path='/C' element={<C/>}></Route>
      </Routes>
      */}
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
