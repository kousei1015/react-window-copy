import InfiniteScroll from "./infiniteScroll";

const App = () => {
  const largeArray = Array.from({ length: 100 }, (_, index) => ({
    content: `Item ${index + 1}`,
  }));
  return (
    <div>
      <InfiniteScroll itemSize={50} itemLength={largeArray.length} height={300}>
        {largeArray.map((item) => item.content)}
      </InfiniteScroll>
    </div>
  );
};

export default App;
