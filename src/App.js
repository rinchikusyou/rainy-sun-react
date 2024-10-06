import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/main";
import AuthPage from "./pages/auth";
import { ThemeProvider } from "@emotion/react";
import { THEME } from "./utils/theme";
import Header from "./components/header";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/auth-provider";

function App() {
  const authContext = useContext(AuthContext);

  const isAuth = authContext?.userData?.isAuth;

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      authContext?.setUserData({ ...JSON.parse(user), isAuth: true });
    }
  }, []);

  return (
    <ThemeProvider theme={THEME}>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {!isAuth && (
          <>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/registration" element={<AuthPage />} />
          </>
        )}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
