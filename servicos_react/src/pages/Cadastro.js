import React, { useState, useLayoutEffect } from "react";

import { Button, Grid, Paper, TextField, Checkbox } from "@material-ui/core";

import Firebase from "../services/FirebaseConnect";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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

  const createUser = () => {
    let objeto = {
      usuario: sessionStorage.getItem("uuid"),
      nome: nome,
      sobrenome: nome,
      profissional: profissional ? profissional : cliente,
    };

    let code = uuidv4();

    Firebase.database()
      .ref(`planta/${code}`)
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
    <section className="login">
      <div className="loginContainer">
        <label>Nome</label>
        <TextField
          size="small"
          type="text"
          autoFocus
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <label>Sobrenome</label>
        <TextField
          size="small"
          type="text"
          autoFocus
          required
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
        />
        <label>E-mail</label>
        <TextField
          size="small"
          type="email"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* <p className="errorMsg">{msgEmail}</p> */}
        <label>Senha</label>
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          size="small"
          autoFocus
          required
        />
        {/* <p className="errorMsg">{msgSenha}</p> */}
        <Checkbox
          checked={profissional}
          onChange={checkProfissional}
          inputProps={{ "aria-label": "primary checkbox" }}
        />{" "}
        <span className="lembre">Profissional</span>
        <Checkbox
          checked={cliente}
          onChange={checkCliente}
          inputProps={{ "aria-label": "primary checkbox" }}
        />{" "}
        <span className="lembre">Cliente</span>
        <div className="btnContainer">
          <button onClick={signUp}>Cadastrar</button>
        </div>
      </div>
    </section>
  );
}

export default Cadastrar;
