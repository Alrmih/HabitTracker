
export interface Habit {
  id: string;
  name: string;
  icon: string;
  category: string;
  createdAt: string; // ISO Date string
}

export interface HabitLog {
  habitId: string;
  date: string; // 'YYYY-MM-DD' format
}

export type HabitWithStats = Habit & {
  streak: number;
  completedToday: boolean;
  logs: HabitLog[];
};
