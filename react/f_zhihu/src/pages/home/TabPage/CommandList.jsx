import React, { useEffect, useRef } from "react";
import { useState } from "react";
import commandListData from "../../../mock/commandList.mock";
const CommandData = ({ item }) => {
  const [selected, setSelected] = useState(false);
  const handleClick = event => {
    event.preventDefault();
    setSelected(!selected);
  };
  return (
    <div className=' flex flex-col items-start p-4 border-b'>
      <div className=' h-auto'>
        <a className=' font-bold text-lg ledning-10' href='/'>
          {item?.target?.question?.title || item?.target?.title}
        </a>
      </div>
      <div className=' leading-6'>
        {selected ? (
          <div
            dangerouslySetInnerHTML={{ __html: item?.target?.content }}></div>
        ) : (
          <a
            href='/'
            onClick={handleClick}
            className=' cursor-pointer hover:text-gray-600 text-gray-800 line-clamp-2'>
            {item?.target?.excerpt.substring(0, 90) + "..."}
            <span className=' text-base leading-7 text-blue-500'>
              阅读全文&gt;
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default function CommandList() {
  const scrollRef = useRef(null);
  const [list, setList] = useState(commandListData.slice(0, 5));
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(function (enters) {
      enters[0].isIntersecting &&
        setList(list => [...list, ...commandListData]);
    });
    intersectionObserver.observe(scrollRef.current);
    return () => {
      intersectionObserver.unobserve(scrollRef.current);
      intersectionObserver = void 0;
    };
  }, []);
  return (
    <div>
      {list.map((item, idx) => (
        <CommandData key={item.id + idx} item={item} />
      ))}
      <div ref={scrollRef}>Loading...</div>
    </div>
  );
}
