import React from "./react";
import { render } from "./react/react-dom";

function App() {
  return React.createElement(
    "div",
    {
      className: "text",
    },
    React.createElement(
      "p",
      null,
      React.createElement("span", null, "11"),
      React.createElement("span", null, "12")
    ),
    React.createElement("p", null, "2")
  );
}
function App2() {
  return React.createElement(
    "div",
    {
      style: {
        color: "red",
      },
      id: "div",
    },
    React.createElement(
      "p",
      null,
      React.createElement("span", null, "11"),
      React.createElement("span", null, "12")
    ),
    React.createElement("p", null, "2"),
    React.createElement("p", null, "3")
  );
}
// debugger;
console.log(App2());
render(App(), document.getElementById("root"));
setTimeout(() => {
  render(App2(), document.getElementById("root"));
}, 1000);
// ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
