import React, { useState, useMemo } from 'react';
import { FileText, X, Filter, MessageSquare, Calendar, Upload, DollarSign } from 'lucide-react';
import { mockCases, Case } from '../mockData';
import { useLocation, useNavigate } from 'react-router-dom';

type CaseStatus = 'New' | 'In Review' | 'Quoted' | 'Accepted' | 'Closed' | 'All';

const Cases: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [statusFilter, setStatusFilter] = useState<CaseStatus>('All');
  const location = useLocation();
  const navigate = useNavigate();

  const filteredCases = useMemo(() => {
    if (statusFilter === 'All') {
      return mockCases;
    }
    return mockCases.filter(caseItem => caseItem.status === statusFilter);
  }, [statusFilter]);

  const handleViewDetails = (caseItem: Case) => {
    setSelectedCase(caseItem);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500 text-white';
      case 'In Review':
        return 'bg-yellow-500 text-white';
      case 'Quoted':
        return 'bg-orange-500 text-white';
      case 'Accepted':
        return 'bg-green-500 text-white';
      case 'Closed':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'sendMessage':
        navigate('/messages');
        break;
      case 'scheduleConsultation':
        navigate('/consultations');
        break;
      case 'uploadDocument':
        console.log('Upload document');
        break;
      case 'createQuote':
        navigate('/quotes');
        break;
      default:
        break;
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <FileText className="w-6 h-6 mr-2" />
          Cases
        </h2>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as CaseStatus)}
            className="border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="In Review">In Review</option>
            <option value="Quoted">Quoted</option>
            <option value="Accepted">Accepted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{caseItem.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{caseItem.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{caseItem.lastUpdated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(caseItem)}
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Case Details</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <p><strong>Title:</strong> {selectedCase.title}</p>
              <p><strong>Client:</strong> {selectedCase.client}</p>
              <p><strong>Status:</strong> 
                <span className={`ml-2 px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedCase.status)}`}>
                  {selectedCase.status}
                </span>
              </p>
              <p><strong>Last Updated:</strong> {selectedCase.lastUpdated}</p>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handleQuickAction('sendMessage')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </button>
              <button
                onClick={() => handleQuickAction('scheduleConsultation')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Consultation
              </button>
              <button
                onClick={() => handleQuickAction('uploadDocument')}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </button>
              <button
                onClick={() => handleQuickAction('createQuote')}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors flex items-center"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Create Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cases;