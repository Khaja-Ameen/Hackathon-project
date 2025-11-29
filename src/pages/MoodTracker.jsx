import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MoodTracker = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById('moodHistoryChart');
    if (chartRef.current) chartRef.current.destroy();

    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Mood Score',
            data: [3, 4, 3, 2, 4, 5, 4],
            borderColor: '#50E3C2',
            backgroundColor: 'rgba(80, 227, 194, 0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 5,
              ticks: { stepSize: 1, callback: (v) => ['','Stressed','Okay','Good','Great','Amazing'][v] }
            }
          }
        }
      });
    }

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Mood Tracker</h1>
          <p>Log and reflect on your daily emotions.</p>
        </div>
      </header>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-clipboard-check"></i> Daily Mood Check-in</h3>
        <p className="section-subtitle">How are you feeling today?</p>
        <div className="mood-options">
          <button className="mood-btn">
            <span className="mood-icon">😊</span>
            <span>Great</span>
          </button>
          <button className="mood-btn">
            <span className="mood-icon">🙂</span>
            <span>Good</span>
          </button>
          <button className="mood-btn">
            <span className="mood-icon">😐</span>
            <span>Okay</span>
          </button>
          <button className="mood-btn">
            <span className="mood-icon">😟</span>
            <span>Stressed</span>
          </button>
        </div>
      </section>

      <section className="card">
        <h3 className="section-title"><i className="fa-solid fa-chart-line"></i> Mood History</h3>
        <p className="section-subtitle">Your mood patterns over the last 7 days</p>
        <div className="chart-container">
          <canvas id="moodHistoryChart"></canvas>
        </div>
      </section>
    </>
  );
};

export default MoodTracker;