import { calculatePhase, getHabitStatusForDate } from '../utils/phaseUtils';
import { CheckCircle2, Circle, Activity, Trash2, Edit2 } from 'lucide-react';

import { useState } from 'react';

export function HabitCard({ habit, onLog, onDelete, onEdit }) {
    const { phase, progress, label, currentDay, totalDays } = calculatePhase(habit.startDate);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const today = new Date().toISOString().split('T')[0];
    const todayLog = getHabitStatusForDate(habit, today);
    const isCompletedToday = todayLog?.status === 'completed';

    return (
        <div style={{
            background: 'var(--bg-card-glass)', borderRadius: 'var(--radius-md)', padding: '1.5rem',
            border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem',
            position: 'relative', overflow: 'hidden'
        }}>
            {/* Background Gradient Mesh */}
            <div style={{
                position: 'absolute', top: 0, right: 0, width: '150px', height: '150px',
                background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)',
                opacity: 0.1, pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <span style={{
                        fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase',
                        letterSpacing: '1px', fontWeight: 600, display: 'block', marginBottom: '0.25rem'
                    }}>
                        {habit.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{habit.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phase {phase}</div>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</div>
                    </div>
                    {showDeleteConfirm ? (
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(habit.id);
                                }}
                                style={{
                                    fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px',
                                    background: 'var(--danger)', color: 'white', fontWeight: 500
                                }}
                            >
                                Confirm
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDeleteConfirm(false);
                                }}
                                style={{
                                    fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px',
                                    background: 'rgba(255,255,255,0.1)', color: 'var(--text-muted)'
                                }}
                            >
                                X
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteConfirm(true);
                            }}
                            style={{
                                color: 'var(--text-muted)', padding: '4px',
                                opacity: 0.6, transition: 'opacity 0.2s'
                            }}
                            className="hover:opacity-100"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(habit);
                        }}
                        style={{
                            color: 'var(--text-muted)', padding: '4px',
                            opacity: 0.6, transition: 'opacity 0.2s'
                        }}
                        className="hover:opacity-100"
                    >
                        <Edit2 size={16} />
                    </button>
                </div>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {habit.description || "No description provided."}
            </p>

            {/* Progress Bar */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                    <span>Day {currentDay} / {totalDays}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%', width: `${progress}%`, background: 'var(--primary)',
                        boxShadow: '0 0 10px var(--primary-glow)', transition: 'width 1s var(--ease-elastic)'
                    }} />
                </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button
                    onClick={isCompletedToday ? undefined : () => onLog(habit)}
                    disabled={isCompletedToday}
                    style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                        background: isCompletedToday ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)',
                        color: isCompletedToday ? 'var(--success)' : 'white',
                        border: isCompletedToday ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.2s', cursor: isCompletedToday ? 'default' : 'pointer'
                    }}
                >
                    {isCompletedToday ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                    {isCompletedToday ? 'Completed for Today' : 'Log Progress'}
                </button>
            </div>
        </div >
    );
}
