import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// --- SUITABLE STATIC DATA (Functional for Clicks/Playback) ---

// Guided Meditations: Using free, suitable placeholder audio files
const MEDITATION_TRACKS = [
    { id: 101, title: '5-Minute Morning Focus', duration: 5, category: 'Beginner', rating: 4.8, audioUrl: 'https://cdn.pixabay.com/download/audio/2023/11/27/audio_4a0e413009.mp3?filename=sleep-meditation-200922.mp3' },
    { id: 102, title: 'Deep Stress Relief', duration: 10, category: 'Intermediate', rating: 4.9, audioUrl: 'https://cdn.pixabay.com/download/audio/2024/02/09/audio_45d4a133fc.mp3?filename=relaxation-music-178714.mp3' },
    { id: 103, title: 'Sleep Preparation Scan', duration: 15, category: 'Beginner', rating: 4.7, audioUrl: 'https://cdn.pixabay.com/download/audio/2024/01/22/audio_73062ed07a.mp3?filename=sleep-meditation-with-soft-music-201584.mp3' },
];

// Wellness Articles: Highly relevant topics for students (These open an alert)
const ARTICLE_RESOURCES = [
    { id: 201, title: 'Mastering Time: The Anti-Procrastination Guide', duration: 8, category: 'Productivity' },
    { id: 202, title: 'The Mental Health Survival Kit for Exam Season', duration: 5, category: 'Stress Management' },
    { id: 203, title: 'Eating Well on a Student Budget: Nutrition Tips', duration: 6, category: 'Nutrition' },
    { id: 204, title: 'Digital Detox: Reclaiming Focus from Your Phone', duration: 12, category: 'Digital Wellness' },
];

// Wellness Podcasts: Redirect to external host pages on click (NPR Life Kit for simulation)
const PODCAST_RESOURCES = [
    { id: 301, title: 'Student Mental Health Matters', episode: 'Episode 12', duration: 32, url: 'https://www.npr.org/podcasts/510313/life-kit' },
    { id: 302, title: 'Mindful Study Techniques', episode: 'Episode 8', duration: 28, url: 'https://www.npr.org/podcasts/510313/life-kit' },
    { id: 303, title: 'Dealing with Academic Pressure', episode: 'Episode 15', duration: 41, url: 'https://www.npr.org/podcasts/510313/life-kit' },
];

// Videos: (Used the list you provided)
const VIDEO_RESOURCES = [
    { id: 401, title: 'Quick Dorm Room Workout', duration: 15, category: 'No equipment needed', url: 'https://www.youtube.com/watch?v=gke_wunq7Ng', thumbnail: 'https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 402, title: '4-7-8 Breathing Technique', duration: 5, category: 'Stress relief', url: 'https://www.youtube.com/watch?v=qV3hccsqqKM', thumbnail: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 403, title: 'Morning Yoga Flow', duration: 20, category: 'Beginner friendly', url: 'https://www.youtube.com/watch?v=LqXZ628YNj4', thumbnail: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 404, title: 'Pranayama Tips', duration: 10, category: 'Breathing', url: 'https://www.youtube.com/watch?v=-EH4D_DAvqc', thumbnail: 'https://images.pexels.com/photos/1365448/pexels-photo-1365448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 405, title: 'Shilpa Shetty Yoga Tips', duration: 30, category: 'Fitness', url: 'https://www.youtube.com/watch?v=Vi78by7cCEQ', thumbnail: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
];


const Resources = () => {
    // State to manage a single continuous audio playback session
    const [playingAudio, setPlayingAudio] = useState(null);

    // Handles the embedded HTML5 Audio playback for Meditations
    const handlePlayAudio = (url) => {
        if (playingAudio === url) {
            setPlayingAudio(null); // Pause if already playing
        } else {
            setPlayingAudio(url); // Start new playback
        }
    };
    
    // Handles opening external links (Videos, Articles, Podcasts)
    const handleOpenLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <header className="main-header">
                <div className="header-title">
                    <h1>Wellness Resources</h1>
                    <p>Tools and content to support your mental and physical well-being.</p>
                </div>
            </header>
            
            {/* Functional Audio Player at the bottom of the screen */}
            {playingAudio && (
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, background: '#1c2536', padding: '10px' }}>
                    <audio controls autoPlay src={playingAudio} style={{ width: '100%' }}>
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}

            {/* Daily Mindfulness Challenge (Static Banner) */}
            <section className="card challenge-banner">
                <img src="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Person meditating by a calm lake" />
                <div className="challenge-content">
                    <h3>Daily Mindfulness Challenge</h3>
                    <p>Join thousands of students in a 30-day mindfulness journey. Just 10 minutes a day can transform your mental well-being.</p>
                    <div className="tags">
                        <span>Free</span><span>30 Days</span><span>Beginner Friendly</span>
                    </div>
                </div>
                <button className="btn-primary challenge-btn" onClick={() => alert("Challenge initiated!")}><i className="fa-solid fa-play"></i> Start Challenge</button>
            </section>

            {/* Guided Meditations (Functional Audio Player) */}
            <section className="card">
                <h3 className="section-title"><i className="fa-solid fa-headphones"></i> Guided Meditations</h3>
                <p className="section-subtitle">Start a session and control the audio player at the bottom.</p>
                <div className="meditation-grid">
                    {MEDITATION_TRACKS.map(item => (
                        <div key={item.id} className="meditation-item">
                            <div>
                                <h4>{item.title}</h4>
                                <p>{item.duration} min <span className="tag">{item.category}</span></p>
                            </div>
                            <div className="rating"><i className="fa-solid fa-star"></i> {item.rating}</div>
                            
                            {/* Functional Play/Pause Button */}
                            <button 
                                className="btn-secondary-icon" 
                                onClick={() => handlePlayAudio(item.audioUrl)}
                                style={{
                                    backgroundColor: playingAudio === item.audioUrl ? '#F87171' : 'transparent',
                                    color: playingAudio === item.audioUrl ? 'white' : 'var(--text-primary)'
                                }}
                            >
                                <i className={`fa-solid fa-${playingAudio === item.audioUrl ? 'pause' : 'play'}`}></i> 
                                {playingAudio === item.audioUrl ? ' Pause' : ' Start Session'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <div className="resource-columns">
                {/* Wellness Articles (Functional Click to Open) */}
                <section className="card">
                    <h3 className="section-title"><i className="fa-solid fa-book-open-reader"></i> Wellness Articles</h3>
                    <p className="section-subtitle">Evidence-based articles on student wellness</p>
                    <ul className="content-list">
                        {ARTICLE_RESOURCES.map(item => (
                            <li key={item.id} onClick={() => handleOpenLink('https://example.com/article')} style={{cursor: 'pointer'}}>
                                <div>
                                    <h4>{item.title}</h4>
                                    <span className="tag">{item.category}</span>
                                </div>
                                <span><i className="fa-solid fa-clock"></i> {item.duration} min</span>
                            </li>
                        ))}
                    </ul>
                    <button className="btn-secondary-outline full-width">View All Articles</button>
                </section>
                
                {/* Wellness Podcasts (Functional Click to Redirect) */}
                <section className="card">
                    <h3 className="section-title"><i className="fa-solid fa-podcast"></i> Wellness Podcasts</h3>
                    <p className="section-subtitle">Listen to expert advice on student wellness</p>
                     <ul className="content-list">
                        {PODCAST_RESOURCES.map(item => (
                            <li key={item.id} onClick={() => handleOpenLink(item.url)} style={{cursor: 'pointer'}}>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{item.episode}</p>
                                </div>
                                <span><i className="fa-solid fa-clock"></i> {item.duration} min</span>
                            </li>
                        ))}
                    </ul>
                    <button className="btn-secondary-outline full-width">Browse Podcasts</button>
                </section>
            </div>
            
            {/* Wellness Videos (Functional Click to Open YouTube) */}
            <section className="card">
                <h3 className="section-title"><i className="fa-solid fa-video"></i> Wellness Videos</h3>
                <p className="section-subtitle">Visual guides for relaxation and exercise</p>
                <div className="video-grid">
                    {VIDEO_RESOURCES.map((item, index) => (
                        <div key={index} className="video-card" onClick={() => handleOpenLink(item.url)}>
                            <div className="video-thumbnail">
                                <img src={item.thumbnail} alt={item.title} />
                                <div className="play-icon"><i className="fa-solid fa-play"></i></div>
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.duration} min • {item.category}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Resources;