import { useState } from 'react'; 

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prev => {
        prev.splice(-1, 1, newMode);
        return [ ...prev ];
      });
    } else {
      setHistory(prev => [ ...prev, newMode ]);
    }

    setMode(newMode);
  }
  
  function back() {
    if (history.length === 1) return;

    setMode(history[history.length - 2]);
    setHistory(prev => prev.slice(0, -1));
  }

  return { mode, transition, back, history };
}
