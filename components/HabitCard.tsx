
import React from 'react';
import type { HabitWithStats } from '../types';
import { Icon } from './Icons';

interface HabitCardProps {
  habit: HabitWithStats;
  onToggleComplete: (habitId: string, completed: boolean) => void;
  onSelect: (habitId: string) => void;
  isSelected: boolean;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggleComplete, onSelect, isSelected }) => {
    
  const handleCompleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete(habit.id, !habit.completedToday);
  };

  const selectionClass = isSelected ? 'ring-2 ring-indigo-500 shadow-lg' : 'hover:shadow-md';

  return (
    <div
      onClick={() => onSelect(habit.id)}
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between transition-all duration-200 cursor-pointer ${selectionClass}`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 p-3 rounded-lg">
          <Icon name={habit.icon} />
        </div>
        <div>
          <p className="font-bold text-gray-800 dark:text-gray-100">{habit.name}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>🔥</span>
            <span>{habit.streak} Tage</span>
          </div>
        </div>
      </div>
      <button
        onClick={handleCompleteClick}
        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
          habit.completedToday
            ? 'bg-green-500 text-white scale-110'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-green-200 dark:hover:bg-green-900'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default HabitCard;
