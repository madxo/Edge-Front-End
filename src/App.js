import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('./components/Login'));
const Prompt = lazy(() => import('./components/Prompt'))

const App = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path='' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/prompt' element={<Prompt />}></Route>
          <Route path="*" element={<Navigate to="/login" />}/>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
