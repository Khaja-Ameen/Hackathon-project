import React from 'react';

const Resources = () => {
  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Wellness Resources</h1>
          <p>Tools and content to support your mental and physical well-being.</p>
        </div>
      </header>

      <section className="card challenge-banner">
        <img src="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Person meditating by a calm lake" />
        <div className="challenge-content">
          <h3>Daily Mindfulness Challenge</h3>
          <p>Join thousands of students in a 30-day mindfulness journey. Just 10 minutes a day can transform your mental well-being.</p>
          <div className="tags">
            <span>Free</span>
            <span>30 Days</span>
            <span>Beginner Friendly</span>
          </div>
        </div>
        <button className="btn-primary challenge-btn"><i className="fa-solid fa-play"></i> Start Challenge</button>
      </section>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-headphones"></i> Guided Meditations</h3>
        <p className="section-subtitle">Curated meditation sessions designed for student life</p>
        <div className="meditation-grid">
          <div className="meditation-item"><div><h4>5-Minute Morning Meditation</h4><p>5 min <span className="tag">Beginner</span></p></div><div className="rating"><i className="fa-solid fa-star"></i> 4.8</div><button className="btn-secondary-icon"><i className="fa-solid fa-play"></i> Start Session</button></div>
          <div className="meditation-item"><div><h4>Stress Relief Session</h4><p>10 min <span className="tag">Intermediate</span></p></div><div className="rating"><i className="fa-solid fa-star"></i> 4.9</div><button className="btn-secondary-icon"><i className="fa-solid fa-play"></i> Start Session</button></div>
          <div className="meditation-item"><div><h4>Sleep Preparation</h4><p>15 min <span className="tag">Beginner</span></p></div><div className="rating"><i className="fa-solid fa-star"></i> 4.7</div><button className="btn-secondary-icon"><i className="fa-solid fa-play"></i> Start Session</button></div>
          <div className="meditation-item"><div><h4>Focus & Concentration</h4><p>8 min <span className="tag">Advanced</span></p></div><div className="rating"><i className="fa-solid fa-star"></i> 4.6</div><button className="btn-secondary-icon"><i className="fa-solid fa-play"></i> Start Session</button></div>
        </div>
      </section>

      <div className="resource-columns">
        <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-book-open-reader"></i> Wellness Articles</h3>
          <p className="section-subtitle">Evidence-based articles on student wellness</p>
          <ul className="content-list">
            <li><div><h4>Managing Study Stress: A Student's Guide</h4><span className="tag">Stress Management</span></div><span><i className="fa-solid fa-clock"></i> 5 min</span></li>
            <li><div><h4>Building Healthy Sleep Habits</h4><span className="tag">Sleep Health</span></div><span><i className="fa-solid fa-clock"></i> 7 min</span></li>
            <li><div><h4>Nutrition for Better Mental Health</h4><span className="tag">Nutrition</span></div><span><i className="fa-solid fa-clock"></i> 6 min</span></li>
          </ul>
          <button className="btn-secondary-outline full-width">View All Articles</button>
        </section>
        <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-podcast"></i> Wellness Podcasts</h3>
          <p className="section-subtitle">Listen to expert advice on student wellness</p>
          <ul className="content-list">
            <li><div><h4>Student Mental Health Matters</h4><p>Episode 12</p></div><span><i className="fa-solid fa-clock"></i> 32 min</span></li>
            <li><div><h4>Mindful Study Techniques</h4><p>Episode 8</p></div><span><i className="fa-solid fa-clock"></i> 28 min</span></li>
            <li><div><h4>Dealing with Academic Pressure</h4><p>Episode 15</p></div><span><i className="fa-solid fa-clock"></i> 41 min</span></li>
          </ul>
          <button className="btn-secondary-outline full-width">Browse Podcasts</button>
        </section>
      </div>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-video"></i> Wellness Videos</h3>
        <p className="section-subtitle">Visual guides for relaxation and exercise</p>
        <div className="video-grid">
          <div className="video-card">
            <div className="video-thumbnail"><img src="https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Workout" /><div className="play-icon"><i className="fa-solid fa-play"></i></div></div>
            <h4>Quick Dorm Room Workout</h4>
            <p>15 min • No equipment needed</p>
          </div>
          <div className="video-card">
            <div className="video-thumbnail"><img src="https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Breathing exercise" /><div className="play-icon"><i className="fa-solid fa-play"></i></div></div>
            <h4>4-7-8 Breathing Technique</h4>
            <p>5 min • Stress relief</p>
          </div>
          <div className="video-card">
            <div className="video-thumbnail">
              <img src="https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Woman doing yoga indoors in a bright room" />
              <div className="play-icon"><i className="fa-solid fa-play"></i></div>
            </div>
            <h4>Morning Yoga Flow</h4>
            <p>20 min • Beginner friendly</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Resources;