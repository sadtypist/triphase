import { useState, useRef } from 'react';
import { X, User, Mail, Lock, Check, Shield, Download, Upload } from 'lucide-react';

export function ProfileModal({ user, onClose, onSave, habits, onImport }) {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState(''); // Empty means no change
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name || !email) {
            setError('Name and Email are required.');
            return;
        }

        const updates = { name, email };
        if (password) updates.password = password;

        const result = onSave(updates);
        if (result.success) {
            setSuccess('Profile updated successfully!');
            setTimeout(onClose, 1000);
        } else {
            setError(result.error);
        }
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(habits, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `triphase_backup_${new Date().toISOString().slice(0, 10)}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        setSuccess('Data exported successfully!');
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                if (!Array.isArray(importedData)) {
                    throw new Error('Invalid data format');
                }
                onImport(importedData);
                setSuccess('Data imported successfully!');
            } catch (err) {
                setError('Failed to import data. Invalid file.');
            }
        };
        reader.readAsText(file);
        // Reset input
        e.target.value = null;
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
            <div className="modal-content" style={{
                background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)',
                width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Edit Profile</h2>
                    <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                {error && (
                    <div style={{
                        padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)',
                        color: 'var(--danger)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{
                        padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--success)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem'
                    }}>
                        <Check size={16} /> {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white', fontSize: '1rem', outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={16} style={{ color: 'var(--primary)' }} />
                            Data Management
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <button
                                type="button"
                                onClick={handleExport}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    padding: '0.75rem', background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                                className="hover:bg-white/10"
                            >
                                <Download size={16} />
                                Backup
                            </button>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    padding: '0.75rem', background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                                className="hover:bg-white/10"
                            >
                                <Upload size={16} />
                                Restore
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImport}
                                accept=".json"
                                style={{ display: 'none' }}
                            />
                        </div>
                        <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Download a backup of your habits or restore from a previous file.
                        </p>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white', fontSize: '1rem', outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>New Password (Optional)</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Leave blank to keep current"
                                style={{
                                    width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.5rem', borderRadius: 'var(--radius-sm)',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white', fontSize: '1rem', outline: 'none'
                                }}
                            />
                        </div>
                    </div>


                    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={16} style={{ color: 'var(--primary)' }} />
                            Data Management
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <button
                                type="button"
                                onClick={handleExport}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    padding: '0.75rem', background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                                className="hover:bg-white/10"
                            >
                                <Download size={16} />
                                Backup
                            </button>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    padding: '0.75rem', background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                                className="hover:bg-white/10"
                            >
                                <Upload size={16} />
                                Restore
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImport}
                                accept=".json"
                                style={{ display: 'none' }}
                            />
                        </div>
                        <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Download a backup of your habits or restore from a previous file.
                        </p>
                    </div>

                    <button type="submit" style={{
                        marginTop: '1rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                        background: 'var(--primary)', color: 'white', fontWeight: 600,
                        boxShadow: '0 0 15px var(--primary-glow)', transition: 'transform 0.2s'
                    }}>
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}
