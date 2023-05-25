import { useGetStudentsQuery } from "./store/studentApi";
import StudentList from "./components/StudentList/StudentList";

function App() {
  // 调用api查询数据
  // 钩子函数会返回一个对象作为返回值，请求过程中的相关数据都在该对象中存储
  const {
    data: stus,
    isSuccess,
    isLoading,
    refetch
  } = useGetStudentsQuery()


  return (
    <div className="App">
      <button onClick={() => refetch()}>刷新</button>
      {isLoading && <p>数据加载中。。。</p>}
      {isSuccess && <StudentList stus={stus}></StudentList>}
    </div>
  );
}

export default App;
