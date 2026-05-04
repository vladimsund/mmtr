import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ROUTES, Header } from "@/shared";
import {
  LoginPage,
  BoardsPage,
  RegistrationPage,
  BoardPage,
  NotFoundPage,
} from "@/pages";

import { AuthProvider } from "./provider";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Header />
        <Routes>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.BOARDS} />} />
          <Route path={ROUTES.AUTH} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
          <Route
            path={ROUTES.BOARDS}
            element={
              <AuthProvider>
                <BoardsPage />
              </AuthProvider>
            }
          />
          <Route
            path={ROUTES.MY_BOARD}
            element={
              <AuthProvider>
                <BoardPage />
              </AuthProvider>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;
