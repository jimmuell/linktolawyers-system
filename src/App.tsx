import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Cases from './pages/Cases';
import Clients from './pages/Clients';
import Messages from './pages/Messages';
import Quotes from './pages/Quotes';
import Consultations from './pages/Consultations';
import Settings from './pages/Settings';
import ConsumerDashboard from './pages/ConsumerDashboard';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  const [userType, setUserType] = useState<'attorney' | 'consumer' | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectUserType = (type: 'attorney' | 'consumer') => {
    setUserType(type);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleResetUserType = () => {
    setUserType(null);
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {userType && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userType={userType} />
        )}
        <div className="flex-1 flex flex-col overflow-hidden">
          {userType && (
            <Navbar
              userType={userType}
              onToggleSidebar={toggleSidebar}
              onResetUserType={handleResetUserType}
            />
          )}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-6 py-8">
              <Routes>
                <Route
                  path="/"
                  element={
                    userType ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <LandingPage onSelectUserType={handleSelectUserType} />
                    )
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    userType === 'attorney' ? (
                      <Home onResetUserType={handleResetUserType} />
                    ) : userType === 'consumer' ? (
                      <ConsumerDashboard onResetUserType={handleResetUserType} />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route path="/cases" element={<Cases />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/quotes" element={<Quotes />} />
                <Route path="/consultations" element={<Consultations />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;