import React, { useState, useLayoutEffect } from "react";

import { Container } from "@material-ui/core";
import { Carousel } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Menu() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <Header />

      <Container component="main" maxWidth="xs" className="mb-5">
        <div className="mt-9 mt-md-5">
          <div className="text-center">
            <Typography className="mt-3" component="h1" variant="h6">
              Seja bem vindo ao WebApp do FazTudo!
            </Typography>

            <Typography className="mt-3" component="h5">
              Dê uma olhada em nosso aplicativo também.
            </Typography>
          </div>
        </div>

        <Carousel interval="1000">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src='login.jpeg'
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src='cadastro.jpeg'
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src='cliente_servico.jpeg'
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src='pesquisar.jpeg'
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src='profi_contra.jpeg'
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src='profi_servico.jpeg'
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src='perfil.jpeg'
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      </Container>

      <Footer />
    </>
  );
}
