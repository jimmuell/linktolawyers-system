import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LegalServiceRequestForm from '../components/LegalServiceRequestForm';

interface LandingPageProps {
  onSelectUserType: (type: 'attorney' | 'consumer') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectUserType }) => {
  const navigate = useNavigate();
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const handleGetQuote = () => {
    setShowQuoteForm(true);
  };

  const handleAttorneyDashboard = () => {
    onSelectUserType('attorney');
    navigate('/dashboard');
  };

  const handleConsumerDashboard = () => {
    onSelectUserType('consumer');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to LinkToLawyers</h1>
        <p className="text-xl text-gray-600">Connecting clients with expert legal professionals</p>
      </div>
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <button
          onClick={handleGetQuote}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors w-64"
        >
          Get a Free Quote
        </button>
        <button
          onClick={handleAttorneyDashboard}
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors w-64"
        >
          Attorney Dashboard
        </button>
        <button
          onClick={handleConsumerDashboard}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition-colors w-64"
        >
          Consumer Dashboard
        </button>
      </div>
      {showQuoteForm && <LegalServiceRequestForm onClose={() => setShowQuoteForm(false)} />}
    </div>
  );
};

export default LandingPage;