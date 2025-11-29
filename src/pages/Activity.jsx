import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

// Static list of popular activities
const ACTIVITY_TYPES = [
    { name: 'Running', icon: 'fa-person-running', color: '#4A90E2' },
    { name: 'Walking', icon: 'fa-person-walking', color: '#50E3C2' },
    { name: 'Strength', icon: 'fa-dumbbell', color: '#F87171' },
    { name: 'Yoga', icon: 'fa-spa', color: '#34D399' },
    { name: 'Cycling', icon: 'fa-bicycle', color: '#FBBF24' },
    { name: 'Stretching', icon: 'fa-shoe-prints', color: '#A0AEC0' },
];

const Activity = () => {
    const { user } = useContext(AuthContext); 
    const [log, setLog] = useState({ duration: '', type: '' });
    // FIX: Initialize history as an empty array, so the history list starts empty.
    const [history, setHistory] = useState([]); 

    const handleLogChange = (e) => {
        setLog({ ...log, duration: e.target.value });
    };
    
    const handleAddLog = (e) => {
        e.preventDefault();
        
        // Basic Validation
        if (!log.duration || !log.type) return alert("Please select an activity type and enter duration.");
        if (parseInt(log.duration) <= 0) return alert("Duration must be greater than zero.");
        
        const duration = parseInt(log.duration);
        
        const newEntry = {
            id: Date.now(),
            type: log.type,
            duration: duration,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            calories: duration * 5, // Simple calculation
        };

        // Update history locally (adds new entry to the front of the array)
        setHistory([newEntry, ...history]);
        setLog({ duration: '', type: '' }); // Clear form
    };
    
    // Helper to format date for display
    const formatDate = (dateString) => {
        // Since history items now use Date.now() for ID, the date is a string representation.
        return dateString;
    };

    return (
        <>
            <header className="main-header">
                <div className="header-title">
                    <h1>Activity Tracker</h1>
                    <p>Monitor your daily movement and exercise.</p>
                </div>
            </header>
            
            <div className="dashboard-grid">
                
                {/* 1. Log Activity Card */}
                <section className="card" style={{gridColumn: '1 / 2'}}>
                    <h3 className="section-title"><i className="fa-solid fa-clock"></i> Log New Session</h3>
                    <form onSubmit={handleAddLog}>
                        <div style={{marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                            <input 
                                type="number" 
                                placeholder="Duration (minutes)"
                                value={log.duration}
                                onChange={handleLogChange}
                                required
                                min="1"
                                style={{padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)'}}
                            />
                            <button type="submit" className="btn-primary" style={{width: '100%'}}>Log Activity</button>
                        </div>

                        <p className="section-subtitle">Select Activity Type:</p>
                        <div className="set-goal-grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))'}}>
                            {ACTIVITY_TYPES.map((type) => (
                                <button
                                    key={type.name}
                                    type="button"
                                    onClick={() => setLog({...log, type: type.name})}
                                    style={{
                                        border: `2px solid ${log.type === type.name ? type.color : 'var(--border-color)'}`,
                                        backgroundColor: log.type === type.name ? type.color + '20' : 'transparent',
                                        padding: '10px 5px',
                                        borderRadius: '10px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <i className={`fa-solid ${type.icon}`} style={{color: type.color}}></i>
                                    <span style={{display: 'block', fontSize: '0.8rem', marginTop: '5px'}}>{type.name}</span>
                                </button>
                            ))}
                        </div>
                    </form>
                </section>

                {/* 2. Activity History (Read) */}
                <section className="card" style={{gridColumn: '2 / 3'}}>
                    <h3 className="section-title"><i className="fa-solid fa-list-ul"></i> Recent History</h3>
                    <ul className="content-list">
                        {history.length === 0 ? <p>No activity logged yet.</p> : history.map(item => (
                            <li key={item.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0'}}>
                                <div>
                                    <h4 style={{marginBottom: '3px'}}>{item.type}</h4>
                                    <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
                                        {item.date} • {item.duration} min
                                    </p>
                                </div>
                                <span style={{fontWeight: '600', color: '#4A90E2'}}>
                                    {item.calories} Cal
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
};

export default Activity;