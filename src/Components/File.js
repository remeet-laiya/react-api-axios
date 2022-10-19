import React, { useEffect } from 'react'
import Api from './Api';

function File() {
  useEffect(() => {
    let getTask = () => {
      Api.fetchData("users").then((result) => {
        console.log("result data.... " + result);
        console.log([...result]);
      });
    };
    getTask();
  }, []);

  useEffect(() => {
    let getTask = () => {
      Api.fetchData("todos").then((result) => {
        console.log("result data.... " + result);
        console.log([...result]);
      });
    };
    getTask();
  }, []);

  useEffect(() => {
    let getTask = () => {
      Api.fetchData("albums").then((result) => {
        console.log("result data.... " + result);
        console.log([...result]);
      });
    };
    getTask();
  }, []);

  return (
    <>
      <h2>Hi</h2>
    </>
  )
}

export default File