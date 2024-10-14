import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { mockConsultations, mockClients, Consultation } from '../mockData';

const localizer = momentLocalizer(moment);

const Consultations: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>(mockConsultations);
  // ... (rest of the component remains the same)

  // Update the events to use the mockConsultations data
  const events = consultations.map(consultation => ({
    id: consultation.id,
    title: `${consultation.clientName} - ${consultation.caseTitle}`,
    start: new Date(`${consultation.date}T${consultation.time}`),
    end: moment(`${consultation.date}T${consultation.time}`).add(1, 'hours').toDate(),
  }));

  // ... (rest of the component remains the same)
};

export default Consultations;