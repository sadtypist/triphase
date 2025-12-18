import { ArrowLeft, Plus, Clock, Calendar, Hourglass } from 'lucide-react';

export function CommunityGroupDetail({ group, onBack, onImport, onAddHabit }) {
    return (
        <div style={{ paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={onBack}
                style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: 'none', border: 'none', color: 'var(--text-muted)',
                    marginBottom: '2rem', cursor: 'pointer', fontSize: '1rem'
                }}
            >
                <ArrowLeft size={20} />
                Back to Groups
            </button>

            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.1 }}>{group.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1.6 }}>
                    {group.description}
                </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                {group.habits.map((habit, idx) => (
                    <div key={idx} style={{
                        background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                        padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex', flexDirection: 'column', gap: '1rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{habit.name}</h3>
                            <span style={{
                                padding: '0.25rem 0.75rem', borderRadius: '999px',
                                background: 'rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: 500
                            }}>
                                {habit.category}
                            </span>
                        </div>

                        <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>{habit.description}</p>

                        <div style={{
                            display: 'flex', gap: '1.5rem', marginTop: '0.5rem', paddingTop: '1rem',
                            borderTop: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', alignItems: 'center'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <Calendar size={16} style={{ color: 'var(--primary)', opacity: 0.8 }} />
                                {habit.frequency}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                <Clock size={16} style={{ color: 'var(--primary)', opacity: 0.8 }} />
                                {habit.timeOfDay}
                            </div>
                            {habit.duration && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                    <Hourglass size={16} style={{ color: 'var(--primary)', opacity: 0.8 }} />
                                    {habit.duration}
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    onAddHabit(habit);
                                    alert('Habit added to your dashboard!');
                                }}
                                style={{
                                    marginLeft: 'auto', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                                    fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                            >
                                <Plus size={14} />
                                Add
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => onImport(group)}
                style={{
                    width: '100%', padding: '1.25rem', borderRadius: 'var(--radius-lg)',
                    background: 'var(--primary)', color: 'white', fontWeight: 600, fontSize: '1.125rem',
                    boxShadow: '0 0 20px var(--primary-glow)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                    cursor: 'pointer', transition: 'transform 0.2s'
                }}
            >
                <Plus size={24} />
                Import {group.habits.length} Habits
            </button>
        </div>
    );
}
