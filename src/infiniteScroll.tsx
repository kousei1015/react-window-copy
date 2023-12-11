import { useRef, useState, useEffect, useMemo } from "react";
import { Props } from "./types";

const InfiniteScroll = ({ itemLength, itemSize, height, children }: Props) => {
  // コンテナ要素のためのrefを作成
  const containerRef = useRef<HTMLDivElement>(null);

  // どこからどこまでの要素をレンダリングするかを決定するためのStateを宣言
  const [startIndex, setStartIndex] = useState(0);
  const [stopIndex, setStopIndex] = useState(height / itemSize);

  // スクロールイベントをアタッチし、上に書いたStateを更新
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const scrollTop = container!.scrollTop;
      const start = Math.floor(scrollTop / itemSize);
      const stop = Math.floor((scrollTop + container!.clientHeight) / itemSize);

      setStartIndex(start);
      setStopIndex(stop);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [itemLength, itemSize]);

  // 画面内に表示する要素を抜き出す
  const visibleItems = useMemo(() => {
    console.log("rendered!"); // レンダリング時にコンソールログを出力
    return (children as Array<string>).slice(startIndex, stopIndex + 1);
  }, [startIndex, stopIndex]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: `${height}px`,
        backgroundColor: "gray",
        overflowY: "auto",
      }}
    >
      <div
        style={{ position: "relative", height: `${itemLength * itemSize}px` }}
      >
        {visibleItems.map((item, index) => (
          <div
            key={item}
            style={{
              position: "absolute",
              top: `${startIndex * itemSize + index * itemSize}px`,
              width: "100%",
              height: `${itemSize}px`,
              outline: "1px solid black",
              textAlign: "center",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
