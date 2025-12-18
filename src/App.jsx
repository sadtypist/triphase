import { useState } from 'react';
import { Plus, Layout, LogOut, Users } from 'lucide-react';
import { useHabits } from './hooks/useHabits';
import { HabitCard } from './components/HabitCard';
import { CreateHabitModal } from './components/CreateHabitModal';
import { HabitDetail } from './components/HabitDetail';
import { ProfileModal } from './components/ProfileModal';
import { CommunityPage } from './components/CommunityPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './components/AuthPage';


function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const { habits, addHabit, logHabit, deleteHabit, editHabit, importHabits } = useHabits(user?.id);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'community'

  const selectedHabit = habits.find(h => h.id === selectedHabitId);
  const [editingHabit, setEditingHabit] = useState(null);

  const handleAddGroup = (group) => {
    group.habits.forEach(h => {
      addHabit(h.name, h.category, h.description, h);
    });
    setCurrentView('dashboard');
    // Ideally we would show a toast here
  };

  const handleAddHabit = (habit) => {
    addHabit(habit.name, habit.category, habit.description, habit);
    // Ideally we would show a toast here
  };

  const handleDelete = (id) => {
    deleteHabit(id);
    if (selectedHabitId === id) {
      setSelectedHabitId(null);
    }
  };

  if (selectedHabit) {
    return <HabitDetail
      habit={selectedHabit}
      onClose={() => setSelectedHabitId(null)}
      onLog={(id, status, note) => {
        logHabit(id, status, note);
      }}
      onDelete={handleDelete}
      onEdit={(habit) => {
        setEditingHabit(habit);
        setIsCreateOpen(true);
      }}
    />;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', minHeight: '100vh' }}>
      {/* Enhanced Background Ambience */}
      <div className="bg-noise" />

      <div style={{
        position: 'fixed', inset: 0, zIndex: -2, overflow: 'hidden', pointerEvents: 'none'
      }}>
        <div className="animate-blob" style={{
          position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)', borderRadius: '50%'
        }} />
        <div className="animate-blob animation-delay-2000" style={{
          position: 'absolute', top: '20%', right: '-10%', width: '40vw', height: '40vw',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)', borderRadius: '50%'
        }} />
        <div className="animate-blob animation-delay-4000" style={{
          position: 'absolute', bottom: '-10%', left: '20%', width: '45vw', height: '45vw',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)', borderRadius: '50%'
        }} />
      </div>

      {/* Header */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
              boxShadow: '0 0 20px var(--primary-glow)'
            }}>
              <Layout size={24} />
            </div>
            <button onClick={() => setIsProfileOpen(true)} style={{ textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1, color: 'white' }}>TriPhase</h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Welcome back, {user?.name}</p>
            </button>
          </div>

          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '0.25rem', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setCurrentView('dashboard')}
              style={{
                padding: '0.5rem 1rem', borderRadius: 'calc(var(--radius-md) - 2px)', fontSize: '0.875rem', fontWeight: 500,
                background: currentView === 'dashboard' ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: currentView === 'dashboard' ? 'white' : 'var(--text-muted)',
                transition: 'all 0.2s'
              }}
            >
              My Habits
            </button>
            <button
              onClick={() => setCurrentView('community')}
              style={{
                padding: '0.5rem 1rem', borderRadius: 'calc(var(--radius-md) - 2px)', fontSize: '0.875rem', fontWeight: 500,
                background: currentView === 'community' ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: currentView === 'community' ? 'white' : 'var(--text-muted)',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
            >
              <Users size={14} />
              Community
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'transparent', padding: '0.75rem', borderRadius: 'var(--radius-md)',
              color: 'var(--text-muted)', transition: 'color 0.2s',
            }}
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)',
              color: 'white', fontWeight: 500, transition: 'background 0.2s',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <Plus size={20} />
            <span>New Habit</span>
          </button>
        </div>
      </header>

      {/* Grid */}
      {currentView === 'dashboard' ? (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem'
        }}>
          {habits.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <p>No habits tracked yet. Start your journey today.</p>
            </div>
          ) : (
            habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onLog={() => setSelectedHabitId(habit.id)}
                onDelete={handleDelete}
                onEdit={(habit) => {
                  setEditingHabit(habit);
                  setIsCreateOpen(true);
                }}
              />
            ))
          )}
        </div>
      ) : (
        <CommunityPage onAddGroup={handleAddGroup} onAddHabit={handleAddHabit} />
      )}

      {/* Modals */}
      {isCreateOpen && (
        <CreateHabitModal
          onClose={() => {
            setIsCreateOpen(false);
            setEditingHabit(null);
          }}
          onSave={(name, category, description, details) => {
            if (editingHabit) {
              editHabit(editingHabit.id, name, category, description, details);
            } else {
              addHabit(name, category, description, details);
            }
            setEditingHabit(null);
          }}
          initialData={editingHabit}
        />
      )}

      {isProfileOpen && (
        <ProfileModal
          user={user}
          onClose={() => setIsProfileOpen(false)}
          onSave={updateProfile}
          habits={habits}
          onImport={importHabits}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <AuthPage />;
}

export default App;
