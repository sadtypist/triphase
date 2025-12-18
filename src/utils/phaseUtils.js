export const PHASE_CONFIG = {
    1: { duration: 3, label: '3 Days' },
    2: { duration: 21, label: '3 Weeks' }, // Cumulative day 21? Or +21 days? The prompt says "3 weeks", usually meaning 21 days total duration for this phase.
    // Interpretation:
    // Phase 1: Day 1-3 (3 days)
    // Phase 2: Day 4-24 (21 days) OR Day 1-21 (total 21 days from start)?
    // "Tracking a habit follows... 3 days, 3 weeks, 3 months"
    // Usually this means milestones. 
    // Milestone 1: Reach 3 days.
    // Milestone 2: Reach 3 weeks (21 days).
    // Milestone 3: Reach 3 months (90 days).
    // So Phase 1 is Days 0-3. Phase 2 is Days 3-21. Phase 3 is Days 21-90.
    3: { duration: 90, label: '3 Months' }
};

export function getDaysSinceStart(startDateStr) {
    const start = new Date(startDateStr);
    const now = new Date();
    // Reset hours to compare dates only
    start.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = now.getTime() - start.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Days elapsed
}

export function calculatePhase(startDateStr) {
    const daysElapsed = getDaysSinceStart(startDateStr) + 1; // Day 1 is the start day

    if (daysElapsed <= 3) {
        return {
            phase: 1,
            currentDay: daysElapsed,
            totalDays: 3,
            label: 'Initiation',
            progress: (daysElapsed / 3) * 100
        };
    } else if (daysElapsed <= 21) {
        return {
            phase: 2,
            currentDay: daysElapsed,
            totalDays: 21,
            label: 'Formation',
            progress: (daysElapsed / 21) * 100
        };
    } else if (daysElapsed <= 90) {
        return {
            phase: 3,
            currentDay: daysElapsed,
            totalDays: 90,
            label: 'Integration',
            progress: (daysElapsed / 90) * 100
        };
    } else {
        return {
            phase: 4,
            currentDay: daysElapsed,
            totalDays: daysElapsed,
            label: 'Mastery',
            progress: 100
        };
    }
}

export function getHabitStatusForDate(habit, dateStr) {
    // dateStr is YYYY-MM-DD
    return habit.logs.find(l => l.date === dateStr);
}
