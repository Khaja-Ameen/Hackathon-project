import React from 'react';

const SleepLog = () => {
  return (
    <>
      <header className="main-header">
        <div className="header-title">
          <h1>Sleep Log</h1>
          <p>Track your sleep patterns for better rest.</p>
        </div>
      </header>
      
      <div className="sleep-log-grid">
        <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-file-pen"></i> Log Last Night's Sleep</h3>
          <form className="sleep-form">
            <div className="sleep-input-group">
              <label htmlFor="bedtime">Bedtime</label>
              <input type="time" id="bedtime" defaultValue="23:00" />
            </div>
            <div className="sleep-input-group">
              <label htmlFor="waketime">Wake time</label>
              <input type="time" id="waketime" defaultValue="07:00" />
            </div>
            <div className="sleep-input-group">
              <label>Sleep Quality</label>
              <div className="quality-rating">
                <button type="button">Poor</button>
                <button type="button">Okay</button>
                <button type="button" className="selected">Good</button>
                <button type="button">Excellent</button>
              </div>
            </div>
            <button type="submit" className="btn-primary full-width">Log Sleep</button>
          </form>
        </section>

        <section className="card">
          <h3 className="section-title"><i className="fa-solid fa-lightbulb"></i> Sleep Tips</h3>
          <ul className="tips-list">
            <li><i className="fa-solid fa-check"></i> Keep a consistent sleep schedule, even on weekends.</li>
            <li><i className="fa-solid fa-check"></i> Create a relaxing bedtime routine.</li>
            <li><i className="fa-solid fa-check"></i> Avoid screens (phone, laptop) an hour before bed.</li>
            <li><i className="fa-solid fa-check"></i> Make sure your bedroom is dark, quiet, and cool.</li>
            <li><i className="fa-solid fa-check"></i> Limit caffeine and large meals before bedtime.</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default SleepLog;