import React, { useState, useEffect } from 'eact';
import axios from 'axios';

function CsvDataReader() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/data')
     .then(response => {
        setData(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      value: formData.get('value'),
    };
    axios.post('/api/data', data)
     .then(response => {
        console.log(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Csv Data Reader</h1>
      <form onSubmit={handleSubmit}>
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" />
        <br />
        <label for="value">Valor:</label>
        <input type="number" id="value" name="value" />
        <br />
        <button type="submit">Criar Dados</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CsvDataReader;