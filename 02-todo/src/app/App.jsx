import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
    <Router>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.AUTH} />} />
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
  );
}

export default App;
