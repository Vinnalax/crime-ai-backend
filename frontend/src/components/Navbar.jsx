import { Shield } from "lucide-react"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full h-16 border-b border-white/10 bg-card/60 backdrop-blur-xl px-6 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shadow-glow border border-accent/20">

          <Shield
            className="text-accent"
            size={22}
          />

        </div>

        <div>

          <h1 className="text-lg font-semibold tracking-wide">
            Bengaluru Crime Intelligence
          </h1>

          <p className="text-xs text-muted">
            Urban Risk & Geospatial Analytics
          </p>

        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5 text-sm text-muted">

        <button className="hover:text-white transition-all">
          English
        </button>

        <button className="hover:text-white transition-all">
          Dark
        </button>

      </div>
    </nav>
  )
}

export default Navbar