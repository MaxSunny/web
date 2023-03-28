import React, { useEffect } from "react";
import action from "./action";
export default function Index() {
  useEffect(() => {
    action.on("test", data => {
      console.log(data);
    });
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          action.emit("test", "hello world");
        }}>
        test
      </button>
    </div>
  );
}
