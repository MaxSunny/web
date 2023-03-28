//发布订阅模式  因为全局公用一份 所以 不用单独写发布者 订阅者
class action {
  static deps = {};
  //订阅事件
  on = (type, handler) => {
    action.deps[type] = action.deps[type] ? action.deps[type] : [];
    action.deps[type].push(handler);
  };

  //发布事件 相当于redux里的dispatch
  emit = (type, data) => {
    action.deps[type] instanceof Array &&
      action.deps[type].forEach(fn => {
        fn(data);
      });
  };
}

export default new action();
