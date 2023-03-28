export const createData = function (init) {
  let data = init;
  let deps = [];
  function subscribe(handler) {
    //we hopes,subscribe the data,when data change,the handlers can run
    deps.push(handler);
  }

  //相当于改变redux中store的值
  function changeData(newData) {
    //我们提供一个方法，去改变数据，数据改变时，订阅的handler执行
    data = newData;
    deps.forEach(fn => fn());
  }

  //相当于获取store值
  function getData() {
    //获取数据
    return data;
  }
  return {
    getData,
    subscribe,
    changeData,
  };
};
