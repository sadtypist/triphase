import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for active session
        const storedUser = localStorage.getItem('TRIPHASE_USER');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Mock validation against "database" (localStorage)
        const users = JSON.parse(localStorage.getItem('TRIPHASE_USERS_DB') || '[]');
        const found = users.find(u => u.email === email && u.password === password);

        if (found) {
            // Create session
            const sessionUser = { id: found.id, name: found.name, email: found.email };
            localStorage.setItem('TRIPHASE_USER', JSON.stringify(sessionUser));
            setUser(sessionUser);
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
    };

    const signup = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('TRIPHASE_USERS_DB') || '[]');

        if (users.find(u => u.email === email)) {
            return { success: false, error: 'User already exists' };
        }

        const newUser = {
            id: crypto.randomUUID(),
            name,
            email,
            password // In a real app, NEVER store plain text passwords
        };

        users.push(newUser);
        localStorage.setItem('TRIPHASE_USERS_DB', JSON.stringify(users));

        // Auto login
        const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
        localStorage.setItem('TRIPHASE_USER', JSON.stringify(sessionUser));
        setUser(sessionUser);

        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('TRIPHASE_USER');
        setUser(null);
    };

    const updateProfile = (updates) => {
        const users = JSON.parse(localStorage.getItem('TRIPHASE_USERS_DB') || '[]');
        const currentUserIndex = users.findIndex(u => u.id === user.id);

        if (currentUserIndex === -1) return { success: false, error: 'User not found' };

        // Check email uniqueness if changing email
        if (updates.email && updates.email !== user.email && users.find(u => u.email === updates.email)) {
            return { success: false, error: 'Email already in use' };
        }

        const updatedUser = { ...users[currentUserIndex], ...updates };
        users[currentUserIndex] = updatedUser;
        localStorage.setItem('TRIPHASE_USERS_DB', JSON.stringify(users));

        // Update session
        const sessionUser = { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email };
        localStorage.setItem('TRIPHASE_USER', JSON.stringify(sessionUser));
        setUser(sessionUser);

        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
