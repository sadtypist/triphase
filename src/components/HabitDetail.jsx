import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Circle, X, Trash2, Edit2 } from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { calculatePhase, getDaysSinceStart, getHabitStatusForDate } from '../utils/phaseUtils';

export function HabitDetail({ habit, onClose, onLog, onDelete, onEdit }) {
    const [note, setNote] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const { phase, progress, label, currentDay, totalDays } = calculatePhase(habit.startDate);
    const today = new Date().toISOString().split('T')[0];
    const todayLog = getHabitStatusForDate(habit, today);
    const isCompletedToday = todayLog?.status === 'completed';

    // Prepare Chart Data (Last 14 days)
    const chartData = useMemo(() => {
        const data = [];
        for (let i = 13; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const log = getHabitStatusForDate(habit, dateStr);
            data.push({
                date: dateStr.slice(5), // MM-DD
                value: log?.status === 'completed' ? 100 : (log?.status === 'skipped' ? 50 : 0),
                note: log?.note
            });
        }
        return data;
    }, [habit]);

    // Prepare Calendar Data (90 Days)
    const calendarPhases = useMemo(() => {
        // We want to show the 3 phases visually
        // Phase 1: 1-3
        // Phase 2: 4-21
        // Phase 3: 22-90

        // We can generate a simple array for the grid
        const days = [];
        for (let i = 1; i <= 90; i++) {
            // Calculate status for this specific day number
            // We need to find the absolute date for Day i
            const start = new Date(habit.startDate);
            start.setDate(start.getDate() + (i - 1));
            const dateStr = start.toISOString().split('T')[0];

            const isPast = dateStr < today;
            const isToday = dateStr === today;
            const log = getHabitStatusForDate(habit, dateStr);

            let status = 'future';
            if (isPast || isToday) {
                if (log?.status === 'completed') status = 'completed';
                else if (log?.status === 'skipped') status = 'skipped';
                else if (isPast) status = 'missed';
                else status = 'pending'; // Today, not logged yet
            }

            days.push({ dayNum: i, date: dateStr, status });
        }
        return days;
    }, [habit, today]);

    const handleLogSubmit = (e) => {
        e.preventDefault();
        onLog(habit.id, 'completed', note);
        setNote('');
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'var(--bg-app)', zIndex: 100,
            overflowY: 'auto', paddingBottom: '2rem'
        }}>
            {/* Dynamic Background for Detail View */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: -1,
                background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15), transparent 70%)'
            }} />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                {/* Header */}
                <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={onClose} style={{
                        padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
                        color: 'var(--text-main)', transition: 'background 0.2s', display: 'flex'
                    }}>
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>{habit.name}</h1>
                        <p style={{ color: 'var(--text-muted)' }}>{habit.category} • Phase {phase} ({label})</p>
                    </div>
                    {showDeleteConfirm ? (
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button
                                onClick={() => {
                                    onDelete(habit.id);
                                    setShowDeleteConfirm(false);
                                }}
                                style={{
                                    padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                                    background: 'var(--danger)', color: 'white', fontWeight: 600,
                                    border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                                    zIndex: 10, position: 'relative'
                                }}
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                style={{
                                    padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)',
                                    border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                                    zIndex: 10, position: 'relative'
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button
                            title="Delete Habit"
                            onClick={() => setShowDeleteConfirm(true)}
                            style={{
                                marginLeft: 'auto', padding: '0.75rem', borderRadius: 'var(--radius-md)',
                                background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)',
                                border: '1px solid rgba(239, 68, 68, 0.2)', transition: 'background 0.2s'
                            }}
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                    <button
                        onClick={() => onEdit(habit)}
                        style={{
                            marginLeft: '0.5rem', padding: '0.75rem', borderRadius: 'var(--radius-md)',
                            background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)',
                            border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'background 0.2s'
                        }}
                        title="Edit Habit"
                    >
                        <Edit2 size={20} />
                    </button>
                </header>

                {/* Analytics Section */}
                <div style={{ display: 'grid', gap: '2rem' }}>

                    {/* Main Status Card */}
                    <div style={{
                        background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '2rem',
                        border: '1px solid rgba(255,255,255,0.05)', display: 'grid', mdGridTemplateColumns: '1fr 1fr', gap: '2rem'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>Current Progress</h2>
                            <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary)' }}>
                                {Math.round(progress)}%
                            </div>
                            <p style={{ color: 'var(--text-muted)' }}>Day {currentDay} of {totalDays} in Phase {phase}</p>

                            {/* Embedded Log Form */}
                            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                {isCompletedToday ? (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)',
                                        background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)'
                                    }}>
                                        <CheckCircle2 />
                                        <span style={{ fontWeight: 500 }}>Completed for today</span>
                                    </div>
                                ) : (
                                    <form onSubmit={handleLogSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <textarea
                                            value={note}
                                            onChange={e => setNote(e.target.value)}
                                            placeholder="Add a note for today's log..."
                                            rows={2}
                                            style={{
                                                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                                background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                                color: 'white', fontSize: '0.875rem', outline: 'none', resize: 'vertical'
                                            }}
                                        />
                                        <button type="submit" style={{
                                            padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                            background: 'var(--primary)', color: 'white', fontWeight: 600,
                                            boxShadow: '0 0 15px var(--primary-glow)', width: '100%'
                                        }}>
                                            Log Completion
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Graph */}
                        <div style={{ height: '300px', width: '100%', minWidth: 0 }}>
                            <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Activity Trend (14 Days)</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                    <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 12 }} />
                                    <YAxis hide domain={[0, 100]} />
                                    <Tooltip
                                        contentStyle={{ background: '#18181b', border: '1px solid #333', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--primary)' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Phase Calendar */}
                    <div style={{
                        background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', padding: '2rem',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 600 }}>Phase Journey Map (90 Days)</h2>

                        <div style={{ display: 'grid', gap: '2rem' }}>
                            {/* Legend/Labels are tricky with grid, let's just do a big grid with color coding for phases */}

                            {/* Phase 1 */}
                            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Phase 1 (Days 1-3)</div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {calendarPhases.slice(0, 3).map(day => <DayBox key={day.dayNum} day={day} />)}
                                </div>
                            </div>

                            {/* Phase 2 */}
                            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Phase 2 (Days 4-21)</div>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {calendarPhases.slice(3, 21).map(day => <DayBox key={day.dayNum} day={day} />)}
                                </div>
                            </div>

                            {/* Phase 3 */}
                            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Phase 3 (Days 22-90)</div>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {calendarPhases.slice(21, 90).map(day => <DayBox key={day.dayNum} day={day} />)}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

function DayBox({ day }) {
    let bg = 'rgba(255,255,255,0.05)';
    let border = '1px solid rgba(255,255,255,0.1)';
    let color = 'var(--text-muted)';

    if (day.status === 'completed') {
        bg = 'var(--primary)';
        border = '1px solid var(--primary)';
        color = 'white';
    } else if (day.status === 'missed') {
        bg = 'rgba(239, 68, 68, 0.1)';
        border = '1px solid rgba(239, 68, 68, 0.2)';
        color = 'var(--danger)';
    } else if (day.status === 'pending') { // Today
        bg = 'rgba(255,255,255,0.1)';
        border = '1px solid rgba(255,255,255,0.2)';
        color = 'white';
    }

    return (
        <div style={{
            width: '36px', height: '36px', borderRadius: '4px',
            background: bg, border: border, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', color: color, cursor: 'default'
        }} title={`Day ${day.dayNum} - ${day.date}`}>
            {day.dayNum}
        </div>
    );
}
