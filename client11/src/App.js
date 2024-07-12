import './App.css';
import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import Join from './Component/Join';
import List from './Component/List';
import Heading from './Component/Heading';


function App() {

  const [contentList, setContentList] = useState([]);
  return (
    <div className="App">
      <Heading/><br/>
      <Routes>
          <Route path='join' element={<Join contentList={contentList} setContentList={setContentList}/>}></Route>
          <Route path='list' element={<List contentList={contentList} setContentList={setContentList}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
