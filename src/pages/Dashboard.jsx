import React, { useEffect, useRef, useState, useContext } from 'react';
import Chart from 'chart.js/auto';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  
  const moodChartRef = useRef(null);
  const sleepChartRef = useRef(null);
  const stressChartRef = useRef(null);

  // Simulate API Data Fetching
  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 1000); // 1 second artificial delay
  }, []);

  // Initialize Charts only after loading
  useEffect(() => {
    if (isLoading) return;

    const moodCtx = document.getElementById('moodDonutChart');
    if (moodChartRef.current) moodChartRef.current.destroy();
    if (moodCtx) {
      moodChartRef.current = new Chart(moodCtx, {
        type: 'doughnut',
        data: {
          labels: ['Great', 'Good', 'Okay', 'Stressed'],
          datasets: [{ data: [30, 40, 20, 10], backgroundColor: ['#34D399', '#4A90E2', '#FBBF24', '#F87171'], borderWidth: 0 }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'right' } } }
      });
    }

    const sleepCtx = document.getElementById('sleepLineChart');
    if (sleepChartRef.current) sleepChartRef.current.destroy();
    if (sleepCtx) {
      sleepChartRef.current = new Chart(sleepCtx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ label: 'Hours', data: [6.5, 6.8, 7.5, 6.2, 5.8, 7.8, 7.2], borderColor: '#4A90E2', tension: 0.4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false } } }
      });
    }

    const stressCtx = document.getElementById('stressBarChart');
    if (stressChartRef.current) stressChartRef.current.destroy();
    if (stressCtx) {
      stressChartRef.current = new Chart(stressCtx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ label: 'Stress', data: [4, 5, 2, 4, 6, 1, 2], backgroundColor: '#FBBF24', borderRadius: 4 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false } } }
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h2>Loading your wellness data...</h2>
        </div>
    );
  }

  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Welcome back, {user ? user.name : 'Student'}!</h1>
          <p>Here is your daily wellness overview.</p>
        </div>
      </header>

      <section className="summary-cards">
        <div className="card"><h4>Today's Mood</h4><div className="value" style={{ color: '#34D399' }}>Good</div></div>
        <div className="card"><h4>Sleep Quality</h4><div className="value">7.5h</div></div>
        <div className="card"><h4>Activity</h4><div className="value" style={{ color: '#FBBF24' }}>8,420</div></div>
        <div className="card"><h4>Stress</h4><div className="value" style={{ color: '#F87171' }}>Low</div></div>
      </section>

      <section className="dashboard-grid">
        <div className="card">
          <h3>Mood Distribution</h3>
          <div className="chart-container"><canvas id="moodDonutChart"></canvas></div>
        </div>
        <div className="card">
          <h3>Sleep Trends</h3>
          <div className="chart-container"><canvas id="sleepLineChart"></canvas></div>
        </div>
        <div className="card">
          <h3>Stress Levels</h3>
          <div className="chart-container"><canvas id="stressBarChart"></canvas></div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;