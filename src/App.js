import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));

  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user)

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
          const newUsers = [...users,data];
          setUsers(newUsers)
      })
      .catch(error => console.error(error))
    event.target.reset()

  }

  return (
    <div className="App">

      <form onSubmit={handleAddUser}>
        <input type='text' name='name' placeholder='name' />
        <br />
        <input type='email' name='email' placeholder='Email' />
        <br />
        <button type='submit'>Add User</button>
      </form>
      <h2>Users:{users.length}</h2>
      <div>
        {
          users.map(user => <p key={user.id} className='border'>Name:{user.name}<br></br> Email:{user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
