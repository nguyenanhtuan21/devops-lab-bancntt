import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import ToggleButton from "react-bootstrap/ToggleButton";

const Layout = () => {
  const [todo, setTodo]: any = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:44383/api/Todo/todo", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
      })
      .then((response) => setTodo(response.data));
  }, []);
  return (
    <Container style={{ width: "75%" }} fluid="true">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nội dung</th>
            <th>Đã hoàn thành</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((item: any) => {
            return (
              <tr key={item.id}>
                <td>{item.content}</td>
                <td>
                  <ToggleButton
                    value={item.isDone}
                    checked={item.isDone}
                    type="checkbox"
                  ></ToggleButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
export default Layout;
