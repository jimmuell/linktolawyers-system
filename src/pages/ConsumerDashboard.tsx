import React, { useState } from 'react';
import { FileText, DollarSign, Clock } from 'lucide-react';
import { mockCases, mockQuotes } from '../mockData';

interface ConsumerDashboardProps {
  onResetUserType: () => void;
}

const ConsumerDashboard: React.FC<ConsumerDashboardProps> = ({ onResetUserType }) => {
  const [cases, setCases] = useState(mockCases);
  const [quotes, setQuotes] = useState(mockQuotes);

  const handleAcceptQuote = (quoteId: number) => {
    setQuotes(prevQuotes =>
      prevQuotes.map(quote =>
        quote.id === quoteId ? { ...quote, status: 'Accepted' } : quote
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Consumer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Case Status
          </h2>
          {cases.length > 0 ? (
            <ul className="space-y-4">
              {cases.map(caseItem => (
                <li key={caseItem.id} className="flex justify-between items-center">
                  <span>{caseItem.title}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${caseItem.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      caseItem.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                      caseItem.status === 'Quoted' ? 'bg-purple-100 text-purple-800' :
                      caseItem.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {caseItem.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No active cases at the moment.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activity
          </h2>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <span>Case status updated: Smith vs. Johnson</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>New quote received: Brown Estate</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Document uploaded: Davis Divorce</span>
              <span className="text-sm text-gray-500">3 days ago</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Quotes
        </h2>
        {quotes.length > 0 ? (
          <ul className="space-y-4">
            {quotes.map(quote => (
              <li key={quote.id} className="flex justify-between items-center">
                <span>{quote.caseTitle}</span>
                <div>
                  <span className="mr-4">${quote.amount}</span>
                  {quote.status === 'Pending' ? (
                    <button
                      onClick={() => handleAcceptQuote(quote.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">{quote.status}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No quotes available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ConsumerDashboard;