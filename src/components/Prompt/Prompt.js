import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ToastContainer from '../Toastr';
import logo from './../../logo.svg';
import './Prompt.css';

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
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
  color: #000;
  display: flex;
  align-items: center;
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
    fetch(`http://localhost:8080/v1/rephrase?citation=${inputText}&externalEdgeInd=${userData && userData.externalEdgeInd}`)
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

  return (<>
    {userData && <HeaderBar>
      <img className="header-logo" src={logo} alt="logo"></img>
      <LogoutLabel onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <div className="LogoutDiv">
          <span className="name">{userData.userName}</span>
          <span className="email">{userData.email}</span>
        </div>
        <img className="logoutImage"
          src={userData.imageUrl} alt={userData.userName}></img>
      </LogoutLabel>
      <LogoutDropdown data-isopen={isDropdownOpen.toString()}>
        <div onClick={handleLogout}>Logout</div>
      </LogoutDropdown>
    </HeaderBar>
    }
    <div className="app">
      <div className="prompt-container">
        <h1>Diversity, Equity, and Inclusion (DE&I) Checker</h1>
        {userData && !userData.externalEdgeInd && <h5>Internal DE&I</h5>}
        {userData && userData.externalEdgeInd && <h5>External DE&I</h5>}
        <textarea
          value={inputText}
          onChange={handleInputChange}
          rows="5"
          cols="50"
          placeholder="Enter text here..."
        />
        <button onClick={handleButtonClick}>Submit</button>
        {error && <ToastContainer show={showToast.toString()}>{error}</ToastContainer>}
        <div className="result-box">
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      </div>
    </div>
  </>
  );
}

export default Prompt;
