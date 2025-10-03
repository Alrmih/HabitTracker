
import type { Habit } from './types';

export const CATEGORIES = [
  "Gesundheit",
  "Lernen",
  "Fitness",
  "Haushalt",
  "Arbeit",
  "Soziales",
  "Persönliches Wachstum",
];

export const ICONS = [
  "BookOpen", "Droplet", "HeartPulse", "BrainCircuit", "Dumbbell", "Bed",
  "DollarSign", "Apple", "Briefcase", "Home", "Users", "Leaf", "Award", "TrendingUp"
];

export const INITIAL_HABITS: Habit[] = [
    {
        id: '1',
        name: 'Täglich 2L Wasser trinken',
        icon: 'Droplet',
        category: 'Gesundheit',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString(),
    },
    {
        id: '2',
        name: '30 Minuten lesen',
        icon: 'BookOpen',
        category: 'Lernen',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    },
    {
        id: '3',
        name: 'Morgensport',
        icon: 'Dumbbell',
        category: 'Fitness',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString(),
    },
    {
        id: '4',
        name: 'Vor 23 Uhr schlafen gehen',
        icon: 'Bed',
        category: 'Gesundheit',
        createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    }
];
