/* claude: for Tailwind class
    source: (Theme switcher multiple themes _system_dark_light_context api-claude) */

// --------------------------------
import { useTheme } from '../context/ThemeContext';

export default function Card() {
  const { color, mode } = useTheme();

  return (
    <div className="bg-[--color-card] border border-[--color-border] rounded-xl p-6">

      <h2 className="text-[--color-text] text-xl font-medium mb-1">
        Hello world
      </h2>

      <p className="text-[--color-muted] text-sm mb-4">
        Theme: {color} / {mode}
      </p>

      <p className="text-[--color-text] text-sm mb-4 leading-relaxed">
        All colors come from CSS variables defined in themes.css.
        Tailwind reads them via the bg-[--color-card] syntax.
        No theme-specific class names needed in components.
      </p>

      <button className="bg-[--color-primary] text-white px-4 py-2 rounded-lg text-sm">
        Action
      </button>

    </div>
  );
}

