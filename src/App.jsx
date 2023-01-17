import { useEffect, useState, useCallback } from "react";
import "./App.css"

import ConsulHelper from './containers/ConsulHelper'
import Flow from './containers/Flow'

const pages = [
  <Flow />, 
  <ConsulHelper />
]

export default () => {
  const [page, setPage] = useState(0);

  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
        case "ArrowLeft":
          setPage(page => page > 0 ? page -1 : page)
          break;
        case "ArrowRight":
          setPage(page => page < pages.length -1 ? page +1 : page)
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

  return pages[page]
}