import logo from './logo.svg';
import './App.css';
import axios from "axios"
import {useEffect, useState} from 'react'

function App() {

  const [list,setList] = useState([])

  const [body, setBody] = useState({})

  async function getData() {
    setTimeout(async () => {
    const response = await axios.get("http://localhost:3001/users")
    console.log("reponse", response)
    setList(response.data)
    }, 5000);
  }

  useEffect(() => {
    getData()
  }, [])

  function handleChange(e) {
    setBody((b) => ({ ...b, [e.target.name]: e.target.value }));
    console.log("body", body)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await axios.post("http://localhost:3001/users", body)
    getData()
    console.log("test")

  }


  return (
    <div className="App">
      les users
      {list.map(user => {
        return <p key={user.id}>Je m'apelle {user.name} {user.lastname}</p>
      })}
      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleChange} placeholder="name" type="text"/>
        <input name="lastname" onChange={handleChange} placeholder="lastname" type="text"/>
        <button type="submit">Ajouter un user</button>
        </form>
    </div>
  );
}

export default App;
