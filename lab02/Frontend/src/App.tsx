import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [category, setCategory]: any = useState([{}]);
  useEffect(() => {
    axios
      .get("https://localhost:44377/api/Category", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      })
      .then((response) => setCategory(response.data));
  }, []);
  return (
    <div>
      {category.map((item: any) => {
        return (
          <div>
            <p>Id: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
