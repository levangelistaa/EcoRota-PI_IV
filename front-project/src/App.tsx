import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Info from './pages/Info';
import Ecoponto from './pages/Ecopontos';
import AdminLogin from './pages/AdminLogin';
import { useEffect } from 'react';

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return null;
}

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToHash />
        <div className="App">
          <Header />
          <Navbar />

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/informacoes" element={<Info />} />
              <Route path="/ecopontos" element={<Ecoponto />} />
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
