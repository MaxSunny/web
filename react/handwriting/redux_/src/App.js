import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Actions from "./1_actions/Index";
import Data from "./2_data/Index";
import Hard from "./3_hard/Index";

import ReduxCom from "./5_Redux/Index";

import Hello from "./Hello";

// import MobxCom from "./6_mobx/A";

function App() {
  return (
    <BrowserRouter className='App'>
      <Routes>
        <Route path='/actions' element={<Actions />} />
        <Route path='/data' element={<Data />} />
        <Route path='/hard' element={<Hard />} />
        <Route path='/reduxCom' element={<ReduxCom />} />
        <Route path='/hello' element={<Hello />} />
        {/* <Route path='/mobxcom' element={<MobxCom />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
