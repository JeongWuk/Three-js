import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CommonLayout from "./layout/CommonLayout";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import Object from "./pages/Object";
import Move from "./components/Move";

const App = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />}>
        <Route path={"/"} element={<Home />} />
        <Route element={<Object />}>
          <Route path={"/earth"} element={<Earth />} />
          <Route path={"/moon"} element={<Moon />} />
          <Route path={"/move"} element={<Move />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
