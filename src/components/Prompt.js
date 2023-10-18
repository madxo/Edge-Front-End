import React, { useState } from 'react';
import styled from 'styled-components';

// Parent container for the background image
const BackgroundContainer = styled.div`
  background-image: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2970&q=80');
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
`;

// Full-page container with a non-transparent background
const FullPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1); /* Non-transparent background */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  color: #333;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
`;

const ResultLabel = styled.label`
  font-size: 1rem;
  margin-top: 10px;
`;

const Prompt = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  }

  const handleButtonClick = () => {
    const processedText = inputText.split('').reverse().join('');
    setResult(processedText);
  }

  return (
    <BackgroundContainer>
      <FullPageContainer>
        <Heading>Please enter the text</Heading>
        <Textarea
          value={inputText}
          onChange={handleInputChange}
          rows="4"
          cols="50"
          placeholder="Enter text here..."
        />
        <br />
        <Button onClick={handleButtonClick}>Submit</Button>
        <br />
        <ResultLabel>
          Result: <span>{result}</span>
        </ResultLabel>
      </FullPageContainer>
    </BackgroundContainer>
  );
}

export default Prompt;
