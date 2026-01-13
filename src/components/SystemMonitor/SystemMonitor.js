import React, { useState, useEffect } from 'react';
import './SystemMonitor.css';

const SystemMonitor = () => {
    const [stats, setStats] = useState({
        fps: 60,
        memory: 0,
        uptime: 0,
        load: 0,
        tasks: 142
    });

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [expanded, setExpanded] = useState(false);

    // Emulate terminal key
    const toggleTerminal = (e) => {
        e.stopPropagation();
        const event = new KeyboardEvent('keydown', { key: '~' });
        window.dispatchEvent(event);
    };

    useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        const startTime = Date.now();

        // FPS Counter
        const loop = (now) => {
            frameCount++;
            if (now - lastTime >= 1000) {
                setStats(prev => ({
                    ...prev,
                    fps: frameCount,
                    load: Math.floor(Math.random() * 30) + 10,
                    memory: Math.floor(Math.random() * 100) + 400,
                    uptime: Math.floor((Date.now() - startTime) / 1000)
                }));
                frameCount = 0;
                lastTime = now;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);

        // Mouse Tracking
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`system-monitor ${expanded ? 'expanded' : 'collapsed'}`}>
            <div className="monitor-header" onClick={() => setExpanded(!expanded)}>
                <span className="status-indicator online"></span>
                <span className="monitor-title">SYS.MONITOR</span>
                <button className="term-btn" onClick={toggleTerminal} title="Open Terminal (~)">
                    {'>_'}
                </button>
            </div>

            <div className="monitor-content">
                <div className="monitor-row">
                    <span className="label">FPS:</span>
                    <span className="value text-green">{stats.fps}</span>
                </div>
                <div className="monitor-row">
                    <span className="label">CPU:</span>
                    <span className="value text-cyan">{stats.load}%</span>
                </div>
                <div className="monitor-row">
                    <span className="label">RAM:</span>
                    <span className="value text-amber">{stats.memory}MB</span>
                </div>
                <div className="monitor-row">
                    <span className="label">LOC:</span>
                    <span className="value">{mousePos.x}, {mousePos.y}</span>
                </div>
                <div className="monitor-row">
                    <span className="label">UP:</span>
                    <span className="value">{formatTime(stats.uptime)}</span>
                </div>

                <div className="load-graph">
                    <div className="graph-bar" style={{ height: `${Math.random() * 100}%` }}></div>
                    <div className="graph-bar" style={{ height: `${Math.random() * 100}%` }}></div>
                    <div className="graph-bar" style={{ height: `${Math.random() * 100}%` }}></div>
                    <div className="graph-bar" style={{ height: `${Math.random() * 100}%` }}></div>
                    <div className="graph-bar" style={{ height: `${Math.random() * 100}%` }}></div>
                    <div className="graph-bar" style={{ height: `${Math.random() * 100}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default SystemMonitor;
