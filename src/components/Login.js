import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ToastContainer from './Toastr';

const BackgroundContainer = styled.div`
  background-image: url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh; /* Make the container full-height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.div`
  width: 400px;
  max-width: 100%;
  margin: 50px auto;
  background-color: lightblue;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
`;

const Heading = styled.h1`
  text-align: center;
  margin: 0;
  padding: 20px 0;
  font-size: 28px;
  font-weight: bold;
  color: white;
`;

const Form = styled.form`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
`;

const Label = styled.label`
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
  background-color: dodgerblue;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: deepskyblue;
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
    <BackgroundContainer>
      <LoginForm>
        <Heading>Login</Heading>
        <Form onSubmit={login}>
          <Label>Username:</Label>
          <Input type="text" id="email" name="email" value={email} onChange={onEmailChange} placeholder="Enter your email" />
          <Label>Password:</Label>
          <Input type="password" id="password" name="password" value={password} onChange={onPasswordChange} placeholder="Enter your password" />
          <Button type="submit">Login</Button>
          <ToastContainer show={showToast.toString()}>{error}</ToastContainer>
        </Form>
      </LoginForm>
    </BackgroundContainer>
  );
}

export default Login;
