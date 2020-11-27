import React, { useState, useLayoutEffect } from "react";

import {
  Button,
  TextField,
  Checkbox,
  Container,
  Typography,
  withStyles,
  Link,
} from "@material-ui/core";

import Firebase from "../services/FirebaseConnect";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgEmail, setMsgEmail] = useState("");
  const [msgSenha, setMsgSenha] = useState("");
  const [lembreme, setLembreme] = useState(false);

  useLayoutEffect(() => {
    let emailStorage = localStorage.getItem("email");
    let passwordStorage = localStorage.getItem("password");
    if (emailStorage && passwordStorage) {
      setEmail(emailStorage);
      setPassword(passwordStorage);
      setLembreme(true);
    }
  }, []);

  const cadastrar = () => {
    history.push("/cadastrar");
  };

  const login = () => {
    if (lembreme == false) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((retorno) => {
        sessionStorage.setItem("uuid", retorno.user.uid);
        if (lembreme === true) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        }
        setMsg("");
        history.push("/menu");
      })
      .catch((erro) => {
        console.log(erro);
        setMsg("Usuário ou senha inválidos!");
      });
  };

  const ColorButton = withStyles((theme) => ({
    root: {
      color: "#fff",
      backgroundColor: "#ffb816" /*green[500]*/,
      "&:hover": {
        backgroundColor: "#ffb816" /*green[700]*/,
      },
    },
  }))(Button);

  const ColorButtonCadastar = withStyles((theme) => ({
    root: {
      color: "#fff",
      backgroundColor: "#000000" /*green[500]*/,
      "&:hover": {
        backgroundColor: "#000000" /*green[700]*/,
      },
    },
  }))(Button);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
            <img src="logo.png" />
          </div>

          <div className="mt-4">
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="E-mail"
              size="small"
              type="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Senha"
              size="small"
              type="password"
              autoFocus
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Checkbox
              color="default"
              checked={lembreme}
              onChange={(e) => setLembreme(e.target.checked)}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
            Lembre-me
            <p fullWidth className="text-center mt-2 mensagemErro">
              {msg}
            </p>
            <ColorButton
              fullWidth
              type="button"
              onClick={login}
              variant="contained"
              color="primary"
              size="large"
              className="mb-3 mb-md-4 mt-4"
            >
              Entrar
            </ColorButton>
            <ColorButtonCadastar
              type="button"
              fullWidth
              size="large"
              variant="contained"
              className="mt-md-2"
              onClick={cadastrar}
            >
              Cadastrar
            </ColorButtonCadastar>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
