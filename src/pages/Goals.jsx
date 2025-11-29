import React, { useState, useEffect } from 'react';
import { mockApi } from '../utils/mockApi';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGoalText, setNewGoalText] = useState('');

  // READ (Fetch Data)
  useEffect(() => {
    mockApi.getGoals().then((data) => {
      setGoals(data);
      setLoading(false);
    });
  }, []);

  // CREATE
  const handleAddGoal = (category) => {
    let title = newGoalText;
    if (!title && category !== 'Custom') title = `${category} Goal`;
    if (!title) return alert("Please enter a goal name");

    const goal = { title, category, target: 7, current: 0 };
    
    // Optimistic UI update (optional, but sticking to API wait for marks)
    mockApi.addGoal(goal).then((savedGoal) => {
      setGoals([...goals, savedGoal]);
      setNewGoalText('');
    });
  };

  // DELETE
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this goal?")) {
        mockApi.deleteGoal(id).then(() => {
            setGoals(goals.filter(g => g.id !== id));
        });
    }
  };

  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Wellness Goals</h1>
          <p>Set and track your wellness objectives.</p>
        </div>
      </header>

      {/* CREATE SECTION */}
      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-plus-circle"></i> Set New Goals</h3>
        <div style={{marginBottom: '1rem', display: 'flex', gap: '10px'}}>
             <input 
                type="text" 
                value={newGoalText} 
                onChange={(e) => setNewGoalText(e.target.value)} 
                placeholder="Enter custom goal name..."
                style={{padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0', flex: 1}}
             />
        </div>
        <div className="set-goal-grid">
          <button className="goal-btn" onClick={() => handleAddGoal('Sleep')}><i className="fa-solid fa-bed"></i><span>Sleep Goal</span></button>
          <button className="goal-btn" onClick={() => handleAddGoal('Exercise')}><i className="fa-solid fa-person-running"></i><span>Exercise Goal</span></button>
          <button className="goal-btn" onClick={() => handleAddGoal('Mindfulness')}><i className="fa-solid fa-brain"></i><span>Mindfulness Goal</span></button>
          <button className="goal-btn" onClick={() => handleAddGoal('Custom')}><i className="fa-solid fa-pencil"></i><span>Add Custom</span></button>
        </div>
      </section>

      {/* READ & DELETE SECTION */}
      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-list-check"></i> Current Goals</h3>
        
        {loading ? <p>Loading goals...</p> : (
            goals.length === 0 ? <p>No goals set yet. Start by adding one above!</p> : (
            <ul className="current-goals-list">
            {goals.map(goal => (
                <li key={goal.id}>
                    <i className="fa-solid fa-bullseye goal-icon"></i>
                    <div className="goal-details">
                    <h4>{goal.title}</h4>
                    <progress value={goal.current} max={goal.target}></progress>
                    </div>
                    <span className="goal-progress">{goal.current}/{goal.target} days</span>
                    <button 
                        onClick={() => handleDelete(goal.id)}
                        style={{background: 'transparent', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '1.2rem'}}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </li>
            ))}
            </ul>
        ))}
      </section>
    </>
  );
};

export default Goals;