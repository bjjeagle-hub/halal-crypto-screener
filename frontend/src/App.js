import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { GlobalStyle } from './styles/GlobalStyles';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ScreeningResults from './pages/ScreeningResults';
import Auth from './pages/Auth';
import Subscription from './pages/Subscription';

function App() {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyle />
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/results/:symbol" element={<ScreeningResults />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/subscription" element={<Subscription />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;