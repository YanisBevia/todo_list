import React, { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import Auth from "../contexts/Auth";
import { logout } from "../services/AuthApi";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

  const history = useHistory();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    history.replace('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/homepage">
              Accueil
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          { (!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Se connecter
                </NavLink>
              </li>
            </>
          )) || (
            <>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
