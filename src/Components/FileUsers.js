import React, { useEffect, useState } from "react";
import Api from "./Api";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function FileUsers() {
  const [myData, setMyData] = useState([]);
  const [name, setName] = useState('') 
  const [username, setUsername] = useState('') 
  const [email, setEmail] = useState('') 
  const [address, setAddress] = useState('') 

  let getTask = () => {
    Api.fetchData("users").then((result) => {
      console.log("result data.... " + result);
      console.log([...result]);
      setMyData([...result]);
    });
  };

  useEffect(() => {
    getTask();
  }, []);

  // clear data after input field in form
  let clearText = () => {
    setName("");
    setUsername("");
    setEmail("");
    setAddress("")
  };

  // handle final event after submit add button
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('------click check----- Button : Add-----type="submit" value="submit"------')

    let inputData = {
      name : name,
      username : username,
      email : email,
      address : {
        city : address
      }      
    }
    console.log(JSON.stringify(inputData));

    // without api call
    setMyData([...myData, inputData]);
    clearText();

    // api call
    Api.addData("users", inputData).then((result) => {
      console.log('Result data');
    clearText();
    getTask();
    })

  };

  // delete button
  const handleDelete = (id) => {
    console.log('Data is '+id);

    Api.deleteData("users", id).then((result) => {
      console.log('Result data');
    })

    let filterData = myData.filter((value) => value.id !== id);
    setMyData(filterData);
  };

  const handleEdit = () => {};

  return (
    <>
      <h4 className="container text-center mt-3">List of Data</h4>
      <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
      <h6>Form Add Data :-</h6>
      <Row>
        <Col>
          <Form.Control type="text" placeholder="Enter Name" 
          value={name} onChange={(e) => setName(e.target.value)} />
        </Col>
        <Col>
        <Form.Control type="text" placeholder="Enter Username" 
        value={username} onChange={(e) => setUsername(e.target.value)} />
        </Col>
        <Col>
          <Form.Control type="email" placeholder="Enter Email" 
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control type="text" placeholder="Enter Address (City)" 
            value={address} onChange={(e) => setAddress(e.target.value)}
          />
        </Col>
        <Col className="my-auto" lg={1}>
      <Button variant="outline-success" size="sm" type="submit" value="submit">
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
