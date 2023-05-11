import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

import "./Login.css";
import GlobalUYlogo from "../img/logo_horizontal.svg";
import backgroundImage from "../img/background-image.svg";

function Login() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector((state) => state.auth.error);

  const CLIENT_ID =
    "1086701642559-jaahidjvb4c96ic8lvkg54eokk86kf2t.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: CLIENT_ID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    fetch("users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would make an API call to authenticate the user
    // As in this case we are ussing dummy api calls, just checking if the user email is in users.js
    // Password is not validated, also checking if the email belongs to an admin user
    if (isValidUser(username)) {
      dispatch(loginSuccess({ username }));
      navigate("/users");
    } else {
      dispatch(
        loginFailure({ error: "El usuario o la contraseña no son correctas" })
      );
    }
  };

  const handleGoogleLogin = (response) => {
    const username = response.profileObj.email;
    // Here you would make an API call to authenticate the user using the Google token provided on response
    // As in this case we are ussing dummy api calls, just checking if the user email is in users.js and it is an Admin
    if (isValidUser(username)) {
      dispatch(loginSuccess({ username }));
      navigate("/users");
    } else {
      dispatch(loginFailure("El usuario o la contraseña no son correctas"));
    }
    console.log(errorMessage);
  };

  const handleGoogleLoginFailure = (response) => {
    console.error("Login failure:", response);
  };

  const isValidUser = (username) => {
    const user = users.find((u) => u.email === username);
    return user && user.role === "Admin";
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <img className="login-background" src={backgroundImage} alt="GlobalUY" />
      <div className="login-container">
        <img className="login-company-logo" src={GlobalUYlogo} alt="GlobalUY" />
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label color="blue" className="login-label">
              Correo Electronico
            </label>
            <Input
              className="login-input"
              placeholder="email@mail.com"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Field>
          <Form.Field>
            <label className="login-label">Contraseña</label>
            <Input
              className="login-input"
              type={showPassword ? "text" : "password"}
              icon={showPassword ? "eye" : "eye slash"}
              iconPosition="right"
              onClick={() => handleTogglePassword()}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Field>
          {errorMessage && (
            <p className="error-message">{errorMessage.error}</p>
          )}
          <Button className="login-button" type="submit">
            Iniciar sesión
          </Button>
          <div>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Ingresar con Google"
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={"single_host_policy"}
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
