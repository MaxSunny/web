import React from "react";
import { createData } from "./data";
let init = {
  count: 0,
  info: {
    age: 18,
  },
};
const dataObj = createData(init);
dataObj.subscribe(() => {
  let currentData = dataObj.getData();
  console.log(currentData);
});
export default function Index() {
  return (
    <div>
      <button
        onClick={() => {
          dataObj.changeData({ num: 0 }); //对数据没做约束，不清楚的容易出问题，导致获取数据获取不到
        }}>
        change 1
      </button>
      <button
        onClick={() => {
          dataObj.changeData({
            ...dataObj.getData,
            count: dataObj.getData.count + 1,
          });
        }}>
        change 2
      </button>
    </div>
  );
}
