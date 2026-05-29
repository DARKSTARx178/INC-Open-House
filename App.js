import React, { useState, useEffect } from 'react';

export default function App() {
  const [page, setPage] = useState('home');
  const [clicks, setClicks] = useState(0);

  const [reactionStarted, setReactionStarted] = useState(false);
  const [reactionReady, setReactionReady] = useState(false);
  const [reactionTime, setReactionTime] = useState('');
  const [reactionStartTime, setReactionStartTime] = useState(0);

  const [guess, setGuess] = useState('');
  const [secretNumber, setSecretNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guessMessage, setGuessMessage] = useState('');

  const [darkMode, setDarkMode] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    let timeout;

    if (reactionStarted) {
      timeout = setTimeout(() => {
        setReactionReady(true);
        setReactionStartTime(Date.now());
      }, Math.random() * 3000 + 1500);
    }

    return () => clearTimeout(timeout);
  }, [reactionStarted]);

  const theme = {
    background: darkMode ? '#0f172a' : '#f1f5f9',
    card: darkMode ? '#1e293b' : '#ffffff',
    text: darkMode ? '#ffffff' : '#0f172a',
    secondary: darkMode ? '#94a3b8' : '#475569'
  };

  const resetReaction = () => {
    setReactionStarted(false);
    setReactionReady(false);
  };

  const startReactionGame = () => {
    setReactionTime('');
    setReactionStarted(true);
    setReactionReady(false);
  };

  const handleReactionPress = () => {
    const time = Date.now() - reactionStartTime;
    setReactionTime(`${time} ms ⚡`);
    resetReaction();
  };

  const checkGuess = () => {
    const num = parseInt(guess);

    if (num === secretNumber) {
      setGuessMessage('Correct 🎉');
    } else if (num < secretNumber) {
      setGuessMessage('Too low ⬆️');
    } else {
      setGuessMessage('Too high ⬇️');
    }
  };

  const resetGuessGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setGuessMessage('');
  };

  const buttonStyle = {
    padding: '14px 22px',
    borderRadius: 14,
    border: 'none',
    background: '#2563eb',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  const cardStyle = {
    background: theme.card,
    padding: 24,
    borderRadius: 24,
    marginBottom: 20,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.background,
        color: theme.text,
        fontFamily: 'Arial',
        padding: 20,
        transition: '0.3s'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <div>
          <h1>🚀 SST React Native Showcase</h1>
          <p style={{ color: theme.secondary }}>
            Small games and interactive demos
          </p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            ...buttonStyle,
            background: '#111827'
          }}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <button style={buttonStyle} onClick={() => setPage('home')}>
          🏠 Home
        </button>

        <button style={buttonStyle} onClick={() => setPage('clicker')}>
          🎮 Clicker
        </button>

        <button style={buttonStyle} onClick={() => setPage('reaction')}>
          ⚡ Reaction
        </button>

        <button style={buttonStyle} onClick={() => setPage('guess')}>
          🔢 Guess
        </button>

        <button style={buttonStyle} onClick={() => setPage('animation')}>
          🎨 Animation
        </button>
      </div>

      {page === 'home' && (
        <div style={cardStyle}>
          <h2>👋 Welcome</h2>

          <p style={{ color: theme.secondary, lineHeight: 1.7 }}>
            This showcase demonstrates simple interactive apps students can
            create using React Native concepts.
          </p>

          <ul style={{ lineHeight: 2 }}>
            <li>State management</li>
            <li>Game logic</li>
            <li>Animations</li>
            <li>Interactive UI</li>
            <li>Cross-platform development</li>
          </ul>
        </div>
      )}

      {page === 'clicker' && (
        <div style={cardStyle}>
          <h2>🎮 Clicker Game</h2>

          <div style={{ fontSize: 72, fontWeight: 'bold' }}>
            {clicks}
          </div>

          <button
            style={{
              ...buttonStyle,
              padding: '20px 36px',
              fontSize: 22
            }}
            onClick={() => setClicks(clicks + 1)}
          >
            CLICK 🔥
          </button>

          <div style={{ marginTop: 20 }}>
            <button
              style={{
                ...buttonStyle,
                background: '#ef4444'
              }}
              onClick={() => setClicks(0)}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {page === 'reaction' && (
        <div style={cardStyle}>
          <h2>⚡ Reaction Speed Test</h2>

          {!reactionStarted && (
            <button style={buttonStyle} onClick={startReactionGame}>
              Start
            </button>
          )}

          {reactionStarted && !reactionReady && (
            <div
              style={{
                marginTop: 20,
                padding: 40,
                borderRadius: 20,
                background: '#dc2626',
                color: 'white',
                textAlign: 'center',
                fontSize: 28,
                fontWeight: 'bold'
              }}
            >
              WAIT...
            </div>
          )}

          {reactionReady && (
            <div
              onClick={handleReactionPress}
              style={{
                marginTop: 20,
                padding: 40,
                borderRadius: 20,
                background: '#16a34a',
                color: 'white',
                textAlign: 'center',
                fontSize: 28,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              CLICK NOW ⚡
            </div>
          )}

          <h2>{reactionTime}</h2>
        </div>
      )}

      {page === 'guess' && (
        <div style={cardStyle}>
          <h2>🔢 Number Guessing Game</h2>

          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter number"
            style={{
              padding: 14,
              borderRadius: 12,
              border: '2px solid #cbd5e1',
              width: 250
            }}
          />

          <div
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 20,
              flexWrap: 'wrap'
            }}
          >
            <button style={buttonStyle} onClick={checkGuess}>
              Check
            </button>

            <button
              style={{
                ...buttonStyle,
                background: '#475569'
              }}
              onClick={resetGuessGame}
            >
              New Number
            </button>
          </div>

          <h2>{guessMessage}</h2>
        </div>
      )}

      {page === 'animation' && (
        <div style={cardStyle}>
          <h2>🎨 Animation Demo</h2>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 40,
              marginBottom: 40
            }}
          >
            <div
              style={{
                width: bounce ? 180 : 120,
                height: bounce ? 180 : 120,
                borderRadius: 999,
                background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
                transition: '0.3s ease',
                transform: bounce ? 'rotate(15deg)' : 'rotate(0deg)'
              }}
            />
          </div>

          <button
            style={buttonStyle}
            onClick={() => setBounce(!bounce)}
          >
            Animate ✨
          </button>
        </div>
      )}
    </div>
  );
}