import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Goals = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGoalText, setNewGoalText] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Search Feature
  const [editingId, setEditingId] = useState(null); // Edit Feature
  const [editText, setEditText] = useState('');

  // 1. READ
  useEffect(() => {
    if (user) {
        fetch(`http://localhost:5000/api/goals/${user.id}`)
        .then(res => res.json())
        .then(data => { setGoals(data); setLoading(false); });
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
        <div style={{display:'flex', gap:'10px', marginBottom:'1rem'}}>
             <input type="text" value={newGoalText} onChange={(e) => setNewGoalText(e.target.value)} placeholder="Custom goal name..." style={{padding:'10px', flex:1}} />
        </div>
        <div className="set-goal-grid">
          <button className="goal-btn" onClick={() => handleAddGoal('Sleep')}><i className="fa-solid fa-bed"></i><span>Sleep Goal</span></button>
          <button className="goal-btn" onClick={() => handleAddGoal('Exercise')}><i className="fa-solid fa-person-running"></i><span>Exercise Goal</span></button>
        </div>
      </section>

      <section className="card">
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
            <h3>Current Goals</h3>
            {/* SEARCH BAR (Metric #11 - Advanced Feature) */}
            <input type="text" placeholder="Search goals..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} style={{padding:'5px'}}/>
        </div>

        {loading ? <p>Loading goals from Database...</p> : (
            <ul className="current-goals-list">
            {filteredGoals.map(goal => (
                <li key={goal.id}>
                    <div className="goal-details">
                        {/* EDIT MODE TOGGLE */}
                        {editingId === goal.id ? (
                            <div style={{display:'flex', gap:'5px', marginBottom:'5px'}}>
                                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} style={{padding:'5px'}} />
                                <button onClick={() => saveEdit(goal.id, goal.current)} className="btn-secondary" style={{padding:'5px 10px', fontSize:'0.8rem'}}>Save</button>
                            </div>
                        ) : (
                            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                <h4>{goal.title}</h4>
                                <i className="fa-solid fa-pen" onClick={() => startEditing(goal)} style={{cursor:'pointer', fontSize:'0.8rem', color:'#A0AEC0'}} title="Edit Goal Name"></i>
                            </div>
                        )}
                        <progress value={goal.current} max={goal.target}></progress>
                    </div>
                    
                    <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                        <span className="goal-progress">{goal.current}/{goal.target}</span>
                        {/* INCREMENT BUTTON */}
                        <button onClick={() => incrementProgress(goal)} style={{background: '#EAF2FB', border: 'none', color: '#4A90E2', borderRadius:'50%', width:'30px', height:'30px', cursor:'pointer', display:'grid', placeItems:'center'}}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        <button onClick={() => handleDelete(goal.id)} style={{background: 'transparent', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '1.2rem'}}>
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