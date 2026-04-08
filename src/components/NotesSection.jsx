import React from 'react';
import { format, isSameDay } from 'date-fns';
import styles from './NotesSection.module.css';

const NotesSection = ({ 
  notesData, 
  onNotesChange, 
  selectionStart, 
  selectionEnd,
  currentMonth
}) => {
  
  let subtitle = '';
  
  if (!selectionStart) {
    subtitle = `${format(currentMonth, 'MMMM yyyy')} overview`;
  } else if (selectionStart && !selectionEnd) {
    subtitle = `Notes for ${format(selectionStart, 'MMM do, yyyy')}`;
  } else if (selectionStart && selectionEnd) {
    if (isSameDay(selectionStart, selectionEnd)) {
      subtitle = `Notes for ${format(selectionStart, 'MMM do, yyyy')}`;
    } else {
      let start = selectionStart;
      let end = selectionEnd;
      if (start > end) {
        const temp = start; start = end; end = temp;
      }
      subtitle = `${format(start, 'MMM do')} - ${format(end, 'MMM do, yyyy')}`;
    }
  }

  return (
    <div className={styles.notesContainer}>
      <h2 className={styles.title}>Notes</h2>
      <div className={styles.subtitle}>{subtitle}</div>
      <textarea 
        className={styles.textArea}
        value={notesData}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Jot down memos or attach notes to dates..."
        spellCheck="false"
      />
    </div>
  );
};

export default NotesSection;
