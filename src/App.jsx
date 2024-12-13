import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Homepage from './Features/homepage';
import Footer from './component/Footer';
import PredictionPage from './Features/predictions';
import ModulesPage from './Features/modules';
import LoginPage from './Features/login'; 
import RegisterPage from './Features/register'; // Import RegisterPage
import PrivateRoute from './Middleware/Privateroute'; 

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} /> {/* Halaman Login */}
            <Route path="/register" element={<RegisterPage />} /> {/* Halaman Register */}

            {/* Proteksi untuk halaman homepage */}
            <Route
              path="/"
              element={<PrivateRoute element={<Homepage />} />}
            />
            
            {/* Proteksi untuk halaman yang membutuhkan login */}
            <Route
              path="/predictions"
              element={<PrivateRoute element={<PredictionPage />} />}
            />
            <Route
              path="/modules"
              element={<PrivateRoute element={<ModulesPage />} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
