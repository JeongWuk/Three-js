import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import CommonLayout from "./layout/CommonLayout";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import Object from "./pages/Object";
import Move from "./components/Move";
import BasketBall from "./components/BasketBall";
import Game from "./components/Game";

const App = () => {
  return (
    <Routes>
      <Route element={<CommonLayout />}>
        <Route path={"/"} element={<Home />} />
        <Route element={<Object />}>
          <Route path={"/basketball"} element={<BasketBall />} />
          <Route path={"/earth"} element={<Earth />} />
          <Route path={"/moon"} element={<Moon />} />
          <Route path={"/move"} element={<Move />} />
          <Route path={"/game"} element={<Game />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
