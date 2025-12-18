import { useState } from 'react';
import { X } from 'lucide-react';

export function LogHabitModal({ habit, onClose, onConfirm }) {
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(habit.id, 'completed', note);
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
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Log Progress</h2>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{habit.name}</p>
                    </div>
                    <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Note (Optional)</label>
                        <textarea
                            autoFocus
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            placeholder="How did it go today?"
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
                        background: 'var(--success)', color: 'white', fontWeight: 600,
                        boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)', transition: 'transform 0.2s',
                        border: 'none', cursor: 'pointer'
                    }}>
                        Check-in for Today
                    </button>
                </form>
            </div>
        </div>
    );
}
