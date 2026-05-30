import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [page, setPage] = useState('home');
  const [clicks, setClicks] = useState(0);

  const [reactionStarted, setReactionStarted] = useState(false);
  const [reactionReady, setReactionReady] = useState(false);
  const [reactionTime, setReactionTime] = useState('');
  const [reactionStartTime, setReactionStartTime] = useState(0);

  const [guess, setGuess] = useState('');
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 100) + 1);
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

  const startReactionGame = () => {
    setReactionTime('');
    setReactionStarted(true);
    setReactionReady(false);
  };

  const handleReactionPress = () => {
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

  const button = (text, onPress, color = '#2563eb') => (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  const card = (content) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {content}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <Text style={[styles.title, { color: theme.text }]}>
        React Native
      </Text>

      <Text style={{ color: theme.secondary, marginBottom: 10 }}>
        Example games
      </Text>

      <View style={styles.nav}>
        {button('Home', () => setPage('home'))}
        {button('Clicker', () => setPage('clicker'))}
        {button('Reaction', () => setPage('reaction'))}
        {button('Guess', () => setPage('guess'))}
        {button(darkMode ? 'Light' : 'Dark', () => setDarkMode(!darkMode), '#111827')}
      </View>

      <View style={{ flex: 1 }}>

        {page === 'home' && card(
          <>
            <Text style={styles.h2}>Welcome to SST Inc</Text>
            <Text style={{ color: theme.secondary }}>
              this is a home page
            </Text>
          </>
        )}

        {page === 'clicker' && card(
          <>
            <Text style={styles.h2}>Clicker</Text>

            <Text style={{ fontSize: 60, color: theme.text }}>{clicks}</Text>

            {button('CLICK', () => setClicks(clicks + 1))}
            {button('Reset', () => setClicks(0), 'red')}
          </>
        )}

        {page === 'reaction' && card(
          <>
            <Text style={styles.h2}>Reaction</Text>

            {!reactionStarted && button('Start', startReactionGame)}

            {reactionStarted && !reactionReady && (
              <View style={styles.waitBox}>
                <Text style={{ color: 'white', fontSize: 24 }}>WAIT...</Text>
              </View>
            )}

            {reactionReady && (
              <TouchableOpacity style={styles.goBox} onPress={handleReactionPress}>
                <Text style={{ color: 'white', fontSize: 24 }}>CLICK NOW</Text>
              </TouchableOpacity>
            )}

            <Text style={{ marginTop: 10, fontSize: 18 }}>{reactionTime}</Text>
          </>
        )}

        {page === 'guess' && card(
          <>
            <Text style={styles.h2}>Guess</Text>

            <TextInput
              value={guess}
              onChangeText={setGuess}
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter number"
            />

            {button('Check', checkGuess)}
            {button('New Number', resetGuessGame, '#475569')}

            <Text style={{ fontSize: 20, marginTop: 10 }}>{guessMessage}</Text>
          </>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,            
    padding: 20
  },
  title: {
    fontSize: 26,
  },
  nav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 10
  },
  button: {
    padding: 12,
    borderRadius: 10,
    margin: 4
  },
  buttonText: {
    color: 'white',
  },
  card: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    marginTop: 10
  },
  h2: {
    fontSize: 22,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  center: {
    alignItems: 'center',
    marginVertical: 30
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: '#2563eb'
  },
  waitBox: {
    marginTop: 20,
    padding: 30,
    backgroundColor: 'red',
    borderRadius: 12,
    alignItems: 'center'
  },
  goBox: {
    marginTop: 20,
    padding: 30,
    backgroundColor: 'green',
    borderRadius: 12,
    alignItems: 'center'
  }
});