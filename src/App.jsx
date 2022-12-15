import Game from "./containers/Game";
import Menu from "./containers/Menu";
import Score from "./containers/Score";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route path="/" element={<Menu />} />
      <Route path="/score" element={<Score />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
