
import { format, eachDayOfInterval, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays, addDays } from 'date-fns';
import { de } from 'date-fns/locale';

export const getTodayDateString = (): string => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const formatDate = (date: Date, formatStr: string = 'PPP'): string => {
  return format(date, formatStr, { locale: de });
};

export const getDaysInMonth = (date: Date): Date[] => {
    const start = startOfWeek(startOfMonth(date), { locale: de });
    const end = endOfWeek(endOfMonth(date), { locale: de });
    return eachDayOfInterval({ start, end });
}

export const calculateStreak = (logs: { date: string }[]): number => {
    if (logs.length === 0) return 0;

    const sortedDates = logs.map(log => log.date).sort().reverse();
    let streak = 0;
    let today = new Date();
    
    const todayStr = format(today, 'yyyy-MM-dd');
    const yesterdayStr = format(subDays(today, 1), 'yyyy-MM-dd');
    
    // Check if the latest log is today or yesterday
    if (sortedDates[0] === todayStr || sortedDates[0] === yesterdayStr) {
        streak = 1;
        let lastDate = new Date(sortedDates[0]);
        for (let i = 1; i < sortedDates.length; i++) {
            const currentDate = new Date(sortedDates[i]);
            const expectedDate = subDays(lastDate, 1);
            if (format(currentDate, 'yyyy-MM-dd') === format(expectedDate, 'yyyy-MM-dd')) {
                streak++;
                lastDate = currentDate;
            } else {
                break;
            }
        }
        // If the latest log was yesterday and not today, the streak is valid, but doesn't include today.
        // If it was today, it is also valid. The loop correctly counts consecutive days backwards.
    }

    // Special case: if today is not logged, but yesterday was, we still count the streak.
    if (sortedDates[0] === yesterdayStr && !sortedDates.includes(todayStr)) {
        // Streak is already calculated correctly
    } else if (!sortedDates.includes(todayStr)) {
        // if today is not logged and yesterday wasn't either, the streak is broken for today.
        // But if the last log was 2 days ago, the streak is 0.
        if (sortedDates.length > 0 && sortedDates[0] !== yesterdayStr) {
            return 0;
        }
    }

    return streak;
};
