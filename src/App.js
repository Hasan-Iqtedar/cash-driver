import { Route, Routes, Navigate } from "react-router-dom";
import { GlobalProvider } from "./contexts/globalState";
import NavigationPanel from "./components/NavigationPanel";
import Container from "./components/Container";
import Header from "./components/Header";
import Settings from "./pages/Settings";
import UserForm from "./pages/UserForm";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import "./styles/app.css";

function App() {
  return (
    <GlobalProvider>
      <div className="app">
        <NavigationPanel />
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-user" element={<UserForm />} />
          </Routes>
        </Container>
      </div>
    </GlobalProvider>
  );
}

export default App;
