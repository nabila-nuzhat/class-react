/* claude: for Tailwind class
    source: (Theme switcher multiple themes _system_dark_light_context api-claude) */

import { ThemeProvider } from './context/ThemeContext';
import Card from './components/Card';
import { useTheme } from './context/ThemeContext';

function Controls() {
  const { mode, setMode, color, setColor } = useTheme();

  return (
    <div className="flex flex-col gap-3 mb-6">

      {/* mode */}
      <div className="flex gap-2">
        {['system', 'light', 'dark'].map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded-md text-sm border border-[--color-border]
              ${mode === m
                ? 'bg-[--color-primary] text-white'
                : 'bg-[--color-card] text-[--color-text]'
              }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* color */}
      <div className="flex gap-2">
        {['blue', 'purple', 'green', 'rose'].map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`px-3 py-1 rounded-md text-sm border border-[--color-border]
              ${color === c
                ? 'bg-[--color-primary] text-white'
                : 'bg-[--color-card] text-[--color-text]'
              }`}
          >
            {c}
          </button>
        ))}
      </div>

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[--color-bg] p-8">
        <Controls />
        <Card />
      </div>
    </ThemeProvider>
  );
}