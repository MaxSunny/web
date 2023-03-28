export const createData = function (init, mySetData) {
  let deps = [];
  let data = init;

  function subscribe(handler) {
    // 我们希望，订阅了数据的handler，在数据改变时，都能执行。
    deps.push(handler);
  }

  function hardSetData(deal) {
    data = mySetData(data, deal);
    deps.forEach(fn => fn());
  }

  // 如果别人想要获取数据？
  function getData() {
    return data;
  }

  return {
    getData,
    subscribe,
    hardSetData,
  };
};

export const combination = setDatas => {
  const setKeys = Object.keys(setDatas);
  return (data = {}, deal) => {
    const newData = {};
    setKeys.forEach(key => {
      const setData = setDatas[key];
      const preData = data[key];
      const nextData = setData(preData, deal);
      newData[key] = nextData;
    });
    return newData;
  };
};
