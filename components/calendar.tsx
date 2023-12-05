import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (value:any) => {
    // The 'value' parameter is the selected date.
    console.log(value)
    setDate(value);
  };

  return (
    <div>
      <Calendar value={date} onChange={handleDateChange} />
    </div>
  );
}

export default MyCalendar;
