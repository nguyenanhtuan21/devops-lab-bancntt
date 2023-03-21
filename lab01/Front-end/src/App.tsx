import React from "react";
import logo from "./logo.svg";
import Layout from "./components/Layout";
import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container fluid="true" className="main-container">
      <Layout />
    </Container>
  );
}

export default App;
