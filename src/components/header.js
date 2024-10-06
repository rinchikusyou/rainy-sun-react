import React, { useContext } from "react";
import styles from "../styles/header.module.css";
import { Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-provider";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);

  const isAuthPage =
    location.pathname.includes("login") ||
    location.pathname.includes("registration");

  const goTo = () => {
    navigate(isAuthPage ? "/" : "/login");
  };

  const logOut = () => {
    authContext?.setUserData(null);

    localStorage.removeItem("user");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <Button
          variant="contained"
          onClick={authContext?.userData?.isAuth ? logOut : goTo}
        >
          {authContext?.userData?.isAuth
            ? "Log out"
            : isAuthPage
            ? "Main"
            : "Sign in"}
        </Button>
        {authContext?.userData && (
          <Typography>{authContext.userData.email}</Typography>
        )}
      </div>
    </header>
  );
};

export default Header;
