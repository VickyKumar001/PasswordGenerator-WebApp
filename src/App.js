import './App.css';
import { useState } from 'react';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumber) chars += '0123456789';
    if (includeSymbol) chars += '!@#$%^&*()_+{}[]';

    if (chars.length === 0) {
      alert('Please select at least one character type!');
      return;
    }

    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 via-blue-200 to-teal-200 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-red-400 via-yellow-500 to-green-400 bg-clip-text text-transparent mb-6">
          Password Generator
        </h1>


        <input
          type="text"
          value={password}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-lg font-mono bg-gray-100 mb-4"
          placeholder="Your Password"
        />

        <div className="flex justify-between mb-4">
          <button
            onClick={generatePassword}
            className="bg-gradient-to-r from-pink-400 via-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 text-white font-semibold px-4 py-2 rounded-lg w-[48%] transition-all"
          >
            Generate
          </button>

          <button
            onClick={copyToClipboard}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg w-[48%] transition"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="flex flex-col gap-3 text-sm text-gray-700 mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(!includeUpper)} />
            Include Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(!includeLower)} />
            Include Lowercase (a-z)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeNumber} onChange={() => setIncludeNumber(!includeNumber)} />
            Include Numbers (0-9)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeSymbol} onChange={() => setIncludeSymbol(!includeSymbol)} />
            Include Symbols (!@#$%)
          </label>
        </div>

        <div className="flex items-center justify-between text-gray-700 mb-2">
          <span>Password Length: {length}</span>
          <input
            type="range"
            min="10"
            max="25"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
