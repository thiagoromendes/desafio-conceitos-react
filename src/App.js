import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  },[]);

  async function handleAddRepository() {

    const resporitoryReturn = await api.post('repositories', {
        title:"Teste de repositório",
        url:"http://github.com/thiagoromendes",
        thecs:"Node.js",
        likes: 0
      }).then(response => response)

    setRepositories([...repositories,resporitoryReturn.data]);
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);

    const repositoriesAvailable = repositories.filter(repository => repository.id !== id)

    setRepositories([...repositoriesAvailable]);
  }

  return (  
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}      
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
