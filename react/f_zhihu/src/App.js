import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import CommandList from "./pages/home/TabPage/CommandList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='' element={<CommandList />} />
          <Route path='follow' element={<div>关注</div>}></Route>
          <Route path='hot' element={<div>热榜</div>}></Route>
          <Route path='zvideo' element={<div>视频</div>}></Route>
        </Route>
        <Route path='/xen' element={<div>会员</div>}></Route>
        <Route path='/explore' element={<div>发现</div>}></Route>
        <Route path='/waiting' element={<div>等你来答</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
