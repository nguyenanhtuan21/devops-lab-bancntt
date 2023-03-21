import "./App.css";
import TodoList from "./components/TodoList";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const route = [
    {
      element: TodoList,
      path: "/",
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {route.map((e) => {
          const Component = e.element;
          return (
            <Route exact={e?.exact} path={e.path} element={<Component />} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
