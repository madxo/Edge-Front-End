import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToastContainer from './Toastr';

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 100, 0, 0.7);;
  color: #fff;
  padding: 15px 20px;
`;

const LogoutDropdown = styled.div`
  display: ${props => (props['data-isopen'] === 'true' ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  right: 20px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  cursor: pointer;
`;

const LogoutLabel = styled.div`
  cursor: pointer;
`;

const BackgroundContainer = styled.div`
  background-image: url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
`;

const FullPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1); /* Non-transparent background */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  color: #333;
  top: 150px;
  height: 300px;
  position: relative;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  margin-top: 0px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none; 
    border: 1px solid black;
  }
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
  span {
    color: #069806;
  }
  margin-top: 10px;
`;

const Prompt = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(location.state);
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    if (!userData) {
      navigate('/login');
      return;
    }
  }, [userData, navigate])

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setError('');
  }

  const handleButtonClick = () => {
    if (!inputText) {
      setError('Please enter text.');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      setResult('');
      return;
    }
    fetch(`http://localhost:8080/v1/rephrase?citation=${inputText}&externalEdgeInd=true`)
      .then(async (response) => {
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        return response.text();
      })
      .then((data) => {
        setResult(data);
        setError('');
      })
      .catch((error) => {
        setError(error.message);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
        setResult('');
      });
  }

  const handleLogout = () => {
    setUserData(null);
  }

  return (
    <div>
      {userData && <HeaderBar>
        {!userData.externalEdgeInd && <div>Internal DE&I</div>}
        {userData.externalEdgeInd && <div>External DE&I</div>}
        <LogoutLabel onClick={() => setDropdownOpen(!isDropdownOpen)}>
          Hi {userData.userName}!
        </LogoutLabel>
        <LogoutDropdown data-isopen={isDropdownOpen.toString()}>
          <div onClick={handleLogout}>Logout</div>
        </LogoutDropdown>
      </HeaderBar>
      }
      <BackgroundContainer>
        <FullPageContainer>
          <Heading>Please enter the text</Heading>
          <Textarea
            value={inputText}
            onChange={handleInputChange}
            rows="8"
            cols="50"
            placeholder="Enter text here..."
          />
          <br />
          <Button onClick={handleButtonClick}>Submit</Button>
          <br />
          {error && <ToastContainer show={showToast.toString()}>{error}</ToastContainer>}
          {<ResultLabel>
            Result: <span>{result}</span>
          </ResultLabel>}
        </FullPageContainer>
      </BackgroundContainer>
    </div>
  );
}

export default Prompt;
