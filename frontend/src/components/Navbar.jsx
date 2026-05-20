import {
  Shield,
  Moon,
  SunMedium,
} from "lucide-react"

function Navbar({
  theme,
  toggleTheme,
}) {

  return (
    <nav className="sticky top-0 z-50 w-full h-16 border-b border-slate-200 dark:border-white/[0.06] bg-white/80 dark:bg-card/60 backdrop-blur-2xl px-6 flex items-center justify-between transition-all duration-500">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shadow-glow border border-accent/20">

          <Shield
            className="text-accent"
            size={22}
          />

        </div>

        <div>

          <h1 className="text-lg font-semibold tracking-wide text-slate-900 dark:text-white">

            Bengaluru Crime Intelligence

          </h1>

          <p className="text-xs text-slate-500 dark:text-muted">

            Urban Risk & Geospatial Analytics

          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* THEME */}
        <button
          onClick={toggleTheme}
          className="group flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] hover:border-blue-400/20 hover:bg-blue-500/[0.05] transition-all duration-300 backdrop-blur-xl"
        >

          {theme === "dark" ? (

            <Moon
              size={16}
              className="text-blue-400 dark:text-blue-300"
            />

          ) : (

            <SunMedium
              size={16}
              className="text-amber-400"
            />

          )}

          <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">

            {theme}

          </span>

        </button>

      </div>

    </nav>
  )
}

export default Navbar