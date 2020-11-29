import React, { useState, useLayoutEffect } from "react";

import { Button } from "@material-ui/core";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Card, Row, Modal, Form, Col } from "react-bootstrap";
import Firebase from "../../services/FirebaseConnect";
import { v4 as uuidv4 } from "uuid";

export default function MeusServicos() {
  const [lista, setLista] = useState([]);

  const [modalShow, setModalShow] = React.useState(false);

  useLayoutEffect(() => {
    Firebase.database()
      .ref(`/servicos`)
      .on("value", (snapchot) => {
        if (snapchot.val()) {
          let dados = snapchot.val();
          const keys = Object.keys(dados);
          const lista = keys.map((key) => {
            return { ...dados[key], id: key };
          });
          setLista(lista);
        } else {
          setLista([]);
        }
      });
  }, []);

  const excluir = (item) => {
    Firebase.database().ref(`/servicos/${item.id}`).remove();
  };

  const createServico = () => {
    let objeto = {
      servico: document.getElementById("servico").value,
      cidade: document.getElementById("cidade").value,
      seg: document.getElementById("at1").checked,
      ter: document.getElementById("at2").checked,
      qua: document.getElementById("at3").checked,
      qui: document.getElementById("at4").checked,
      sex: document.getElementById("at5").checked,
      sab: document.getElementById("at6").checked,
      dom: document.getElementById("at7").checked,
      valor: document.getElementById("valor").value,
      imagem:
        "https://uploads.metropoles.com/wp-content/uploads/2018/04/10113058/WhatsApp-Image-2018-04-10-at-11.28.16.jpeg",
    };

    let code = uuidv4();

    Firebase.database()
      .ref(`servicos/${code}`)
      .set(objeto)
      .then(() => {
        console.log("Cadastro de servico feito com sucesso.");
      })
      .catch((erro) => {
        console.log(erro);
      });

    setModalShow(false);
  };

  return (
    <>
      <Header />
      <div className="container mt-5 text-center">
        <Button
          variant="contained"
          style={{ backgroundColor: "#ffb816" }}
          onClick={() => setModalShow(true)}
        >
          Novo Serviço
        </Button>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <div className="container mt-3">
        <Row className="align-self-center d-flex justify-content-center ">
          {lista.map((item, key) => (
            <Card style={{ width: "18rem" }} className="mr-5 mb-5">
              <Card.Img
                variant="top"
                src={item.imagem}
                style={{ height: "200px" }}
              />
              <Card.Body>
                <Card.Title>{item.servico}</Card.Title>
                <Card.Text>Cidade: {item.cidade}</Card.Text>
                <Card.Text>Valor: R${item.valor}</Card.Text>
                <Card.Text>Dias disponíveis:  
                  {item.seg ? "Seg, " : ""}
                  {item.ter ? "Ter, " : ""}
                  {item.qua ? "Qua, " : ""}
                  {item.qui ? "Qui, " : ""}
                  {item.sex ? "Sex, " : ""}
                  {item.sab ? "Sab, " : ""}
                  {item.dom ? "Dom " : ""}
                  </Card.Text>

                <Button
                  variant="contained"
                  style={{ backgroundColor: "#ffb816" }}
                  onClick={() => excluir(item)}
                >
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>

      <Footer />
    </>
  );

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Novo serviço
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Serviço</Form.Label>
                <Form.Control as="select" id="servico">
                  <option>Pedreiro</option>
                  <option>Jardineiro</option>
                  <option>Pintor</option>
                  <option>Eletricista</option>
                  <option>Encanador</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState" >
                <Form.Label>Cidade</Form.Label>
                <Form.Control as="select" id="cidade">
                  <option>Passo Fundo</option>
                  <option>Sarandi</option>
                  <option>Marau</option>
                  <option>Rondinha</option>
                  <option>Putinga</option>
                  <option>Tapejara</option>
                  <option>Carazinho</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Informe o valor do serviço"
                  id="valor"
                  //value={valor}
                  //onChange={(e) => setValor(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group as={Col}>
              <Form.Label
                as="legend"
                column
                sm={20}
                style={{ marginLeft: -15 }}
              >
                Dias disponíveis
              </Form.Label>
              <Row sm={10}>
                <Form.Check
                  //onChange={(e) => setSegunda(e.target.checked)}
                  style={{ marginRight: 20, marginLeft: 5 }}
                  label="Segunda"
                  id="at1"
                />
                <Form.Check
                  //onChange={(e) => setTerca(e.target.checked)}
                  style={{ marginRight: 20 }}
                  label="Terça"
                  id="at2"
                />
                <Form.Check
                  //onChange={(e) => setQuarta(e.target.checked)}
                  style={{ marginRight: 20 }}
                  label="Quarta"
                  id="at3"
                />
                <Form.Check
                  //onChange={(e) => setQuinta(e.target.checked)}
                  style={{ marginRight: 20 }}
                  label="Quinta"
                  id="at4"
                />
                <Form.Check
                  //onChange={(e) => setSexta(e.target.checked)}
                  style={{ marginRight: 20 }}
                  label="Sexta"
                  id="at5"
                />
                <Form.Check
                  //onChange={(e) => setSabado(e.target.checked)}
                  style={{ marginRight: 20 }}
                  label="Sábado"
                  id="at6"
                />
                <Form.Check
                  //onChange={(e) => setDomingo(e.target.checked)}
                  style={{ marginRight: 20 }}
                  label="Domingo"
                  id="at7"
                />
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" onClick={props.onHide}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#ffb816", marginLeft: 10 }}
            onClick={createServico}
          >
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
