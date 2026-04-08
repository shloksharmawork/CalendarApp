import React, { useState } from 'react';
import styles from './CalendarApp.module.css';
import HeroSection from './HeroSection';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';

const CalendarApp = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('calendarNotes');
    if (savedNotes) {
      try {
        return JSON.parse(savedNotes);
      } catch {
        console.error('Failed to parse notes from local storage');
      }
    }
    return {};
  });

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem('calendarNotes', JSON.stringify(updatedNotes));
  };

  const currentSelectionKey = React.useMemo(() => {
    if (!selectionStart) {
      const year = currentMonth.getFullYear();
      const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
      return `month_${year}_${month}`;
    }
    
    // Sort dates if start > end when creating key to keep it consistent
    let startD = selectionStart;
    let endD = selectionEnd || selectionStart; // if no end, single date
    
    if (startD > endD) {
      const temp = startD; startD = endD; endD = temp;
    }
    
    const startStr = startD.toISOString().split('T')[0];
    const endStr = endD.toISOString().split('T')[0];
    
    if (startStr === endStr) return `date_${startStr}`;
    return `range_${startStr}_to_${endStr}`;
  }, [selectionStart, selectionEnd, currentMonth]);

  const handleNotesChange = (text) => {
    saveNotes({
      ...notes,
      [currentSelectionKey]: text
    });
  };

  const handleDateClick = (date) => {
    if (!selectionStart || (selectionStart && selectionEnd)) {
      // Start a new selection
      setSelectionStart(date);
      setSelectionEnd(null);
    } else if (selectionStart && !selectionEnd) {
      // Complete selection
      setSelectionEnd(date);
    }
  };

  const clearSelection = () => {
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarContent}>
        <HeroSection currentMonth={currentMonth} />
        
        <div className={styles.bottomSection}>
          <NotesSection 
            notesData={notes[currentSelectionKey] || ''}
            selectionKey={currentSelectionKey}
            onNotesChange={handleNotesChange}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            currentMonth={currentMonth}
          />
          
          <CalendarGrid 
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            selectionStart={selectionStart}
            selectionEnd={selectionEnd}
            onDateClick={handleDateClick}
            clearSelection={clearSelection}
            notes={notes}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
