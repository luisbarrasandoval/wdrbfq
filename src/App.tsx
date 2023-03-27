import { DashBoradProvider } from "./context/Dashboard";
import Columns from "./components/Columns";
import Header from "./components/Header";
import AllData from "./components/AllData";

const data = [
  {
    name: "todos",
    url: "https://jsonplaceholder.typicode.com/todos",
    backgroundColor: "#d4383e",
    contrastColor: "white",
    width: "auto",
  },
  {
    name: "post",
    url: "https://jsonplaceholder.typicode.com/posts",
    backgroundColor: "#18655b",
    contrastColor: "white",
    width: "auto",
  },
  {
    name: "comments",
    url: "https://jsonplaceholder.typicode.com/comments",
    backgroundColor: "#a26644",
    contrastColor: "white",
    width: "auto",
  },
  {
    name: "Productos",
    url: "https://fakestoreapi.com/products",
    backgroundColor: "#b3b",
    contrastColor: "white",
    width: "auto",
  },
];

export default function App() {
  return (
    <DashBoradProvider data={data.sort(() => Math.random() - 0.5)}>
      <Header />
      <AllData />
      <Columns />
    </DashBoradProvider>
  );
}
