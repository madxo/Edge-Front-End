import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    navigate('/prompt');
  }

  return (
    <LoginForm>
      <Heading>Login</Heading>
      <Form onSubmit={login}>
        <Label>Username:</Label>
        <Input type="text" id="username" name="username" />
        <Label>Password:</Label>
        <Input type="password" id="password" name="password" />
        <Button type="submit">Login</Button>
      </Form>
    </LoginForm>
  );
}

export default Login;
