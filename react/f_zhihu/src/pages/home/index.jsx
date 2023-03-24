import React, { useEffect, useState } from "react";
import Navigator from "../../components/Navigator";
import Card from "../../components/Card";
import TabPages from "./TabPage";
export default function Index() {
  const [hide, setHide] = useState(true);
  const handleChange = isHide => {
    setHide(isHide);
  };
  return (
    <div className=' bg-gray-100'>
      <Navigator hide={hide}></Navigator>
      <div className=' mx-auto w-320 max-w-7xl flex my-2 px-20'>
        <Card className=' w-2/3'>
          <TabPages onChange={handleChange} />
        </Card>
        <div className=' w-1/3'>
          <Card className=' w-full'>右边的Tab</Card>
        </div>
      </div>
    </div>
  );
}
