import React, { useState } from 'react';
import { SearchPage } from './SearchPage';
import { Login } from './Login';
import './App.css';




export  function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="app-container">
      {user ? <SearchPage user={user} /> : <Login onLogin={setUser} />}
    </div>
  );
}


export default App;
