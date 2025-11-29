import React, { useEffect, useRef, useState, useContext } from 'react';
import Chart from 'chart.js/auto';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({}); // New state for dynamic stats
  
  const moodChartRef = useRef(null);
  const sleepChartRef = useRef(null);
  const stressChartRef = useRef(null);

  // 1. Fetch Dynamic Data
  useEffect(() => {
    if (!user) { setIsLoading(false); return; }
    
    // Fetch aggregated summary stats from the new API endpoint
    fetch(`http://localhost:5000/api/stats/summary/${user.id}`)
        .then(res => res.json())
        .then(data => {
            setStats(data); // Stores totalGoalsMet, weeklyCalories, lastActivityType
            setIsLoading(false);
        })
        .catch(err => {
            console.error("Failed to fetch dashboard stats:", err);
            setIsLoading(false);
            setStats({ totalGoalsMet: 0, weeklyCalories: 0, lastActivityType: 'N/A' });
        });
  }, [user]);

  // 2. Initialize Charts (Logic remains the same, but uses dynamic loading state)
  useEffect(() => {
    if (isLoading) return;

    // --- MOOD DONUT CHART (Hardcoded data for visualization) ---
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
    
    // --- SLEEP LINE CHART (Hardcoded data for visualization) ---
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

    // --- STRESS BAR CHART (Hardcoded data for visualization) ---
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
    
    return () => {
        // Cleanup charts on unmount
        if (moodChartRef.current) moodChartRef.current.destroy();
        if (sleepChartRef.current) sleepChartRef.current.destroy();
        if (stressChartRef.current) stressChartRef.current.destroy();
    };
  }, [isLoading]);

  if (isLoading) {
    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h2><i className="fa-solid fa-spinner fa-spin"></i> Loading Dashboard Data...</h2>
        </div>
    );
  }

  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Welcome back, {user ? user.name : 'Student'}!</h1>
          <p>Here is your daily wellness overview, based on your activity.</p>
        </div>
      </header>

      {/* DYNAMIC SUMMARY CARDS (Metric #11 - Advanced Feature) */}
      <section className="summary-cards">
        <div className="card">
          <h4>Goals Met</h4>
          <div className="value" style={{ color: '#34D399' }}>{stats.totalGoalsMet}</div>
          <span className="detail">Total met lifetime</span>
        </div>
        <div className="card">
          <h4>Weekly Activity</h4>
          <div className="value">{stats.weeklyCalories}</div>
          <span className="detail">Calories burned (7 days)</span>
        </div>
        <div className="card">
          <h4>Latest Session</h4>
          <div className="value" style={{ color: '#FBBF24' }}>{stats.lastActivityType}</div>
          <span className="detail">Last logged activity</span>
        </div>
        <div className="card">
          <h4>Stress Level</h4>
          <div className="value" style={{ color: '#F87171' }}>Low</div>
          <span className="detail">Self-reported (Static)</span>
        </div>
      </section>

      {/* STATIC CHART SECTION (Visuals) */}
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