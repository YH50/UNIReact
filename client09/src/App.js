import './App.css';
import React, {useState} from 'react'
import {Routes, Route} from "react-router-dom";

import Heading from './Component/Heading';
import List from './Component/List';
import Upload from './Component/Upload';


function App() {

  const [contentList, setContentList] = useState([]);

  return (
    <div className="App">
        <Heading/>
        <Routes>
          <Route path='/List' element={<List contentList={contentList}  setContentList={setContentList}/>}/>
          <Route path='/Upload' element={<Upload contentList={contentList}  setContentList={setContentList}/>}/>
        </Routes>
    </div>
  );
}

export default App;
