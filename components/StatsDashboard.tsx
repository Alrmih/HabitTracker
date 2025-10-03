
import React from 'react';
import type { HabitWithStats } from '../types';
import CalendarHeatmap from './CalendarHeatmap';
import { Icon } from './Icons';

interface StatsDashboardProps {
  selectedHabit: HabitWithStats | null;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ selectedHabit }) => {
  if (!selectedHabit) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-800 rounded-lg h-full">
         <div className="text-5xl mb-4 text-indigo-300 dark:text-indigo-600">
            <Icon name="TrendingUp" />
         </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Wähle eine Gewohnheit</h2>
        <p className="text-gray-500 dark:text-gray-400">Wähle eine Gewohnheit aus, um deine Statistiken und deinen Fortschritt zu sehen.</p>
      </div>
    );
  }

  const totalCompletions = selectedHabit.logs.length;
  const longestStreak = "TODO"; // Placeholder for more complex calculation

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg h-full flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 p-2 rounded-lg">
                <Icon name={selectedHabit.icon} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedHabit.name}</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedHabit.category}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Aktueller Streak</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">🔥 {selectedHabit.streak}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">Gesamt</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">✅ {totalCompletions}</p>
        </div>
      </div>
      
      <div className="flex-grow">
        <CalendarHeatmap logs={selectedHabit.logs} habitStartDate={selectedHabit.createdAt} />
      </div>
    </div>
  );
};

export default StatsDashboard;
