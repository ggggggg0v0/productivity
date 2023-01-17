import { useEffect, useState, useCallback } from "react";
import "./App.css"

import ConsulHelper from './containers/ConsulHelper'
import Flow from './containers/Flow'

export default () => {
  const [page, setPage] = useState(0);

  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
        case "ArrowLeft":
          setPage(page => page -1)
          break;
        case "ArrowRight":
          setPage(page => page +1)
          break;
    }
  }, [page]);

  useEffect(() => {
    // 監聽頁面的鍵盤事件
    document.addEventListener("keydown", handleKeyPress);
    // 在組件卸載時移除監聽
    return () => {
        document.removeEventListener("keydown", handleKeyPress);
    };
  },[]);

  return [
    <Flow />, 
    <ConsulHelper />
  ][page]
}