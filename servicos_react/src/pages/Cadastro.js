import React, { useState, useLayoutEffect } from "react";

import {
  Button,
  TextField,
  Checkbox,
  Container,
  withStyles,
} from "@material-ui/core";

import Firebase from "../services/FirebaseConnect";
import { useHistory } from "react-router-dom";

function Cadastrar() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [profissional, setProfissional] = useState(false);
  const [cliente, setCliente] = useState(true);

  const signUp = () => {
    if (!profissional && !cliente) {
      setMsg("Escolha uma opção nos campos de marcação.");
    } else {
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((retorno) => {
          sessionStorage.setItem("uuid", retorno.user.uid);
          createUser();
          setMsg("");
          history.push("/menu");
        })
        .catch((err) => {
          console.log("Erro: " + err.toString());
          setMsg("E-mail já utilizado.");
        });
    }
  };

  const logar = () => {
    history.push("/");
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

  const createUser = () => {
    let objeto = {
      email: email,
      nome: nome,
      sobrenome: sobrenome,
      profissional: profissional ? true : false,
    };

    let code = sessionStorage.getItem("uuid");

    Firebase.database()
      .ref(`usuario/${code}`)
      .set(objeto)
      .then(() => {
        console.log("Cadastro de usuario feito com sucesso.");
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const checkProfissional = () => {
    if (profissional) {
      setProfissional(false);
    } else {
      setProfissional(true);
    }

    if (cliente) {
      setCliente(false);
    }
  };

  const checkCliente = () => {
    if (cliente) {
      setCliente(false);
    } else {
      setCliente(true);
    }

    if (profissional) {
      setProfissional(false);
    }
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className="mt-3 mt-md-5">
          <div className="text-center">
          <img src="logo.png"  className="img-fluid" alt="Responsive image"/>
          </div>

          <div className="mt-4">
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nome"
              size="small"
              type="text"
              autoFocus
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Sobrenome"
              size="small"
              type="text"
              required
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="E-mail"
              size="small"
              type="email"
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-left">
              <Checkbox
                color="default"
                checked={profissional}
                onChange={checkProfissional}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              Profissional
              <br></br>
              <Checkbox
                color="default"
                checked={cliente}
                onChange={checkCliente}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              Cliente
            </div>
            <p className="text-center mt-2 mensagemErro">
              {msg}
            </p>
            <ColorButton
              fullWidth
              type="button"
              onClick={signUp}
              variant="contained"
              color="primary"
              size="large"
              className="mb-3 mb-md-2 mt-4"
            >
              Cadastrar
            </ColorButton>
            <Button
              className="text-center"
              onClick={logar}
              fullWidth
              style={{ backgroundColor: "transparent", borderColor: "transparent" }}
            >
              <p className="text-center mt-2 mensagemLogin">
                <b>Já é cadastrado? Faça o login.</b>
              </p>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Cadastrar;
