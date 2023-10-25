import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  top: 20px; /* Adjust the top position for the upper right corner */
  right: 20px; /* Position it in the upper right corner */
  background-color: #ff0000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: ${({ show }) => (show === 'true' ? 'block' : 'none')};
`;

export default ToastContainer;