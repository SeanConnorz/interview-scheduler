import { useState } from 'react';


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    if (replace) {
      setHistory(prev => {
        return [...prev.slice(0, prev.length - 1), newMode];
      });
    } else { 
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(prev => {
        setMode(prev[prev.length - 2]);
        return prev.slice(0, prev.length - 1);
      })
     }
    }
  return { mode, transition, back };
};
