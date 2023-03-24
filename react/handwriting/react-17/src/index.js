import React from './react';
import {render} from './react/react-dom'

function App() {
    return React.createElement("div", null, React.createElement("p", null, "1"), React.createElement("p", null, "2"));
  }
  function App2() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "1"), /*#__PURE__*/React.createElement("p", null, "2"), /*#__PURE__*/React.createElement("p", null, "3"));
  }
// debugger;
console.log(App())
render(App(), document.getElementById('root'));
// ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

