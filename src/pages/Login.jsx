import React, { useEffect, useState, useContext } from "react";
import Auth from "../contexts/Auth";
import { login } from "../services/AuthApi";

const Login = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  
  const handleChange = ({currentTarget}) => {
    const { name, value } = currentTarget;

    setUser({...user, [name]: value})
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await login(user);
      console.log(response);
      if(response){
        setIsAuthenticated(response);
        history.replace('/homepage');
      }
    } catch ({ response }) {
      console.log(response);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/homepage');
    }
  }, [history, isAuthenticated]);

  return (
    <div className="tab-content">
      <form className="form-profile" onSubmit={handleSubmit}>
          <h1>Se connecter</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="email"
              placeholder="mail@mail.fr"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-outline-primary">
            Se connecter
          </button>
      </form>
    </div>
  );
};

export default Login;
