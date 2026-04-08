import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  isWithinInterval,
  isBefore,
  format
} from 'date-fns';
import styles from './CalendarGrid.module.css';

const CalendarGrid = ({
  currentMonth,
  onMonthChange,
  selectionStart,
  selectionEnd,
  onDateClick,
  clearSelection,
  notes
}) => {
  const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const handlePrevMonth = () => onMonthChange(subMonths(currentMonth, 1));
  const handleNextMonth = () => onMonthChange(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  // date-fns startOfWeek default is Sunday(0), standard calendar is Monday(1)
  const startDate = startOfWeek(monthStart, { weekStarts: 1 });
  const endDate = endOfWeek(monthEnd, { weekStarts: 1 });

  const dateFormat = "d";
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const isDateInRange = (date) => {
    if (selectionStart && selectionEnd) {
      const start = isBefore(selectionStart, selectionEnd) ? selectionStart : selectionEnd;
      const end = isBefore(selectionStart, selectionEnd) ? selectionEnd : selectionStart;
      return isWithinInterval(date, { start, end });
    }
    return false;
  };

  const hasNoteParams = (date) => {
    // Basic day check
    const dateStr = format(date, 'yyyy-MM-dd');
    const keys = Object.keys(notes);
    
    // Check if this date has a specific date note or is within a range note
    return keys.some(key => {
      if (key === `date_${dateStr}` && notes[key].trim().length > 0) return true;
      if (key.startsWith('range_')) {
        const [, startStr, , endStr] = key.split('_');
        const start = new Date(startStr);
        const end = new Date(endStr);
        const inRange = date >= start && date <= end;
        if (inRange && notes[key].trim().length > 0) return true;
      }
      return false;
    });
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <div className={styles.monthNav}>
          <button onClick={handlePrevMonth} className={styles.navBtn} aria-label="Previous Month">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNextMonth} className={styles.navBtn} aria-label="Next Month">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((day) => (
          <div className={styles.weekday} key={day}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {days.map((day, idx) => {
          const isSelectedStart = selectionStart && isSameDay(day, selectionStart);
          const isSelectedEnd = selectionEnd && isSameDay(day, selectionEnd);
          const isRange = isDateInRange(day);
          
          let rangeClass = '';
          if (isRange && !isSelectedStart && !isSelectedEnd) {
            rangeClass = styles.inRangeBg;
          } else if (isRange && isSelectedStart && selectionEnd && !isSameDay(selectionStart, selectionEnd)) {
            // Determine if start is left or right of the selection mathematically
            const isLeft = isBefore(selectionStart, selectionEnd);
            rangeClass = `${styles.inRangeBg} ${isLeft ? styles.start : styles.end}`;
          } else if (isRange && isSelectedEnd && selectionStart && !isSameDay(selectionStart, selectionEnd)) {
            const isRight = isBefore(selectionStart, selectionEnd);
            rangeClass = `${styles.inRangeBg} ${isRight ? styles.end : styles.start}`;
          }

          if (!isSameMonth(day, monthStart)) {
            return (
              <div key={idx} className={styles.dayCellWrapper}>
                <div className={`${styles.dayCell} ${styles.empty}`}></div>
              </div>
            );
          }

          return (
            <div key={idx} className={styles.dayCellWrapper}>
              {rangeClass && <div className={rangeClass}></div>}
              
              <div
                className={`
                  ${styles.dayCell} 
                  ${isSelectedStart ? styles.selectedStart : ''} 
                  ${isSelectedEnd ? styles.selectedEnd : ''} 
                  ${isToday(day) ? styles.today : ''}
                  ${hasNoteParams(day) ? styles.hasNote : ''}
                `}
                onClick={() => onDateClick(day)}
              >
                {format(day, dateFormat)}
              </div>
            </div>
          );
        })}
      </div>

      {(selectionStart || selectionEnd) && (
        <button onClick={clearSelection} className={styles.clearBtn}>
          Clear Selection
        </button>
      )}
    </div>
  );
};

export default CalendarGrid;
