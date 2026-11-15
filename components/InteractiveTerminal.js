'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" />
    </svg>
);

const COMMANDS = {
    help: {
        output: [
            '┌─────────────────────────────────────────┐',
            '│  Available Commands                      │',
            '├─────────────────────────────────────────┤',
            '│  about      - Who am I?                  │',
            '│  projects   - View my projects            │',
            '│  skills     - See my tech stack           │',
            '│  experience - Work experience             │',
            '│  contact    - Get in touch                │',
            '│  resume     - Download my resume          │',
            '│  github     - Open my GitHub              │',
            '│  clear      - Clear terminal              │',
            '│  whoami     - Current user                │',
            '│  date       - Current date                │',
            '│  echo       - Echo a message              │',
            '│  sudo       - Try it ;)                   │',
            '│  exit       - Close terminal              │',
            '└─────────────────────────────────────────┘',
        ],
    },
    about: {
        output: [
            "Hi! I'm Aakarshak Swaraj",
            '',
            'CS student at VIT Chennai, passionate about building',
            'software that solves real problems.',
            '',
            'I specialize in Full-Stack Development, AI/ML, and',
            'cross-platform mobile apps.',
            '',
            'Type "projects" to see what I\'ve built!',
        ],
        navigate: 'home',
    },
    projects: {
        output: [
            '> Navigating to Engineering Dossier...',
            '',
            '  [ch1] FIFA 2026 Engine       | 20k Monte Carlo, Platt Calibration',
            '  [ch2] Placement Outreach     | 2-Stage Protocol, Zero Spam',
            '  [ch3] Hollow Knight RL       | C# BepInEx RAM Hook, 23-D Radar',
            '  [ch4] Taslasoft & Qcecuring  | 95% Precision NLP, Quorum PKI',
            '  [ch5] TSlate (Mom Translator)| 100% Offline Whisper+NLLB-200',
            '  [lab] Team Dromos Hyperloop  | 2nd Place GHC, Low-pass Filter',
            '',
            'Scrolling to dossier deck...',
        ],
        navigate: 'dossier-projects',
    },
    skills: {
        output: [
            '> Technical Skills & Systems Profile:',
            '',
            '  Languages    | Python, C++, JavaScript, C#, SQL',
            '  AI & ML      | PyTorch, Scikit-Learn, Transformers, OpenCV, NLP',
            '  Systems & RL | BepInEx, Unity RAM Hook, Multiprocessing, Linux',
            '  Databases    | PostgreSQL, MySQL, MongoDB, SQLite',
            '  Cloud/DevOps | Docker, AWS (EC2, S3, Lambda), Git CI/CD',
        ],
        navigate: 'pipeline',
    },
    experience: {
        output: [
            '> Production Engineering Experience:',
            '',
            '  Taslasoft       | AIML & SDE Intern | Feb-Sep 2026 | 95% Precision',
            '  Qcecuring Tech  | SDE Intern        | Oct-Dec 2025 | Quorum PKI (-60% latency)',
            '  Team Dromos     | Levitation Eng    | GHC 2nd Place Internationally',
            '',
            'Scrolling to circuit pipeline...',
        ],
        navigate: 'pipeline',
    },
    contact: {
        output: [
            '> Direct Coordinates & Dispatch:',
            '',
            '  Email    | aakarshak.work@gmail.com (1-Click Copy)',
            '  LinkedIn | linkedin.com/in/aakarshak-swaraj-a3ba21290',
            '  GitHub   | github.com/Krishna-Kilrofkansa',
            '  LeetCode | leetcode.com/u/Aakarshak_Swaraj (300+ Solved, 1508)',
            '  Location | Chennai (VIT) -> Bengaluru, India',
            '',
            'Scrolling to contact section...',
        ],
        navigate: 'contact',
    },
    resume: {
        output: [
            '> Opening resume download...',
        ],
        action: 'resume',
    },
    github: {
        output: [
            '> Opening GitHub profile...',
        ],
        action: 'github',
    },
    whoami: {
        output: ['visitor@aakarshak-portfolio ~ $'],
    },
    sudo: {
        output: [
            '> Nice try! You don\'t have root access here.',
            '  But I appreciate the hacker spirit.',
        ],
    },
    exit: {
        output: ['> Closing terminal... See you around!'],
        action: 'exit',
    },
};

export default function InteractiveTerminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [history, setHistory] = useState([
        { type: 'system', text: 'Welcome to Aakarshak\'s Terminal v2.0.0' },
        { type: 'system', text: 'Type "help" to see available commands.' },
        { type: 'system', text: '' },
    ]);
    const [input, setInput] = useState('');
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, isMinimized]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const processCommand = (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        const parts = trimmed.split(' ');
        const command = parts[0];
        const args = parts.slice(1).join(' ');

        const newHistory = [...history, { type: 'input', text: cmd }];

        if (command === 'clear') {
            setHistory([]);
            return;
        }

        if (command === 'date') {
            newHistory.push({ type: 'output', text: new Date().toString() });
            setHistory(newHistory);
            return;
        }

        if (command === 'echo') {
            newHistory.push({ type: 'output', text: args || '' });
            setHistory(newHistory);
            return;
        }

        if (COMMANDS[command]) {
            const cmdDef = COMMANDS[command];
            cmdDef.output.forEach((line) => {
                newHistory.push({ type: 'output', text: line });
            });
            setHistory(newHistory);

            if (cmdDef.navigate) {
                setTimeout(() => {
                    const el = document.getElementById(cmdDef.navigate);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 600);
            }

            if (cmdDef.action === 'resume') {
                setTimeout(() => {
                    const a = document.createElement('a');
                    a.href = '/Aakarshak aiml.pdf';
                    a.download = true;
                    a.click();
                }, 500);
            }

            if (cmdDef.action === 'github') {
                setTimeout(() => {
                    window.open('https://github.com/krishna-kilrofkansa', '_blank');
                }, 500);
            }

            if (cmdDef.action === 'exit') {
                setTimeout(() => setIsOpen(false), 800);
            }
        } else if (command) {
            newHistory.push({
                type: 'error',
                text: `bash: ${command}: command not found. Type "help" for available commands.`,
            });
            setHistory(newHistory);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setCmdHistory((prev) => [input, ...prev]);
        setHistoryIndex(-1);
        processCommand(input);
        setInput('');
    };

    const handleKeyDown = (e) => {
        // Re-dispatch to window so EasterEgg Konami Code listener still fires
        window.dispatchEvent(new KeyboardEvent('keydown', { key: e.key, bubbles: false }));

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < cmdHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInput(cmdHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(cmdHistory[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    if (!isOpen) {
        return (
            <motion.button
                className="terminal-fab"
                onClick={() => setIsOpen(true)}
                title="Open Terminal"
                aria-label="Open Terminal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <TerminalIcon />
            </motion.button>
        );
    }

    return (
        <motion.div
            className={`terminal-window ${isMinimized ? 'minimized' : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="terminal-header">
                <div className="terminal-dots">
                    <span className="dot dot-red" onClick={() => setIsOpen(false)} title="Close"></span>
                    <span className="dot dot-yellow" onClick={() => setIsMinimized(!isMinimized)} title="Minimize"></span>
                    <span className="dot dot-green" onClick={() => setIsMinimized(false)} title="Maximize"></span>
                </div>
                <span className="terminal-title">visitor@aakarshak ~ bash</span>
            </div>
            {!isMinimized && (
                <div className="terminal-body" ref={terminalRef} onClick={() => inputRef.current?.focus()}>
                    {history.map((entry, i) => (
                        <div key={i} className={`terminal-line terminal-${entry.type}`}>
                            {entry.type === 'input' && (
                                <span className="terminal-prompt">
                                    <span className="prompt-user">visitor</span>
                                    <span className="prompt-at">@</span>
                                    <span className="prompt-host">portfolio</span>
                                    <span className="prompt-char"> ~ $ </span>
                                </span>
                            )}
                            <span>{entry.text}</span>
                        </div>
                    ))}
                    <form onSubmit={handleSubmit} className="terminal-input-line">
                        <span className="terminal-prompt">
                            <span className="prompt-user">visitor</span>
                            <span className="prompt-at">@</span>
                            <span className="prompt-host">portfolio</span>
                            <span className="prompt-char"> ~ $ </span>
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="terminal-input"
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </form>
                </div>
            )}
        </motion.div>
    );
}
