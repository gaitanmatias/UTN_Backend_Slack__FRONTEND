import React, { useState, useEffect } from 'react'
import useForm from '../../hooks/useForm'
import { login } from '../../services/authService'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router';
import ls_keys from '../../constants/ls-constants';


const FORM_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
};
const initial_form_state = {
  [FORM_FIELDS.EMAIL]: "",
  [FORM_FIELDS.PASSWORD]: "",
};

const LoginScreen = () => {
  const navigate = useNavigate()


  const { sendRequest, loading, response, error } = useFetch();

  const onLogin = (form_state) => {
    sendRequest(() =>
      login(form_state[FORM_FIELDS.EMAIL], form_state[FORM_FIELDS.PASSWORD])
    );
  };

  useEffect(() => {
    if (response) {
      localStorage.setItem(ls_keys.AUTH_TOKEN, response.data.authorization_token);
      navigate("/home"); 
    }
  }, [response]);

  const {
    form_state: register_form_state,
    handleSubmit,
    handleInputChange,
  } = useForm({initial_form_state,onSubmit: onLogin,});

  return (
    <div>
      <h1>Inicia Sesión</h1>
      <nav>
        <ul>
          <li><a href="http://localhost:5173/register">Register</a></li>
          <li><a href="http://localhost:5173/login">Login</a></li>
        </ul>
      </nav>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={FORM_FIELDS.EMAIL}>Email:</label>
          <input
            name={FORM_FIELDS.EMAIL}
            id={FORM_FIELDS.EMAIL}
            type="email"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor={FORM_FIELDS.PASSWORD}>Contraseña:</label>
          <input
            name={FORM_FIELDS.PASSWORD}
            id={FORM_FIELDS.PASSWORD}
            type="password"
            onChange={handleInputChange}
          />
        </div>

        {!response ? (
          <button type="submit" disabled={loading}>Iniciar Sesión</button>
        ) : (
          <>
            <button type="submit" disabled={true}>Sesion iniciada</button>
            <span style={{ color: "green" }}>{response.message}</span>
          </>
        )}
        {error && <span style={{ color: "red" }}>{error.message}</span>}

      </form>
    </div>
  );
};

export default LoginScreen;
