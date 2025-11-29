import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const moodChartRef = useRef(null);
  const sleepChartRef = useRef(null);
  const stressChartRef = useRef(null);

  useEffect(() => {
    const moodCtx = document.getElementById('moodDonutChart');
    if (moodChartRef.current) moodChartRef.current.destroy();
    
    if (moodCtx) {
      moodChartRef.current = new Chart(moodCtx, {
        type: 'doughnut',
        data: {
          labels: ['Great', 'Good', 'Okay', 'Stressed'],
          datasets: [{
            data: [30, 40, 20, 10],
            backgroundColor: ['#34D399', '#4A90E2', '#FBBF24', '#F87171'],
            borderColor: '#FFFFFF',
            borderWidth: 4,
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '75%',
          plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle', padding: 20 } } }
        }
      });
    }

    const sleepCtx = document.getElementById('sleepLineChart');
    if (sleepChartRef.current) sleepChartRef.current.destroy();

    if (sleepCtx) {
      sleepChartRef.current = new Chart(sleepCtx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Hours',
            data: [6.5, 6.8, 7.5, 6.2, 5.8, 7.8, 7.2],
            borderColor: '#4A90E2',
            backgroundColor: 'rgba(74, 144, 226, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#4A90E2',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, grid: { color: '#E2E8F0' } }, x: { grid: { display: false } } }
        }
      });
    }

    const stressCtx = document.getElementById('stressBarChart');
    if (stressChartRef.current) stressChartRef.current.destroy();

    if (stressCtx) {
      stressChartRef.current = new Chart(stressCtx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Stress Level',
            data: [4, 5, 2, 4, 6, 1, 2],
            backgroundColor: '#FBBF24',
            borderRadius: 5,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, max: 10, grid: { color: '#E2E8F0' } }, x: { grid: { display: false } } }
        }
      });
    }

    return () => {
      if (moodChartRef.current) moodChartRef.current.destroy();
      if (sleepChartRef.current) sleepChartRef.current.destroy();
      if (stressChartRef.current) stressChartRef.current.destroy();
    };
  }, []);

  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Wellness Dashboard</h1>
          <p>Track your mental and physical well-being</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><i className="fa-solid fa-calendar-week"></i> Weekly View</button>
          <button className="btn-secondary"><i className="fa-solid fa-bell"></i> Reminders</button>
        </div>
      </header>

      <section className="summary-cards">
        <div className="card">
          <h4>Today's Mood</h4>
          <div className="value" style={{ color: '#34D399' }}>Good</div>
          <span className="detail positive">+2 from yesterday</span>
        </div>
        <div className="card">
          <h4>Sleep Quality</h4>
          <div className="value">7.5h</div>
          <span className="detail positive">+0.5h from goal</span>
        </div>
        <div className="card">
          <h4>Activity Level</h4>
          <div className="value" style={{ color: '#FBBF24' }}>8,420</div>
          <span className="detail">steps today</span>
        </div>
        <div className="card">
          <h4>Stress Level</h4>
          <div className="value" style={{ color: '#F87171' }}>Low</div>
          <span className="detail negative">-1 from yesterday</span>
        </div>
      </section>

      <nav className="data-tabs">
        <a href="#" className="active">Overview</a>
        <a href="#">Mood Tracking</a>
        <a href="#">Sleep</a>
        <a href="#">Activity</a>
        <a href="#">Goals</a>
      </nav>

      <section className="dashboard-grid">
        <div className="card">
          <h3>Mood Distribution</h3>
          <p className="card-subtitle">How you've been feeling this week</p>
          <div className="chart-container">
            <canvas id="moodDonutChart"></canvas>
          </div>
        </div>
        <div className="card">
          <h3>Sleep Trends</h3>
          <p className="card-subtitle">Your sleep patterns this week</p>
          <div className="chart-container">
            <canvas id="sleepLineChart"></canvas>
          </div>
        </div>
        <div className="card">
          <h3>Wellness Goals</h3>
          <p className="card-subtitle">Your progress this week</p>
          <ul className="goals-list">
            <li><span>Sleep 8+ hours</span><progress value="4" max="7"></progress><span>4/7</span></li>
            <li><span>Exercise 30+ min</span><progress value="5" max="7"></progress><span>5/7</span></li>
            <li><span>Meditation</span><progress value="3" max="7"></progress><span>3/7</span></li>
            <li><span>Hydration</span><progress value="6" max="7"></progress><span>6/7</span></li>
          </ul>
        </div>
        <div className="card">
          <h3>Stress Levels</h3>
          <p className="card-subtitle">Daily tracking (1-10 scale)</p>
          <div className="chart-container">
            <canvas id="stressBarChart"></canvas>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;