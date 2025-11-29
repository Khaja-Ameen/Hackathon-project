import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 

// Helper function to format seconds into MM:SS string
const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Convert '10 min' string to seconds
const durationToSeconds = (durationString) => {
    return parseInt(durationString.split(' ')[0]) * 60;
};


// --- STATIC AUDIO RESOURCES (Unchanged) ---
const QUICK_MEDITATIONS = [
    { title: 'Study Break Meditation', audioUrl: 'https://cdn.pixabay.com/download/audio/2023/11/27/audio_4a0e413009.mp3?filename=sleep-meditation-200922.mp3', duration: 5 },
    { title: 'Pre-Exam Calm', audioUrl: 'https://cdn.pixabay.com/download/audio/2024/02/09/audio_45d4a133fc.mp3?filename=relaxation-music-178714.mp3', duration: 5 },
    { title: 'Morning Motivation', audioUrl: 'https://cdn.pixabay.com/download/audio/2024/01/22/audio_73062ed07a.mp3?filename=sleep-meditation-with-soft-music-201584.mp3', duration: 5 },
    { title: 'Evening Wind Down', audioUrl: 'https://cdn.pixabay.com/download/audio/2023/07/07/audio_0af2605b82.mp3?filename=meditation-167885.mp3', duration: 5 },
];

const AMBIENT_SOUNDS = [
    { title: 'Ocean Waves', icon: '🌊', audioUrl: 'https://cdn.pixabay.com/download/audio/2022/07/20/audio_51f03126f5.mp3?filename=ocean_waves_sea_meditation_nature_relaxation_audio.mp3' },
    { title: 'Rain Sounds', icon: '🌧️', audioUrl: 'https://cdn.pixabay.com/download/audio/2022/07/19/audio_6506f36608.mp3?filename=rain_nature_rainy.mp3' },
    { title: 'Forest Birds', icon: '🌲', audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/21/audio_1e59267ff3.mp3?filename=forest-6345.mp3' },
    { title: 'Crackling Fire', icon: '🔥', audioUrl: 'https://cdn.pixabay.com/download/audio/2023/03/17/audio_e6e5cc5606.mp3?filename=fire_place_calm.mp3' },
];

const PEACEFUL_SCENES = [
    'https://images.pexels.com/photos/417054/pexels-photo-417054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1424246/pexels-photo-1424246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
];
// -------------------------------------------------------------


const Mindfulness = () => {
    // --- TIMER LOGIC ---
    const timerIntervalRef = useRef(null);
    const [activeDuration, setActiveDuration] = useState('10 min');
    const [timeRemaining, setTimeRemaining] = useState(durationToSeconds('10 min'));
    const [timerRunning, setTimerRunning] = useState(false);
    
    // --- AUDIO LOGIC ---
    const audioRef = useRef(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Initial load and timer synchronization
    useEffect(() => {
        setTimeRemaining(durationToSeconds(activeDuration));
    }, [activeDuration]);

    // Timer Interval Effect
    useEffect(() => {
        if (timerRunning && timeRemaining > 0) {
            timerIntervalRef.current = setInterval(() => {
                setTimeRemaining(prevTime => {
                    if (prevTime === 1) {
                        clearInterval(timerIntervalRef.current);
                        setTimerRunning(false);
                        alert("Meditation session complete!");
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (timeRemaining === 0 && timerRunning) {
             setTimerRunning(false); // Ensure running state is false if time hits zero naturally
        }
        
        return () => clearInterval(timerIntervalRef.current);
    }, [timerRunning, timeRemaining]); // Depend on running status and time itself

    
    // Audio Control Effect
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying && currentTrack) {
                if (audioRef.current.src !== currentTrack) {
                    audioRef.current.src = currentTrack;
                }
                audioRef.current.play().catch(e => console.log("Autoplay failed, user must interact manually.", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);


    // --- TIMER HANDLERS ---
    const handleResetTimer = () => {
        clearInterval(timerIntervalRef.current);
        setTimerRunning(false);
        setTimeRemaining(durationToSeconds(activeDuration));
    };

    const handleStartTimer = () => {
        if (timerRunning) {
            // Pause
            clearInterval(timerIntervalRef.current);
            setTimerRunning(false);
        } else {
            // Start or Resume
            if (timeRemaining === 0) {
                 setTimeRemaining(durationToSeconds(activeDuration));
            }
            setTimerRunning(true);
        }
    };
    
    // --- AUDIO HANDLERS ---
    const handleAudioToggle = (url) => {
        if (currentTrack === url && isPlaying) {
            setIsPlaying(false); // Pause current track
        } else if (currentTrack === url && !isPlaying) {
            setIsPlaying(true); // Resume current track
        } else {
            setCurrentTrack(url); // Switch to new track
            setIsPlaying(true);
        }
    };


    return (
        <>
            <header className="main-header">
                <div className="header-title">
                    <h1>Mindfulness & Meditation</h1>
                    <p>Find peace and clarity through mindful practices.</p>
                </div>
            </header>
            
            {/* Hidden Audio Player Element */}
            <audio ref={audioRef} loop={true} />
            
            {/* ⚠️ VISIBLE AUDIO PLAYER BAR (FIX FOR AUTOPLAY BLOCK) ⚠️ */}
            {currentTrack && (
                <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, background: '#1c2536', padding: '10px' }}>
                    {/* Native controls show the user where to click to unmute */}
                    <audio controls autoPlay src={currentTrack} loop={true} style={{ width: '100%' }} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
                </div>
            )}


            {/* Meditation Timer (FUNCTIONAL) */}
            <section className="card timer-card">
                <h3 className="section-title text-center">Meditation Timer</h3>
                <p className="section-subtitle text-center">Set your intention and begin your practice</p>
                <div className="timer-display">
                    <span id="timer-time">{formatTime(timeRemaining)}</span>
                    <i className="fa-solid fa-leaf timer-leaf"></i>
                </div>
                <div className="timer-durations">
                    {['5 min', '10 min', '15 min', '20 min', '30 min'].map((duration) => (
                        <button 
                            key={duration}
                            className={`duration-btn ${activeDuration === duration ? 'active' : ''}`}
                            onClick={() => setActiveDuration(duration)}
                            disabled={timerRunning} // Disable selection while running
                        >
                            {duration}
                        </button>
                    ))}
                </div>
                <div className="timer-controls">
                    <button 
                        className="btn-primary" 
                        id="start-timer-btn" 
                        onClick={handleStartTimer}
                        // Use a different icon/text for play/pause state
                    >
                        <i className={`fa-solid fa-${timerRunning ? 'pause' : 'play'}`}></i> 
                        {timerRunning ? ' Pause' : (timeRemaining < durationToSeconds(activeDuration) ? ' Resume' : ' Start')}
                    </button>
                    <button 
                        className="btn-secondary-icon" 
                        id="reset-timer-btn" 
                        onClick={handleResetTimer}
                        disabled={!timerRunning && timeRemaining === durationToSeconds(activeDuration)} // Disable if already reset
                    >
                        <i className="fa-solid fa-rotate-right"></i> Reset
                    </button>
                </div>
            </section>

            {/* Breathing Exercises (Static) */}
            <section className="card">
                <h3 className="section-title"><i className="fa-solid fa-wind"></i> Breathing Exercises</h3>
                <p className="section-subtitle">Guided breathing techniques for instant calm</p>
                <div className="breathing-grid">
                    <div className="breathing-card"><div><h4>4-7-8 Breathing</h4><p>Calm your nervous system with this powerful technique.</p></div><div className="breathing-meta"><span><i className="fa-solid fa-clock"></i> 5 min</span><button className="btn-secondary-outline">Start Exercise</button></div></div>
                    <div className="breathing-card"><div><h4>Box Breathing</h4><p>Square breathing for focus and relaxation.</p></div><div className="breathing-meta"><span><i className="fa-solid fa-clock"></i> 8 min</span><button className="btn-secondary-outline">Start Exercise</button></div></div>
                </div>
            </section>

            <div className="mindfulness-columns">
                {/* Quick Meditation (Functional Playback) */}
                <section className="card">
                    <h3 className="section-title"><i className="fa-solid fa-stopwatch"></i> Quick Meditation</h3>
                    <p className="section-subtitle">5-minute sessions for busy students</p>
                    <ul className="quick-meditation-list">
                        {QUICK_MEDITATIONS.map(item => (
                            <li key={item.title}>
                                <button 
                                    onClick={() => handleAudioToggle(item.audioUrl)}
                                    style={{ 
                                        backgroundColor: currentTrack === item.audioUrl && isPlaying ? 'var(--primary-light)' : 'transparent',
                                        borderColor: currentTrack === item.audioUrl && isPlaying ? 'var(--primary-color)' : 'var(--border-color)'
                                    }}
                                >
                                    <i className={`fa-solid fa-${currentTrack === item.audioUrl && isPlaying ? 'pause' : 'play'}`}></i> 
                                    {item.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Mindful Activities (Static) */}
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
            
            {/* Peaceful Scenes (Preserved as requested) */}
            <section className="card">
                <h3 className="section-title"><i className="fa-solid fa-images"></i> Peaceful Scenes</h3>
                <p className="section-subtitle">Visual meditation aids to calm your mind</p>
                <div className="peaceful-scenes-grid">
                    {PEACEFUL_SCENES.map((src, index) => (
                        <img key={index} src={src} alt={`Peaceful scene ${index + 1}`} />
                    ))}
                </div>
            </section>

            {/* Ambient Sounds (Functional Playback) */}
            <section className="card">
                <h3 className="section-title"><i className="fa-solid fa-volume-high"></i> Ambient Sounds</h3>
                <p className="section-subtitle">Natural soundscapes for meditation and focus</p>
                <div className="ambient-sounds-grid">
                    {AMBIENT_SOUNDS.map(item => (
                        <button 
                            key={item.title}
                            className="ambient-sound-btn"
                            onClick={() => handleAudioToggle(item.audioUrl)}
                            style={{ 
                                border: currentTrack === item.audioUrl && isPlaying ? '3px solid var(--secondary-color)' : '1px solid var(--border-color)',
                                backgroundColor: currentTrack === item.audioUrl && isPlaying ? 'var(--sidebar-bg)' : 'transparent',
                                color: currentTrack === item.audioUrl && isPlaying ? 'white' : 'var(--text-primary)',
                                transform: currentTrack === item.audioUrl && isPlaying ? 'scale(1.05)' : 'scale(1)',
                            }}
                        >
                            <span>{item.icon}</span> 
                            {item.title}
                        </button>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Mindfulness;