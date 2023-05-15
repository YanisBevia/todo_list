import React, { useState } from "react";
import "./App.css";
import TodoList from './components/TodoList';
import { HashRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import { hasAuthenticated } from './services/AuthApi'
import Auth from "./contexts/Auth";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated}} >
      <HashRouter>
        <div className="container-fluid">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/homepage" component={Homepage} />
          </Switch>
        </div>
      </HashRouter>
    </Auth.Provider>
  );
}

export default App;

