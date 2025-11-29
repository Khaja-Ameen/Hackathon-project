import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Goals = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGoalText, setNewGoalText] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [editingId, setEditingId] = useState(null); 
  const [editText, setEditText] = useState('');

  // 1. READ
  useEffect(() => {
    if (user) {
        fetch(`http://localhost:5000/api/goals/${user.id}`)
        .then(res => res.json())
        .then(data => { setGoals(data); setLoading(false); })
        .catch(err => console.error("Failed to load goals", err));
    }
  }, [user]);

  // 2. CREATE
  const handleAddGoal = async (category) => {
    let title = newGoalText || `${category} Goal`;
    if (!title) return;
    const newGoal = { title, category, target: 7, current: 0, userId: user.id };
    
    const res = await fetch('http://localhost:5000/api/goals', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newGoal)
    });
    const saved = await res.json();
    setGoals([...goals, saved]);
    setNewGoalText('');
  };

  // 3. UPDATE (Edit Title)
  const saveEdit = async (id, current) => {
    await fetch(`http://localhost:5000/api/goals/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: editText, current })
    });
    setGoals(goals.map(g => (g.id === id ? { ...g, title: editText } : g)));
    setEditingId(null);
  };

  // 3b. UPDATE (Increment Progress)
  const incrementProgress = async (goal) => {
      if(goal.current >= goal.target) return;
      const newProgress = goal.current + 1;
      await fetch(`http://localhost:5000/api/goals/${goal.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: goal.title, current: newProgress })
      });
      setGoals(goals.map(g => (g.id === goal.id ? { ...g, current: newProgress } : g)));
  };

  // 4. DELETE
  const handleDelete = async (id) => {
    if(window.confirm("Delete goal?")) {
        await fetch(`http://localhost:5000/api/goals/${id}`, { method: 'DELETE' });
        setGoals(goals.filter(g => g.id !== id));
    }
  };

  // Advanced Feature: Filter Logic
  const filteredGoals = goals.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="main-header">
        <div className="header-title"><h1>Wellness Goals</h1><p>Set and track objectives.</p></div>
      </header>

      <section className="card">
        <h3 className="section-title">Set New Goals</h3>
        <div className="input-group" style={{display:'flex', gap:'10px', marginBottom:'1rem'}}>
             <input type="text" value={newGoalText} onChange={(e) => setNewGoalText(e.target.value)} placeholder="Custom goal name..." style={{padding:'10px', flex:1}} />
        </div>
        <div className="set-goal-grid">
          <button className="goal-btn" onClick={() => handleAddGoal('Sleep')}><i className="fa-solid fa-bed"></i><span>Sleep Goal</span></button>
          <button className="goal-btn" onClick={() => handleAddGoal('Exercise')}><i className="fa-solid fa-person-running"></i><span>Exercise Goal</span></button>
        </div>
      </section>

      <section className="card">
        <div className="main-header" style={{marginBottom:'1rem'}}>
            <h3 className="section-title" style={{marginBottom:0}}>Current Goals</h3>
            
            {/* SEARCH BAR (Metric #11 - Advanced Feature) */}
            <input 
                type="text" 
                placeholder="Search goals..." 
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                className="search-input"
            />
        </div>

        {loading ? <p>Loading goals from Database...</p> : (
            <ul className="current-goals-list">
            {filteredGoals.map(goal => (
                <li key={goal.id}>
                    
                    <div className="goal-details">
                        {/* EDIT MODE TOGGLE */}
                        {editingId === goal.id ? (
                            <div className="edit-input-group">
                                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                                <button onClick={() => saveEdit(goal.id, goal.current)} className="btn-secondary">Save</button>
                            </div>
                        ) : (
                            <div className="goal-name-wrapper">
                                <h4>{goal.title}</h4>
                                <i className="fa-solid fa-pen edit-icon" onClick={() => setEditingId(goal.id)} title="Edit Goal Name"></i>
                            </div>
                        )}
                        <progress value={goal.current} max={goal.target}></progress>
                    </div>
                    
                    <div className="goal-controls">
                        <span className="goal-progress">{goal.current}/{goal.target}</span>
                        {/* INCREMENT BUTTON */}
                        <button onClick={() => incrementProgress(goal)} className="progress-btn">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <button onClick={() => handleDelete(goal.id)} className="btn-danger" style={{background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem'}}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </li>
            ))}
            </ul>
        )}
      </section>
    </>
  );
};
export default Goals;