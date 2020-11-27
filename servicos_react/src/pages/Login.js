import React, { useState, useLayoutEffect } from "react";

import { Button, Grid, Paper, TextField, Checkbox } from "@material-ui/core";

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
  const [screen, setScreen] = useState(0);

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
  return (
    <section className="login">
      <div className="loginContainer">
        <label>E-mail</label>
        <TextField
          size="small"
          type="email"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{msgEmail}</p>
        <label>Senha</label>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          size="small"
          autoFocus
          required
        />
        <p className="errorMsg">{msgSenha}</p>
        <Checkbox
          checked={lembreme}
          onChange={(e) => setLembreme(e.target.checked)}
          inputProps={{ "aria-label": "primary checkbox" }}
        />{" "}
        <span className="lembre">Lembre-me</span>
        <div className="btnContainer">
          <button onClick={login}>Entrar</button>
          <button style={{ marginTop: 20 }} onClick={cadastrar}>
            Cadastrar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
