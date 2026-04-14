import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { BoardProvider } from "@/entities";
import { Header } from "@/widgets";
import { ROUTES } from "@/shared";
import {
  AuthPage,
  BoardsPage,
  RegisterPage,
  BoardPage,
  NotFoundPage,
} from "@/pages";

function App() {
  return (
    <BoardProvider>
      <Router>
        <Header />
        <Routes>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.AUTH} />} />
          <Route path={ROUTES.AUTH} element={<AuthPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.BOARDS} element={<BoardsPage />} />
          <Route path={ROUTES.MY_BOARD} element={<BoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </BoardProvider>
  );
}

export default App;
