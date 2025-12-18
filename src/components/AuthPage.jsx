import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Layout, ArrowRight } from 'lucide-react';

export function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login, signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            const res = login(formData.email, formData.password);
            if (!res.success) setError(res.error);
        } else {
            if (!formData.name) {
                setError('Name is required');
                return;
            }
            const res = signup(formData.name, formData.email, formData.password);
            if (!res.success) setError(res.error);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'grid', placeItems: 'center',
            position: 'relative', padding: '2rem'
        }}>
            {/* Background Ambience */}
            <div className="bg-noise" />
            <div style={{
                position: 'fixed', inset: 0, zIndex: -2, overflow: 'hidden', pointerEvents: 'none'
            }}>
                <div className="animate-blob" style={{
                    position: 'absolute', top: '50%', left: '50%', width: '60vw', height: '60vw',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                    filter: 'blur(90px)', borderRadius: '50%'
                }} />
            </div>

            <div style={{
                width: '100%', maxWidth: '400px', background: 'var(--bg-card)',
                padding: '2.5rem', borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '48px', height: '48px', borderRadius: '14px', background: 'var(--primary)',
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                        boxShadow: '0 0 20px var(--primary-glow)', marginBottom: '1rem'
                    }}>
                        <Layout size={28} />
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>TriPhase</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Master your habits, 3 phases at a time.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {!isLogin && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                style={{
                                    width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white', fontSize: '1rem', outline: 'none'
                                }}
                            />
                        </div>
                    )}

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                            style={{
                                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white', fontSize: '1rem', outline: 'none'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                            style={{
                                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                color: 'white', fontSize: '1rem', outline: 'none'
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{ color: 'var(--danger)', fontSize: '0.875rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" style={{
                        marginTop: '0.5rem', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                        background: 'var(--primary)', color: 'white', fontWeight: 600,
                        boxShadow: '0 0 15px var(--primary-glow)', width: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                    }}>
                        <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                        {isLogin ? 'Sign up' : 'Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
}
