export const COMMUNITY_GROUPS = [
    {
        id: 'morning-ritual',
        name: 'Morning Ritual',
        description: 'Start your day with intention and energy. A perfect routine for early risers.',
        habits: [
            { name: 'Meditation', category: 'Mindfulness', description: '10 minutes of silent awareness.', frequency: 'Daily', timeOfDay: 'Morning', duration: '10 mins' },
            { name: 'Hydrate', category: 'Health', description: 'Drink a full glass of water.', frequency: 'Daily', timeOfDay: 'Morning', duration: '1 min' },
            { name: 'Read', category: 'Skill', description: 'Read 10 pages of a non-fiction book.', frequency: 'Daily', timeOfDay: 'Morning', duration: '20 mins' }
        ]
    },
    {
        id: 'fitness-basics',
        name: 'Fitness Basics',
        description: 'Build a strong foundation for your physical health.',
        habits: [
            { name: '30m Walk', category: 'Health', description: 'Brisk walking outdoors.', frequency: 'Daily', timeOfDay: 'Morning', duration: '30 mins' },
            { name: 'Stretching', category: 'Health', description: 'Full body stretch routine.', frequency: 'Daily', timeOfDay: 'Any Time', duration: '15 mins' },
            { name: 'No Sugar', category: 'Health', description: 'Avoid added sugars today.', frequency: 'Daily', timeOfDay: 'Any Time', duration: 'All Day' }
        ]
    },
    {
        id: 'deep-work',
        name: 'Deep Work Protocol',
        description: 'Optimize your focus and productivity for high-impact work.',
        habits: [
            { name: 'Deep Work Session', category: 'Productivity', description: '90 minutes of distraction-free work.', frequency: 'Weekdays', timeOfDay: 'Morning', duration: '90 mins' },
            { name: 'Plan Tomorrow', category: 'Productivity', description: 'Outline top 3 priorities for the next day.', frequency: 'Weekdays', timeOfDay: 'Evening', duration: '10 mins' }
        ]
    },
    {
        id: 'mindful-evening',
        name: 'Mindful Evening',
        description: 'Wind down effectively to ensure restorative sleep.',
        habits: [
            { name: 'No Screens', category: 'Health', description: 'No devices 1 hour before bed.', frequency: 'Daily', timeOfDay: 'Evening', duration: '1 hour' },
            { name: 'Journaling', category: 'Mindfulness', description: 'Reflect on the day: 3 wins.', frequency: 'Daily', timeOfDay: 'Evening', duration: '10 mins' },
            { name: 'Prepare Clothes', category: 'Productivity', description: 'Lay out outfit for tomorrow.', frequency: 'Daily', timeOfDay: 'Evening', duration: '5 mins' }
        ]
    }
];
