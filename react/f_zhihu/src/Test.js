import React, { useEffect } from "react";

// null means pause
// 1000 means 1 sec
// type DelayType = null | 1000;

let timer;
// 🔴 Finish this function
function useIncreasingCount(setCount, delay) {
  useEffect(() => {
      console.log(delay)
    if (!delay) {
      console.log("ima in")
      clearInterval(timer);
      timer = null;
    } else {
      timer = setInterval(() => {
        setCount(delay);
        delay = delay + 1;
      }, 1000);
    }
    return () => {};
  }, [delay]);
}

export default function Counter() {
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(null);

  useIncreasingCount(setCount, delay);

  // 🔴 Finish this function
  const toggleDelay = () => (delay!==null ? setDelay(null) : setDelay(1));

  return (
    <div>
      <h1>count: {count}</h1>
      <button onClick={toggleDelay}>{delay ? "pause" : "play"}</button>
    </div>
  );
}
