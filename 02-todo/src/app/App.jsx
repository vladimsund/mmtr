import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { BoardProvider } from "@/entities";
import { Auth, Boards, Register, MyBoard } from "@/pages";
import { Header } from "@/widgets";
import { ROUTES } from "@/shared";

function App() {
  return (
    <BoardProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path={ROUTES.AUTH} element={<Auth />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.BOARDS} element={<Boards />} />
          <Route path={ROUTES.MY_BOARD} element={<MyBoard />} />
        </Routes>
      </Router>
    </BoardProvider>
  );
}

export default App;
