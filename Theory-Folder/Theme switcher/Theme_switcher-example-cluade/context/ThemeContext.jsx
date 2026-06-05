/* claude: for Tailwind class
    source: (Theme switcher multiple themes _system_dark_light_context api-claude) */

/* -------------------------------------- */

import { createContext, useContext, useEffect, useState } from 'react';
import '../themes.css';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode]   = useState('system');
  const [color, setColor] = useState('blue');

  useEffect(() => {
    const root = document.documentElement;

    if (mode === 'dark') {
      root.classList.add('dark');
    } else if (mode === 'light') {
      root.classList.remove('dark');
    } else {
      // system — follow OS preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, color, setColor }}>
      <div data-theme={color}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);