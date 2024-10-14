import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardData, getNewCasesCount, getUnreadMessagesCount, getActiveCasesCount, getAcceptedQuotesCount } from '../mockData';
import UpcomingConsultations from '../components/UpcomingConsultations';
import NewConsults from '../components/NewConsults';

interface HomeProps {
  onResetUserType: () => void;
}

const Home: React.FC<HomeProps> = ({ onResetUserType }) => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    newCases: 0,
    newMessages: 0,
    activeClients: 0,
    acceptedQuotes: 0,
  });

  useEffect(() => {
    const updateCounts = () => {
      setCounts({
        newCases: getNewCasesCount(),
        newMessages: getUnreadMessagesCount(),
        activeClients: getActiveCasesCount(),
        acceptedQuotes: getAcceptedQuotesCount(),
      });
    };

    updateCounts();
    const interval = setInterval(updateCounts, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item.link)}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <item.icon className="h-8 w-8 text-blue-500 mr-3" />
                <span className="text-lg font-semibold">{item.title}</span>
              </div>
              <span className="text-2xl font-bold">
                {item.title === 'New Cases' && counts.newCases}
                {item.title === 'New Messages' && counts.newMessages}
                {item.title === 'Active Clients' && counts.activeClients}
                {item.title === 'Accepted Quotes' && counts.acceptedQuotes}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>

      <UpcomingConsultations />
      <NewConsults />
    </div>
  );
};

export default Home;