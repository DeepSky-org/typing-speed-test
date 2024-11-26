import Head from 'next/head';
import { useState, useEffect } from 'react';

const quotes = [
  'The quick brown fox jumps over the lazy dog',
  'To be or not to be, that is the question',
  'All that glitters is not gold',
  'A journey of a thousand miles begins with a single step',
  'Fortune favors the bold'
];

export default function Home() {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    setText(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const handleRestart = () => {
    setInput('');
    setText(quotes[Math.floor(Math.random() * quotes.length)]);
    setTimeLeft(60);
    setIsActive(false);
    setIsFinished(false);
    setIsCorrect(null);
  };

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isActive, timeLeft]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!isActive && value.length === 1) {
      setIsActive(true);
    }
    setInput(value);
    if (value.trim() === text) {
      setIsFinished(true);
      setIsCorrect(true);
      setIsActive(false);
    } else if (value.length >= text.length) {
      setIsFinished(true);
      setIsCorrect(false);
    }
  };

  const words = text.split(' ');
  const inputWords = input.split(' ');

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center">
      <Head>
        <title>Typing Speed Test</title>
      </Head>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Welcome to Typing Speed Test</h1>
        <p className="text-lg text-gray-200 mt-2">Improve your typing skills with our interactive test</p>
      </header>
      <main className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Start Typing Below</h2>
        <p className="mb-4 text-lg text-gray-700">
          {words.map((word, index) => (
            <span key={index} className={`mr-1 ${inputWords[index] === word ? 'text-green-500' : inputWords[index] ? 'text-red-500' : ''}`}>{word}</span>
          ))}
        </p>
        <textarea
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          rows="4"
          placeholder="Type the above text here..."
          value={input}
          onChange={handleInputChange}
          disabled={isFinished && isCorrect}
        />
        <p className="mt-4 text-lg text-gray-800">Time Left: {timeLeft}s</p>
        {isFinished && isCorrect && <p className="mt-4 text-lg text-green-500">Congratulations! You've completed the test correctly.</p>}
        {isFinished && !isCorrect && <p className="mt-4 text-lg text-red-500">Oops! There are mistakes in your input.</p>}
        <button onClick={handleRestart} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 ease-in-out">Restart Test</button>
      </main>
      <footer className="mt-8 text-center">
        <p className="text-gray-300">&copy; 2023 Typing Speed Test. All rights reserved.</p>
      </footer>
    </div>
  );
}
