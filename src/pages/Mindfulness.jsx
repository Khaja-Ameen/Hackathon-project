import React, { useState } from 'react';

const Mindfulness = () => {
  const [activeDuration, setActiveDuration] = useState('10 min');

  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Mindfulness & Meditation</h1>
          <p>Find peace and clarity through mindful practices.</p>
        </div>
      </header>

      <section className="card timer-card">
        <h3 className="section-title text-center">Meditation Timer</h3>
        <p className="section-subtitle text-center">Set your intention and begin your practice</p>
        <div className="timer-display">
          <span id="timer-time">{activeDuration.replace(' min', ':00')}</span>
          <i className="fa-solid fa-leaf timer-leaf"></i>
        </div>
        <div className="timer-durations">
          {['5 min', '10 min', '15 min', '20 min', '30 min'].map((duration) => (
            <button 
              key={duration}
              className={`duration-btn ${activeDuration === duration ? 'active' : ''}`}
              onClick={() => setActiveDuration(duration)}
            >
              {duration}
            </button>
          ))}
        </div>
        <div className="timer-controls">
          <button className="btn-primary" id="start-timer-btn"><i className="fa-solid fa-play"></i> Start</button>
          <button className="btn-secondary-icon" id="reset-timer-btn"><i className="fa-solid fa-rotate-right"></i> Reset</button>
        </div>
      </section>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-wind"></i> Breathing Exercises</h3>
        <p className="section-subtitle">Guided breathing techniques for instant calm</p>
        <div className="breathing-grid">
          <div className="breathing-card">
            <div>
              <h4>4-7-8 Breathing</h4>
              <p>Calm your nervous system with this powerful technique.</p>
            </div>
            <div className="breathing-meta">
              <span><i className="fa-solid fa-clock"></i> 5 min</span>
              <button className="btn-secondary-outline">Start Exercise</button>
            </div>
          </div>
          <div className="breathing-card">
            <div>
              <h4>Box Breathing</h4>
              <p>Square breathing for focus and relaxation.</p>
            </div>
            <div className="breathing-meta">
              <span><i className="fa-solid fa-clock"></i> 8 min</span>
              <button className="btn-secondary-outline">Start Exercise</button>
            </div>
          </div>
          <div className="breathing-card">
            <div>
              <h4>Natural Breath</h4>
              <p>Simple awareness of your natural breath.</p>
            </div>
            <div className="breathing-meta">
              <span><i className="fa-solid fa-clock"></i> 10 min</span>
              <button className="btn-secondary-outline">Start Exercise</button>
            </div>
          </div>
        </div>
      </section>

      <div className="mindfulness-columns">
        <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-stopwatch"></i> Quick Meditation</h3>
          <p className="section-subtitle">5-minute sessions for busy students</p>
          <ul className="quick-med-list">
            <li><button><i className="fa-solid fa-play"></i> Study Break Meditation</button></li>
            <li><button><i className="fa-solid fa-play"></i> Pre-Exam Calm</button></li>
            <li><button><i className="fa-solid fa-play"></i> Morning Motivation</button></li>
            <li><button><i className="fa-solid fa-play"></i> Evening Wind Down</button></li>
          </ul>
        </section>
        <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-seedling"></i> Mindful Activities</h3>
          <p className="section-subtitle">Integrate mindfulness into daily life</p>
          <div className="mindful-activities-grid">
            <button className="mindful-activity-btn"><span>🚶</span> Mindful Walking</button>
            <button className="mindful-activity-btn"><span>🍎</span> Mindful Eating</button>
            <button className="mindful-activity-btn"><span>📖</span> Mindful Reading</button>
            <button className="mindful-activity-btn"><span>🎧</span> Mindful Listening</button>
          </div>
        </section>
      </div>
      
      <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-images"></i> Peaceful Scenes</h3>
        <p className="section-subtitle">Visual meditation aids to calm your mind</p>
        <div className="peaceful-scenes-grid">
          <img src="https://images.pexels.com/photos/417054/pexels-photo-417054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Wooden boardwalk path leading into a forest" />
          <img src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Calm lake reflecting mountains and a clear blue sky" />
          <img src="https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Dramatic clouds rolling over a dark mountain peak" />
          <img src="https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Lush green garden with a small stream and stone lantern" />
          <img src="https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Blue ocean waves crashing against a rocky shore" />
        </div>
      </section>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-volume-high"></i> Ambient Sounds</h3>
        <p className="section-subtitle">Natural soundscapes for meditation and focus</p>
        <div className="ambient-sounds-grid">
          <button className="ambient-sound-btn"><span>🌊</span> Ocean Waves</button>
          <button className="ambient-sound-btn"><span>🌧️</span> Rain Sounds</button>
          <button className="ambient-sound-btn"><span>🌲</span> Forest Birds</button>
          <button className="ambient-sound-btn"><span>🔥</span> Crackling Fire</button>
        </div>
      </section>
    </>
  );
};

export default Mindfulness;