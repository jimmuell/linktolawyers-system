import { LayoutDashboard, MessageSquare, Users, FileText, DollarSign } from 'lucide-react';

export interface Case {
  id: number;
  title: string;
  client: string;
  status: 'New' | 'In Review' | 'Quoted' | 'Accepted' | 'Closed';
  lastUpdated: string;
}

export interface Message {
  id: number;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  unread: boolean;
  deleted: boolean;
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  casesCount: number;
  status: 'Active' | 'Inactive' | 'Pending';
}

export interface Quote {
  id: number;
  clientName: string;
  caseTitle: string;
  amount: number;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
  expiresAt: string;
}

export interface Consultation {
  id: number;
  clientName: string;
  caseTitle: string;
  date: string;
  time: string;
  notes: string;
}

export const mockCases: Case[] = [
  { id: 1, title: 'Smith vs. Johnson', client: 'John Smith', status: 'New', lastUpdated: '2023-06-15' },
  { id: 2, title: 'Brown Estate', client: 'Sarah Brown', status: 'In Review', lastUpdated: '2023-06-14' },
  { id: 3, title: 'Davis Divorce', client: 'Michael Davis', status: 'Quoted', lastUpdated: '2023-06-13' },
];

export const mockMessages: Message[] = [
  { id: 1, sender: 'John Smith', recipient: 'Lawyer', content: 'Hello, I have a question about my case.', timestamp: '2023-06-15T10:00:00', unread: true, deleted: false },
  { id: 2, sender: 'Lawyer', recipient: 'Sarah Brown', content: 'Your documents have been received. We will review them shortly.', timestamp: '2023-06-14T14:30:00', unread: false, deleted: false },
];

export const mockClients: Client[] = [
  { id: 1, name: 'John Smith', email: 'john@example.com', phone: '123-456-7890', casesCount: 1, status: 'Active' },
  { id: 2, name: 'Sarah Brown', email: 'sarah@example.com', phone: '098-765-4321', casesCount: 1, status: 'Active' },
  { id: 3, name: 'Michael Davis', email: 'michael@example.com', phone: '555-555-5555', casesCount: 1, status: 'Pending' },
];

export const mockQuotes: Quote[] = [
  { id: 1, clientName: 'John Smith', caseTitle: 'Smith vs. Johnson', amount: 5000, status: 'Pending', createdAt: '2023-06-10', expiresAt: '2023-06-24' },
  { id: 2, clientName: 'Sarah Brown', caseTitle: 'Brown Estate', amount: 7500, status: 'Accepted', createdAt: '2023-06-08', expiresAt: '2023-06-22' },
];

export const mockConsultations: Consultation[] = [
  { id: 1, clientName: 'John Smith', caseTitle: 'Smith vs. Johnson', date: '2023-06-20', time: '10:00', notes: 'Initial consultation' },
  { id: 2, clientName: 'Sarah Brown', caseTitle: 'Brown Estate', date: '2023-06-22', time: '14:00', notes: 'Document review' },
];

export const dashboardData = [
  { icon: FileText, title: 'New Cases', count: 0, link: '/cases' },
  { icon: MessageSquare, title: 'New Messages', count: 0, link: '/messages' },
  { icon: Users, title: 'Active Clients', count: 0, link: '/clients' },
  { icon: DollarSign, title: 'Accepted Quotes', count: 0, link: '/quotes' },
];

export const getNewCasesCount = () => mockCases.filter(c => c.status === 'New').length;
export const getUnreadMessagesCount = () => mockMessages.filter(m => m.unread).length;
export const getActiveCasesCount = () => mockCases.filter(c => c.status !== 'Closed').length;
export const getAcceptedQuotesCount = () => mockQuotes.filter(q => q.status === 'Accepted').length;

export const addMessage = (message: Message) => {
  mockMessages.push(message);
};

export const deleteMessage = (id: number) => {
  const index = mockMessages.findIndex(m => m.id === id);
  if (index !== -1) {
    mockMessages[index].deleted = true;
  }
};

export const toggleMessageReadStatus = (id: number) => {
  const index = mockMessages.findIndex(m => m.id === id);
  if (index !== -1) {
    mockMessages[index].unread = !mockMessages[index].unread;
  }
};