import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import styles from "../styles/auth.module.css";
import { Link, useLocation } from "react-router-dom";
import { toAuth } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../components/auth-provider";

const AuthPage = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const isLogin = location.pathname.includes("login");

  const onSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      username,
      email,
      password,
    };

    if (isLogin) {
      delete submitData["username"];
    }

    toAuth(submitData, isLogin).then((data) => {
      if (data?.message) {
        setError(data.message);
      } else {
        const userAuthData = jwtDecode(data.token);

        localStorage.setItem("user", JSON.stringify(userAuthData));

        authContext.setUserData({ ...userAuthData, isAuth: true });
      }
    });
  };

  return (
    <Container>
      <Paper className={styles.formPaper}>
        <form className={styles.form}>
          <Typography sx={{ fontSize: "1.5rem", textAlign: "center" }}>
            {isLogin ? "Login" : "Registration"}
          </Typography>
          {!isLogin && (
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="username"
                id="username"
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
            />
          </FormControl>
          {error && <Typography color="error">{error}</Typography>}
          <Button type="button" onClick={onSubmit} variant="outlined">
            Submit
          </Button>
          <Link to={isLogin ? "/registration" : "/login"}>
            {isLogin ? "To Reg" : "To Auth"}
          </Link>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthPage;
