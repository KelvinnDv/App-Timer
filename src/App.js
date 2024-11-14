import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
    // State untuk timer dan interval
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [laps, setLaps] = useState([]);

    // Function untuk mengatur waktu
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    // Function untuk memulai dan menghentikan timer
    const toggle = () => {
        setIsActive(!isActive);
    };

    // Function untuk mereset timer
    const reset = () => {
        setSeconds(0);
        setIsActive(false);
        setLaps([]);
    };

    // Function untuk mencatat waktu lap
    const recordLap = () => {
        setLaps([...laps, seconds]);
    };

    // Format waktu
    const formatTime = (sec) => {
        const hrs = Math.floor(sec / 3600);
        const mins = Math.floor((sec % 3600) / 60);
        const secs = sec % 60;
        return `${hrs < 10 ? "0" + hrs : hrs}:${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Timer App</h1>
            <div className='log' style={{ fontSize: '2em', margin: '20px' }}>{formatTime(seconds)}</div>
            <div>
                <button className='btn1' onClick={toggle}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button className='btn2' onClick={reset}>Reset</button>
                <button className='btn3' onClick={recordLap} disabled={!isActive}>Lap</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h2>Lap Times</h2>
                {laps.map((lap, index) => (
                    <div className='lap' key={index}>Lap {index + 1}: {formatTime(lap)} </div>
                ))}
            </div>
        </div>
    );
}

export default App;