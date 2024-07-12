import './App.css';

import {Routes, Route} from "react-router-dom";
import A from './Component/A';
import B from './Component/B';
import C from './Component/C';

function App() {
  return (
    <div className="App">
        {/* <h1>App Component</h1> */}
        <a href="/A">Move To A</a>&nbsp;&nbsp;&nbsp;
        <a href="/B">Move To B</a>&nbsp;&nbsp;&nbsp;
        <a href="/C">Move To C</a>&nbsp;&nbsp;&nbsp;

        <Routes>
          <Route path='/A' element={<A/>}/>
          <Route path='/B' element={<B/>}/>
          <Route path='/C' element={<C/>}/>
        </Routes>
    </div>
  );
}

export default App;
