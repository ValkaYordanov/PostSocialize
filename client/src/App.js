import { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/recipes`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    }
    getData();
  }, []);

  return (
    <>
      <h1>MERN App!</h1>
      <p>Data from server:</p>
      <ul>
        {data.map((item) => {
          return (
            <li key={item._id}>
              <strong>{item.title}</strong> (<code>{item._id}</code>)
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
