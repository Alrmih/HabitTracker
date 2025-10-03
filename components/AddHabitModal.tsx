
import React, { useState } from 'react';
import type { Habit } from '../types';
import { CATEGORIES, ICONS } from '../constants';
import Modal from './ui/Modal';
import Button from './ui/Button';
import { Icon } from './Icons';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => void;
}

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose, onAddHabit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddHabit({ name, category, icon: selectedIcon });
      setName('');
      setCategory(CATEGORIES[0]);
      setSelectedIcon(ICONS[0]);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Neue Gewohnheit erstellen">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="habit-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name der Gewohnheit
          </label>
          <input
            type="text"
            id="habit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-gray-100"
            placeholder="z.B. 30 Minuten lesen"
            required
          />
        </div>

        <div>
          <label htmlFor="habit-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Kategorie
          </label>
          <select
            id="habit-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900 dark:text-gray-100"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Icon
            </label>
            <div className="mt-2 grid grid-cols-8 gap-2">
                {ICONS.map(iconName => (
                    <button
                        type="button"
                        key={iconName}
                        onClick={() => setSelectedIcon(iconName)}
                        className={`p-2 rounded-lg transition-all ${selectedIcon === iconName ? 'bg-indigo-500 text-white ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-indigo-500' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900'}`}
                    >
                        <Icon name={iconName} />
                    </button>
                ))}
            </div>
        </div>


        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Abbrechen
          </Button>
          <Button type="submit">
            Gewohnheit hinzufügen
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddHabitModal;
