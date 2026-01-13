import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Terminal.css';

const Terminal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState([
        { type: 'output', content: 'Cortex-M System Shell [Version 1.0.4]' },
        { type: 'output', content: 'Type "help" for available commands.' }
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const navigate = useNavigate();

    // Toggle with backtick/tilde key
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Allow user to open terminal via custom event from SystemMonitor or key
            if (e.key === '`' || e.key === '~') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Auto-focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd) => {
        const args = cmd.trim().split(' ');
        const command = args[0].toLowerCase();

        let output = '';

        switch (command) {
            case 'help':
                output = `Available commands:
  help      - Show this help message
  ls        - List sections/directories
  cd [dir]  - Navigate to section
  whoami    - Display user profile
  clear     - Clear terminal
  contact   - Show contact info
  shutdown  - Close terminal`;
                break;

            case 'ls':
                output = `Directories:
  /home
  /about
  /skills
  /experience
  /projects
  /contact`;
                break;

            case 'cd':
                const target = args[1];
                if (!target) {
                    output = "usage: cd [directory]";
                } else {
                    const sectionId = target.replace('/', '');
                    const element = document.getElementById(sectionId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        output = `Navigating to /${sectionId}...`;
                        setIsOpen(false);
                    } else {
                        output = `bash: cd: ${target}: No such file or directory`;
                    }
                }
                break;

            case 'whoami':
                output = `Amr Eslim
Role: Embedded Systems Engineer
Spec: C++, Linux, RTOS
Status: OPEN_TO_WORK`;
                break;

            case 'contact':
                output = `Email: amreslim@example.com (Replace with actual)
LinkedIn: linkedin.com/in/amreslim
GitHub: github.com/AmrEslim`;
                break;

            case 'clear':
                setHistory([]);
                return;

            case 'shutdown':
            case 'exit':
                setIsOpen(false);
                return;

            default:
                if (command !== '') {
                    output = `bash: ${command}: command not found`;
                }
        }

        if (output) {
            setHistory(prev => [...prev, { type: 'output', content: output }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cmd = input.trim();
        setHistory(prev => [...prev, { type: 'input', content: cmd }]);
        handleCommand(cmd);
        setInput('');
    };

    return (
        <>
            {isOpen && (
                <div className="quake-terminal">
                    <div className="terminal-header-bar">
                        <span className="term-title">System Terminal</span>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>[X]</button>
                    </div>
                    <div className="terminal-log">
                        {history.map((line, i) => (
                            <div key={i} className={`line ${line.type}`}>
                                {line.type === 'input' && <span className="prompt">root@sys:~#</span>}
                                <pre>{line.content}</pre>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="terminal-input-line">
                        <span className="prompt">root@sys:~#</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoFocus
                        />
                    </form>
                </div>
            )}

            {/* Persistent Floating Button for visibility */}
            {!isOpen && (
                <button
                    className="terminal-fab"
                    onClick={() => setIsOpen(true)}
                    title="Open Terminal [~]"
                >
                    &gt;_
                </button>
            )}
        </>
    );
};

export default Terminal;
