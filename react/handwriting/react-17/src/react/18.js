const peek = arr => arr[0];
const queue = [];

const threshold = 1000 / 60;

const transtion = [];

let deadline = 0;

const now = () => {
  performance.now();
};
export function startTranstion(cb) {
  transtion.push(cb) && postMessage();
}

export function schedule(cb) {
  queue.push({ cb });
  startTranstion(flush);
}

//类似于request
function flush() {
  deadline = now() + threshold;
  let task = peek(queue);

  //如果说，我的task，返回的是一个函数，那么下一次，接着跑
  while (task && !shouldYield()) {
    const { cb } = task;
    task.cb = null;
    const next = cb();
    if (next && typeof next === "function") {
      task.cb = next;
    } else {
      queue.shift();
    }
    task = peek(queue);
  }
  task && startTranstion(flush);
}

function shouldYield() {
  return navigator.scheduling.isInputPending() || now() >= deadline;
}

//触发宏任务
const postMessage = (() => {
  const cb = () => transtion.splice(0, 1).forEach(c => c());
  const { port1, port2 } = new MessageChannel();
  port1.onmessage = cb;
  return () => port2.postMessage(null);
})();
