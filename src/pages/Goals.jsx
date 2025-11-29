import React from 'react';

const Goals = () => {
  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Wellness Goals</h1>
          <p>Set and track your wellness objectives.</p>
        </div>
      </header>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-plus-circle"></i> Set New Goals</h3>
        <p className="section-subtitle">Create new goals to stay motivated.</p>
        <div className="set-goal-grid">
          <button className="goal-btn"><i className="fa-solid fa-bed"></i><span>Sleep Goal</span></button>
          <button className="goal-btn"><i className="fa-solid fa-person-running"></i><span>Exercise Goal</span></button>
          <button className="goal-btn"><i className="fa-solid fa-brain"></i><span>Mindfulness Goal</span></button>
          <button className="goal-btn"><i className="fa-solid fa-pencil"></i><span>Custom Goal</span></button>
        </div>
      </section>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-list-check"></i> Current Goals</h3>
        <p className="section-subtitle">Your progress on active goals.</p>
        <ul className="current-goals-list">
          <li>
            <i className="fa-solid fa-bed goal-icon"></i>
            <div className="goal-details">
              <h4>Sleep 8+ hours</h4>
              <progress value="4" max="7"></progress>
            </div>
            <span className="goal-progress">4/7 days</span>
          </li>
          <li>
            <i className="fa-solid fa-person-running goal-icon"></i>
            <div className="goal-details">
              <h4>Exercise 30+ min daily</h4>
              <progress value="5" max="7"></progress>
            </div>
            <span className="goal-progress">5/7 days</span>
          </li>
          <li>
            <i className="fa-solid fa-brain goal-icon"></i>
            <div className="goal-details">
              <h4>Mindfulness Session</h4>
              <progress value="3" max="7"></progress>
            </div>
            <span className="goal-progress">3/7 days</span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Goals;