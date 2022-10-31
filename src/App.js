import './App.css';
import { useEffect, useState } from 'react';

const apiUrl = "http://localhost:8080"

function App() {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    fetch(apiUrl + "/persons")
      .then(res => res.json())
      .then(persons => setPersons(persons))
  }, [])

  const handleNameSubmission = (e) => {
    e.preventDefault()
    const newPerson = { name: e.target.name.value }
    fetch(apiUrl + "/persons", {
      method: "POST",
      body: JSON.stringify(newPerson),
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then(res => res.json())
      .then(personWithId => setPersons([...persons, personWithId]))
  }
  const personLis = persons.map(person => <li key={person.id}>{person.id}: {person.name}</li>)

  return (
    <div className="App">
      <h1>My App</h1>
      <h2>Testing workflow</h2>
      <form onSubmit={handleNameSubmission}>
        <input id="name" type="text"></input>
        <input type="submit"></input>
      </form>
      <ul>{personLis}</ul>
    </div>
  );
}

export default App;
