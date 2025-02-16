import { useState } from "react";
import { useQuery, useApolloClient } from '@apollo/client'

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';


const App = () => {
  const [page, setPage] = useState("authors");
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ token, setToken ] = useState(null)
  const client = useApolloClient()


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token
          ? (
            <>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={logout}>logout</button>
            </>
          )
          :<button onClick={() => setPage("login")}>login</button>
        }
            
      </div>

      <Authors show={page === "authors"} token={token}  />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm show={page === "login"} />
    </div>
  );
};

export default App;
