import { useState, useEffect } from 'react';

const STORAGE_KEY_PREFIX = 'TRIPHASE_HABITS_';

export function useHabits(userId) {
    const [habits, setHabits] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Load habits when userId changes
    useEffect(() => {
        if (!userId) {
            setHabits([]);
            setLoaded(false);
            return;
        }
        const saved = localStorage.getItem(STORAGE_KEY_PREFIX + userId);
        setHabits(saved ? JSON.parse(saved) : []);
        setLoaded(true);
    }, [userId]);

    // Save habits when they change (but only if we have a user and have loaded)
    useEffect(() => {
        if (userId && loaded) {
            localStorage.setItem(STORAGE_KEY_PREFIX + userId, JSON.stringify(habits));
        }
    }, [habits, userId, loaded]);

    const addHabit = (name, category, description, details = {}) => {
        const newHabit = {
            id: crypto.randomUUID(),
            name,
            category,
            description,
            frequency: details.frequency || 'Daily',
            timeOfDay: details.timeOfDay || 'Any Time',
            duration: details.duration || '',
            startDate: new Date().toISOString(),
            logs: [], // { date: 'YYYY-MM-DD', status: 'completed'|'skipped', note: '' }
            archived: false
        };
        setHabits(prev => [newHabit, ...prev]);
    };

    const deleteHabit = (id) => {
        setHabits(prev => prev.filter(h => h.id !== id));
    };

    const logHabit = (habitId, status, note = '') => {
        const today = new Date().toISOString().split('T')[0];

        setHabits(prev => prev.map(h => {
            if (h.id !== habitId) return h;

            const existingLogIndex = h.logs.findIndex(l => l.date === today);
            const newLog = { date: today, status, note };

            let newLogs = [...h.logs];
            if (existingLogIndex >= 0) {
                newLogs[existingLogIndex] = newLog;
            } else {
                newLogs.push(newLog);
            }

            return { ...h, logs: newLogs };
        }));
    };

    const editHabit = (id, name, category, description, details = {}) => {
        setHabits(prev => prev.map(h => {
            if (h.id !== id) return h;
            return {
                ...h,
                name,
                category,
                description,
                frequency: details.frequency || h.frequency,
                timeOfDay: details.timeOfDay || h.timeOfDay,
                duration: details.duration || h.duration
            };
        }));
    };

    const importHabits = (data) => {
        setHabits(data);
    };

    return { habits, addHabit, deleteHabit, logHabit, editHabit, importHabits };
}
