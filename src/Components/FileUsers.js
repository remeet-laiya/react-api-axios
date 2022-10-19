import React, { useEffect, useState } from "react";
import Api from "./Api";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function FileUsers() {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    let getTask = () => {
      Api.fetchData("users").then((result) => {
        console.log("result data.... " + result);
        console.log([...result]);
        setMyData([...result]);
      });
    };
    getTask();
  }, []);

  const handleDelete = () => {};

  const handleEdit = () => {};

  return (
    <>
      <h4 className="container text-center mt-3">List of Data</h4>
      <Form className="container mt-3 mb-3">
      <h6>Form Add Data :-</h6>
      <Row>
        <Col>
          <Form.Control type="text" placeholder="Enter Name" />
        </Col>
        <Col>
        <Form.Control type="text" placeholder="Enter Username" />
        </Col>
        <Col>
          <Form.Control type="email" placeholder="Enter Email" />
        </Col>
        <Col>
          <Form.Control type="text" placeholder="Enter Address (City)" />
        </Col>
        <Col className="my-auto" lg={1}>
      <Button variant="outline-success" size="sm" type="submit">
        Add
      </Button>
      </Col>
      </Row>
    </Form>
    
      

      <Table striped bordered hover className="container">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {myData ? (
            myData.map((value, i) => {
              const { name, username, email, address } = value;

              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{address.city}</td>
                  <td>
                    <Button
                      variant="outline-primary" size="sm"
                      onClick={() => handleEdit(value.id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger" size="sm"
                      onClick={() => handleDelete(value.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <h6>Loading... </h6>
          )}
        </tbody>
      </Table>
      

    </>
  );
}

export default FileUsers;
