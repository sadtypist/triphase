import { useState } from 'react';
import { Plus, Users, ArrowRight } from 'lucide-react';
import { COMMUNITY_GROUPS } from '../data/communityData';
import { CommunityGroupDetail } from './CommunityGroupDetail';

export function CommunityPage({ onAddGroup, onAddHabit }) {
    const [selectedGroup, setSelectedGroup] = useState(null);

    if (selectedGroup) {
        return (
            <CommunityGroupDetail
                group={selectedGroup}
                onBack={() => setSelectedGroup(null)}
                onImport={(group) => {
                    onAddGroup(group);
                    setSelectedGroup(null);
                }}
                onAddHabit={onAddHabit}
            />
        );
    }

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Community Groups</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
                    Discover curated habits from the community. Import entire routines to kickstart your journey.
                </p>
            </div>

            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem'
            }}>
                {COMMUNITY_GROUPS.map(group => (
                    <div
                        key={group.id}
                        onClick={() => setSelectedGroup(group)}
                        style={{
                            background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                            border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            display: 'flex', flexDirection: 'column', cursor: 'pointer'
                        }}
                        className="hover:translate-y-[-4px] hover:shadow-xl"
                    >
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{group.name}</h3>
                                <div style={{
                                    background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)',
                                    padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600
                                }}>
                                    {group.habits.length} Habits
                                </div>
                            </div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                                {group.description}
                            </p>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {group.habits.map((habit, idx) => (
                                <div key={idx} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    fontSize: '0.875rem', color: 'var(--text-secondary)'
                                }}>
                                    <div style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        background: 'var(--primary)', opacity: 0.6
                                    }} />
                                    <span>{habit.name}</span>
                                    <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.7 }}>
                                        {habit.category}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div style={{ padding: '1.5rem', paddingTop: 0 }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddGroup(group);
                                }}
                                style={{
                                    width: '100%', padding: '0.875rem', borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255,255,255,0.05)', color: 'white', fontWeight: 600,
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    transition: 'all 0.2s', cursor: 'pointer'
                                }}
                                className="group-btn"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'var(--primary)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                }}
                            >
                                <Plus size={18} />
                                Add to My Dashboard
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
