import axios from "axios";
// const fetchData = (endpoint) => {
//   return axios
//   .get(`http://localhost:3004/${endpoint}`)
//   .then((res) => res.data)
//   .catch((error) => console.log("Error Msg :", error.message))
// };

const fetchData = async (endpoint) => {
  try {
    const res =  await axios
    .get(`http://localhost:3004/${endpoint}`);
    console.log(res.data);
  } catch (error) {
    console.log("Error Msg :", error.message);  
  }
};


export default {fetchData};
