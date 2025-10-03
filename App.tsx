
import React, { useState, useMemo } from 'react';
import type { Habit, HabitLog, HabitWithStats } from './types';
import { getTodayDateString, calculateStreak } from './utils/dateUtils';
import { INITIAL_HABITS } from './constants';
import useLocalStorage from './hooks/useLocalStorage';
import HabitCard from './components/HabitCard';
import AddHabitModal from './components/AddHabitModal';
import Button from './components/ui/Button';
import StatsDashboard from './components/StatsDashboard';

const App: React.FC = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', INITIAL_HABITS);
  const [logs, setLogs] = useLocalStorage<HabitLog[]>('logs', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(habits.length > 0 ? habits[0].id : null);

  const habitsWithStats: HabitWithStats[] = useMemo(() => {
    const today = getTodayDateString();
    return habits.map(habit => {
      const habitLogs = logs.filter(log => log.habitId === habit.id);
      return {
        ...habit,
        logs: habitLogs,
        streak: calculateStreak(habitLogs),
        completedToday: habitLogs.some(log => log.date === today),
      };
    });
  }, [habits, logs]);
  
  const selectedHabit = habitsWithStats.find(h => h.id === selectedHabitId) || null;

  const handleAddHabit = (newHabit: Omit<Habit, 'id' | 'createdAt'>) => {
    const habitToAdd: Habit = {
      ...newHabit,
      id: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    const updatedHabits = [...habits, habitToAdd];
    setHabits(updatedHabits);
    setSelectedHabitId(habitToAdd.id);
  };

  const handleToggleComplete = (habitId: string, completed: boolean) => {
    const today = getTodayDateString();
    if (completed) {
      setLogs([...logs, { habitId, date: today }]);
    } else {
      setLogs(logs.filter(log => !(log.habitId === habitId && log.date === today)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">HabitTracker</h1>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">Entwickle Routinen, die bleiben.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="mt-4 sm:mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Neue Gewohnheit
          </Button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2">Heutige Gewohnheiten</h2>
            {habitsWithStats.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggleComplete={handleToggleComplete}
                onSelect={setSelectedHabitId}
                isSelected={selectedHabitId === habit.id}
              />
            ))}
             {habits.length === 0 && (
                <div className="text-center py-10 px-6 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">Noch keine Gewohnheiten hier.</p>
                    <p className="text-gray-500 dark:text-gray-400">Füge deine erste hinzu, um zu starten!</p>
                </div>
            )}
          </div>
          <div className="lg:col-span-2">
             <StatsDashboard selectedHabit={selectedHabit} />
          </div>
        </main>
      </div>
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddHabit={handleAddHabit}
      />
    </div>
  );
};

export default App;
