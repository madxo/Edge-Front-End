import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ToastContainer from './../Toastr';
import './Login.css';
import backgroundImage from './../../background.svg'
import logo from './../../logo.svg';


const LoginForm = styled.div`
  width: 400px;
  max-width: 100%;
  margin: 100px auto;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
`;

const Heading = styled.h1`
  text-align: center;
  margin: 0;
  padding: 20px 0;
  font-size: 28px;
  font-weight: bold;
  color: black;
`;

const Form = styled.form`
  padding: 20px;
  background-color: white;
  font-family: "Poppins", sans-serif;
`;

const Label = styled.label`
  text-align: left;
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: gray;
  font-family: "Poppins", sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  margin-bottom: 20px;
  &::placeholder {
    color: lightgray;
  }
  &:focus {
    outline: none; 
    border: 1px solid black;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: black;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 32px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  margin-top: 10px

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const login = (event) => {
    event.preventDefault();
    if (!emailRegex.test(email) || password.length < 8) {
      setError('Please provide vaild email and password')
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return;
    }
    fetch(`http://localhost:8080/v1/login?email=${email}&password=${password}`)
      .then(async (response) => {
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        return response.text();
      })
      .then((data) => {
        navigate('/prompt', { state: JSON.parse(data) });
        setError('');
      })
      .catch((error) => {
        setError(error.message);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      });
  }


  return (

    <div className="container">
      <div className="app-container">
        <div className="left-column">
          <img className="left-img" src={backgroundImage} alt="background" />
        </div>
        <div className="right-column">
          <LoginForm>
            <img className="logo" src={logo} alt="logo"></img>
            <Heading>Welcome back!</Heading>
            <h5>Login and Explore Your Digital Playground</h5>
            <Form onSubmit={login}>
              <Label>Email</Label>
              <Input type="text" id="email" name="email" value={email} onChange={onEmailChange} placeholder="Enter your email" />
              <Label>Password</Label>
              <Input type="password" id="password" name="password" value={password} onChange={onPasswordChange} placeholder="Enter your password" />
              <Button type="submit">Login</Button>
              <ToastContainer show={showToast.toString()}>{error}</ToastContainer>
            </Form>
          </LoginForm>
        </div>
      </div>
    </div>

  );
}


export default Login;
