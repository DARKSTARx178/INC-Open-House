export default function App() {
  const { useState, useEffect } = React;

  const [page, setPage] = useState('home');
  const [clicks, setClicks] = useState(0);
  const [reactionStarted, setReactionStarted] = useState(false);
  const [reactionReady, setReactionReady] = useState(false);
  const [reactionTime, setReactionTime] = useState(null);
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

  const resetReaction = () => {
    setReactionStarted(false);
    setReactionReady(false);
    setReactionTime(null);
  };

  const startReactionGame = () => {
    resetReaction();
    setReactionStarted(true);
  };

  const handleReactionPress = () => {
    if (!reactionReady) {
      setReactionTime('Too early 😭');
      resetReaction();
      return;
    }

    const time = Date.now() - reactionStartTime;
    setReactionTime(`${time} ms ⚡`);
    setReactionStarted(false);
    setReactionReady(false);
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

  const theme = {
    background: darkMode ? '#0f172a' : '#f1f5f9',
    card: darkMode ? '#1e293b' : 'white',
    text: darkMode ? 'white' : '#0f172a',
    secondary: darkMode ? '#94a3b8' : '#475569',
    accent: '#2563eb'
  };

  const NavButton = ({ title, target }) => (
    <button
      onClick={() => setPage(target)}
      style={{
        padding: '12px 18px',
        borderRadius: 14,
        border: 'none',
        background: page === target ? '#2563eb' : '#334155',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: '0.2s'
      }}
    >
      {title}
    </button>
  );

  const Card = ({ children }) => (
    <div
      style={{
        background: theme.card,
        padding: 24,
        borderRadius: 24,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        marginBottom: 20
      }}
    >
      {children}
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.background,
        color: theme.text,
        fontFamily: 'Inter, sans-serif',
        transition: '0.3s',
        paddingBottom: 40
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: 28,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 40 }}>
            🚀 SST React Native Showcase
          </h1>
          <p style={{ color: theme.secondary, marginTop: 8 }}>
            Small games + interactive demos built with simple React Native ideas
          </p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '12px 18px',
            borderRadius: 14,
            border: 'none',
            background: '#111827',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* NAVIGATION */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          paddingLeft: 28,
          paddingRight: 28,
          marginBottom: 28,
          flexWrap: 'wrap'
        }}
      >
        <NavButton title="🏠 Home" target="home" />
        <NavButton title="🎮 Clicker" target="clicker" />
        <NavButton title="⚡ Reaction" target="reaction" />
        <NavButton title="🔢 Guessing" target="guess" />
        <NavButton title="🎨 Animation" target="animation" />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 20 }}>
        {/* HOME */}
        {page === 'home' && (
          <div>
            <Card>
              <h2 style={{ marginTop: 0 }}>👋 Welcome to the Demo</h2>
              <p style={{ lineHeight: 1.7, color: theme.secondary }}>
                This mini web app demonstrates how students at the School of
                Science and Technology Singapore can create interactive apps
                using React Native concepts.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: 18,
                  marginTop: 24
                }}
              >
                <div
                  style={{
                    padding: 20,
                    borderRadius: 18,
                    background: '#2563eb',
                    color: 'white'
                  }}
                >
                  <h3>🎮 Mini Games</h3>
                  <p>Build games using states, buttons, timers, and logic.</p>
                </div>

                <div
                  style={{
                    padding: 20,
                    borderRadius: 18,
                    background: '#7c3aed',
                    color: 'white'
                  }}
                >
                  <h3>📱 App Concepts</h3>
                  <p>Create apps that work across mobile and web.</p>
                </div>

                <div
                  style={{
                    padding: 20,
                    borderRadius: 18,
                    background: '#059669',
                    color: 'white'
                  }}
                >
                  <h3>⚛️ React Native</h3>
                  <p>Reusable components and modern UI design.</p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 style={{ marginTop: 0 }}>💡 What Students Learn</h2>

              <ul
                style={{
                  lineHeight: 2,
                  color: theme.secondary,
                  paddingLeft: 20
                }}
              >
                <li>State management using useState</li>
                <li>Interactive UI design</li>
                <li>Game logic and timers</li>
                <li>Animations and transitions</li>
                <li>Cross-platform development</li>
              </ul>
            </Card>
          </div>
        )}

        {/* CLICKER GAME */}
        {page === 'clicker' && (
          <Card>
            <h2 style={{ marginTop: 0 }}>🎮 Clicker Game</h2>
            <p style={{ color: theme.secondary }}>
              Simple example using React state updates.
            </p>

            <div
              style={{
                textAlign: 'center',
                marginTop: 30
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 'bold',
                  marginBottom: 20
                }}
              >
                {clicks}
              </div>

              <button
                onClick={() => setClicks(clicks + 1)}
                style={{
                  padding: '20px 36px',
                  borderRadius: 20,
                  border: 'none',
                  background: '#2563eb',
                  color: 'white',
                  fontSize: 22,
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                CLICK ME 🔥
              </button>

              <div style={{ marginTop: 20 }}>
                <button
                  onClick={() => setClicks(0)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 12,
                    border: 'none',
                    background: '#ef4444',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* REACTION GAME */}
        {page === 'reaction' && (
          <Card>
            <h2 style={{ marginTop: 0 }}>⚡ Reaction Speed Test</h2>
            <p style={{ color: theme.secondary }}>
              Measures how fast you react.
            </p>

            {!reactionStarted && (
              <button
                onClick={startReactionGame}
                style={{
                  padding: '18px 28px',
                  borderRadius: 18,
                  border: 'none',
                  background: '#2563eb',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}
              >
                Start Game
              </button>
            )}

            {reactionStarted && !reactionReady && (
              <div
                style={{
                  marginTop: 24,
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
                  marginTop: 24,
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

            {reactionTime && (
              <div style={{ marginTop: 24, fontSize: 28, fontWeight: 'bold' }}>
                {reactionTime}
              </div>
            )}
          </Card>
        )}

        {/* GUESS GAME */}
        {page === 'guess' && (
          <Card>
            <h2 style={{ marginTop: 0 }}>🔢 Number Guessing Game</h2>
            <p style={{ color: theme.secondary }}>
              Guess the secret number between 1 and 100.
            </p>

            <div style={{ marginTop: 20 }}>
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter a number"
                style={{
                  padding: 16,
                  borderRadius: 14,
                  border: '2px solid #cbd5e1',
                  width: '100%',
                  maxWidth: 300,
                  fontSize: 16
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 20,
                flexWrap: 'wrap'
              }}
            >
              <button
                onClick={checkGuess}
                style={{
                  padding: '14px 22px',
                  borderRadius: 14,
                  border: 'none',
                  background: '#2563eb',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Check Guess
              </button>

              <button
                onClick={resetGuessGame}
                style={{
                  padding: '14px 22px',
                  borderRadius: 14,
                  border: 'none',
                  background: '#475569',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                New Number
              </button>
            </div>

            <div
              style={{
                marginTop: 24,
                fontSize: 26,
                fontWeight: 'bold'
              }}
            >
              {guessMessage}
            </div>
          </Card>
        )}

        {/* ANIMATION */}
        {page === 'animation' && (
          <Card>
            <h2 style={{ marginTop: 0 }}>🎨 Simple Animation Demo</h2>
            <p style={{ color: theme.secondary }}>
              Interactive animations make apps more engaging.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
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
                  transform: bounce ? 'rotate(15deg)' : 'rotate(0deg)',
                  boxShadow: '0 10px 30px rgba(37,99,235,0.4)'
                }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setBounce(!bounce)}
                style={{
                  padding: '18px 28px',
                  borderRadius: 18,
                  border: 'none',
                  background: '#2563eb',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 18
                }}
              >
                Animate ✨
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}