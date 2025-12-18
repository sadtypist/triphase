import { useState } from 'react';
import { X } from 'lucide-react';

export function CreateHabitModal({ onClose, onSave, initialData = null }) {
    const [name, setName] = useState(initialData?.name || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [frequency, setFrequency] = useState(initialData?.frequency || 'Daily');
    const [timeOfDay, setTimeOfDay] = useState(initialData?.timeOfDay || 'Any Time');
    const [duration, setDuration] = useState(initialData?.duration || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !category) return;
        onSave(name, category, description, { frequency, timeOfDay, duration });
        onClose();
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
            <div className="modal-content" style={{
                background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)',
                width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{initialData ? 'Edit Habit' : 'New Habit'}</h2>
                    <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Title</label>
                        <input
                            autoFocus
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="e.g. Morning Jog"
                            style={{
                                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white', fontSize: '1rem', outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Category</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            style={{
                                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white', fontSize: '1rem', outline: 'none'
                            }}
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Health">Health</option>
                            <option value="Productivity">Productivity</option>
                            <option value="Mindfulness">Mindfulness</option>
                            <option value="Skill">Skill</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Frequency</label>
                            <select
                                value={frequency}
                                onChange={e => setFrequency(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white', fontSize: '1rem', outline: 'none'
                                }}
                            >
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Weekdays">Weekdays</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Time of Day</label>
                            <select
                                value={timeOfDay}
                                onChange={e => setTimeOfDay(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white', fontSize: '1rem', outline: 'none'
                                }}
                            >
                                <option value="Any Time">Any Time</option>
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Goal Duration (Optional)</label>
                        <input
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            placeholder="e.g. 30 mins"
                            style={{
                                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white', fontSize: '1rem', outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Description (Optional)</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Why are you doing this?"
                            rows={3}
                            style={{
                                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white', fontSize: '1rem', outline: 'none', resize: 'vertical'
                            }}
                        />
                    </div>

                    <button type="submit" style={{
                        marginTop: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                        background: 'var(--primary)', color: 'white', fontWeight: 600,
                        boxShadow: '0 0 15px var(--primary-glow)', transition: 'transform 0.2s'
                    }}>
                        {initialData ? 'Save Changes' : 'Start Journey'}
                    </button>
                </form>
            </div>
        </div>
    );
}
