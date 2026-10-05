import React, { useState, useEffect, useRef } from 'react';
import './BootSequence.css';

const bootLog = [
    "Loading low-level system drivers...",
    "Initializing GPU acceleration... [OK]",
    "Mounting VFS (Virtual File System)...",
    "Checking memory integrity... 32GB OK",
    "Loading portfolio kernel modules...",
    "  [+] module: skills_v2.ko",
    "  [+] module: projects_ui.ko",
    "Initializing CPG Control Algorithms...",
    "Calibrating servo motors (10-DOF)...",
    "Establishing secure connection (SSL/TLS)...",
    "Starting Cryptify Daemon...",
    "Booting 'Midnight Aurora' graphics engine...",
    "Welcome to AmrOS v2.0.4 LTS"
];

const BootSequence = ({ onComplete }) => {
    const [lines, setLines] = useState([]);
    const [complete, setComplete] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < bootLog.length) {
                // Timestamp generation
                const time = (Math.random() * index * 0.5).toFixed(6);
                setLines(prev => [...prev, `[ ${time.padStart(9, ' ')} ] ${bootLog[index]}`]);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setComplete(true);
                    setTimeout(onComplete, 500); // Wait for fade out
                }, 800);
            }
        }, 120); // Speed of scroll

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [lines]);

    if (complete) return null;

    return (
        <div className={`boot-screen ${complete ? 'fade-out' : ''}`}>
            <div className="boot-log">
                {lines.map((line, i) => (
                    <div key={i} className="boot-line">{line}</div>
                ))}
                <div ref={bottomRef} />
                {!complete && <div className="cursor-blink">_</div>}
            </div>
        </div>
    );
};

export default BootSequence;
