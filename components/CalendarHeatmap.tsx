
import React, { useState } from 'react';
import { format, isSameMonth, isSameDay, startOfMonth, addMonths, subMonths } from 'date-fns';
import { de } from 'date-fns/locale';
import { getDaysInMonth } from '../utils/dateUtils';
import type { HabitLog } from '../types';

interface CalendarHeatmapProps {
  logs: HabitLog[];
  habitStartDate: string;
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({ logs, habitStartDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthDays = getDaysInMonth(currentDate);
  const today = new Date();
  
  const completedDates = new Set(logs.map(log => log.date));

  const changeMonth = (amount: number) => {
    setCurrentDate(prev => amount > 0 ? addMonths(prev, 1) : subMonths(prev, 1));
  };
  
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
          {format(currentDate, 'MMMM yyyy', { locale: de })}
        </h3>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 dark:text-gray-400">
        {['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'].map(day => (
          <div key={day} className="font-semibold">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {monthDays.map(day => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const isCompleted = completedDates.has(dayStr);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isToday = isSameDay(day, today);
          const isInTheFuture = day > today;
          const isBeforeHabitStart = day < new Date(habitStartDate);

          let bgClass = 'bg-gray-100 dark:bg-gray-700';
          if(isBeforeHabitStart || isInTheFuture) {
              bgClass = 'bg-transparent dark:bg-transparent';
          } else if (isCompleted) {
              bgClass = 'bg-green-500';
          }

          return (
            <div key={dayStr} className={`w-full aspect-square rounded-md flex items-center justify-center ${!isCurrentMonth ? 'text-gray-300 dark:text-gray-600' : 'text-gray-700 dark:text-gray-200'} ${isToday ? 'ring-2 ring-indigo-500' : ''} ${bgClass}`}>
              {(isCurrentMonth && !isInTheFuture && !isBeforeHabitStart) || isToday ? format(day, 'd') : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarHeatmap;
