import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [bool, setBool] = useState(true);

  return (
    <div className="App">
      <h2>hello</h2>
      <div id="list">
        <ul>
          <li>list 1</li>
          <li>list 2</li>
          <li>list 3</li>
          <li>list 4</li>
          <li>list 5</li>
          <li>{bool?'list 6':'list 60'}</li>
        </ul>
      </div>
      <button onClick={() => setBool(false)}>__</button>
    </div>
  );
}

export default App;
