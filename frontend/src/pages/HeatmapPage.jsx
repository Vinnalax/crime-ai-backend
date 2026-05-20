import CrimeMap from "../components/CrimeMap"

import {
  motion,
} from "framer-motion"

import {
  Radar,
  ShieldAlert,
  Activity,
} from "lucide-react"

function HeatmapPage() {

  return (
    <div className="relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize:
              "60px 60px",
          }}
        />

        {/* GLOW */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
          }}
          className="absolute top-[-160px] left-[-120px] w-[420px] h-[420px] bg-red-500/10 blur-[140px] rounded-full"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="absolute bottom-[-160px] right-[-120px] w-[360px] h-[360px] bg-cyan-500/10 blur-[120px] rounded-full"
        />

      </div>

      {/* HERO */}
      <section className="relative mb-12 pt-6">

        <div className="relative z-10">

          {/* BADGES */}
          <div className="flex flex-wrap items-center gap-3 mb-5">

            <div className="px-5 py-2 rounded-full bg-red-500/10 border border-red-400/20 text-red-400 dark:text-red-300 text-[11px] tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(239,68,68,0.15)]">

              Geospatial Intelligence

            </div>

            <div className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.06] text-slate-600 dark:text-slate-400 text-xs backdrop-blur-xl">

              Real-Time Crime Density

            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-500 dark:text-emerald-300 text-xs">

              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              Live Spatial Feed

            </div>

          </div>

          {/* TITLE */}
          <h1 className="text-5xl xl:text-6xl font-bold leading-[1.02] tracking-tight max-w-5xl text-slate-900 dark:text-white">

            Bengaluru Crime Heatmap

          </h1>

          {/* DESCRIPTION */}
          <p className="text-slate-600 dark:text-slate-400 text-xl mt-6 max-w-3xl leading-relaxed">

            Real-time spatial hotspot visualization and
            urban crime density analytics powered by
            AI-driven geospatial intelligence systems.

          </p>

        </div>

      </section>

      {/* FILTER BAR */}
      <div className="bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[28px] p-4 flex flex-wrap gap-4 items-center mb-8 relative overflow-hidden">

        {/* AMBIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.03] to-cyan-500/[0.02]" />

        <div className="relative z-10 flex flex-wrap gap-4 w-full">

          <select className="bg-white/50 dark:bg-background/80 border border-white/[0.08] rounded-2xl px-4 py-3 text-sm outline-none text-slate-700 dark:text-slate-300 backdrop-blur-xl min-w-[180px]">

            <option>All Crime Types</option>
            <option>Theft</option>
            <option>Cyber Crime</option>
            <option>Robbery</option>

          </select>

          <select className="bg-white/50 dark:bg-background/80 border border-white/[0.08] rounded-2xl px-4 py-3 text-sm outline-none text-slate-700 dark:text-slate-300 backdrop-blur-xl min-w-[160px]">

            <option>All Years</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>

          </select>

          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-[1.02] transition-all duration-300 text-white text-sm font-medium shadow-[0_10px_30px_rgba(59,130,246,0.25)]">

            Apply Filters

          </button>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.7fr] gap-6">

        {/* MAP PANEL */}
        <div className="relative bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6 overflow-hidden">

          {/* AMBIENT */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.01]" />

          {/* HEADER */}
          <div className="relative z-10 flex items-center justify-between mb-6">

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 dark:text-blue-300 text-[10px] tracking-[0.3em] uppercase">

                  Live GIS Layer

                </div>

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              </div>

              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">

                Live Crime Density Map

              </h2>

              <p className="text-slate-600 dark:text-slate-400 mt-3">

                Real-time hotspot monitoring and
                urban crime density visualization.

              </p>

            </div>

            <Radar className="text-cyan-400 dark:text-cyan-300 w-7 h-7" />

          </div>

          {/* MAP */}
          <div className="relative h-[640px] rounded-[30px] overflow-hidden border border-white/[0.05]">

            {/* MAP GLOW */}
            <div className="absolute inset-0 z-[400] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)]" />


            {/* MAP */}
            <CrimeMap />

            {/* FLOATING MAP INFO */}
            <div className="absolute bottom-6 left-6 right-6 z-[500] flex items-end justify-between pointer-events-none">

              <div className="max-w-xl">

                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300 mb-3 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">

                  Geospatial Intelligence

                </p>

                <h3 className="text-3xl font-bold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">

                  Live Crime Density Map

                </h3>

                <p className="text-slate-200 mt-3 text-sm leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">

                  Real-time Bengaluru hotspot visualization
                  powered by AI-driven geospatial analytics.

                </p>

              </div>

              <div className="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                <span className="text-sm text-white">

                  Live GIS Layer

                </span>

              </div>

            </div>

          </div>

        </div>

        {/* SIDE PANEL */}
        <div className="space-y-6">

          {/* HOTSPOTS */}
          <div className="bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6 overflow-hidden relative">

            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] to-transparent" />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">

                    Hotspot Zones

                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 mt-2">

                    AI-prioritized spatial risk zones

                  </p>

                </div>

                <ShieldAlert className="text-red-400 dark:text-red-300" />

              </div>

              <div className="space-y-5">

                {[
                  "K.R. Puram",
                  "Byatarayanapura",
                  "Peenya",
                  "Varthur",
                  "Subramanyapura",
                ].map((zone) => (

                  <motion.div
                    whileHover={{
                      x: 4,
                    }}
                    key={zone}
                    className="bg-white/50 dark:bg-background/60 border border-white/[0.05] rounded-2xl p-4 backdrop-blur-xl"
                  >

                    <div className="flex items-center justify-between mb-4">

                      <div className="flex items-center gap-3">

                        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />

                        <span className="font-medium text-slate-900 dark:text-white">

                          {zone}

                        </span>

                      </div>

                      <span className="text-red-400 text-sm">

                        High Risk

                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-black/[0.04] dark:bg-white/[0.04] overflow-hidden">

                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: "82%",
                        }}
                        transition={{
                          duration: 1,
                        }}
                        className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                      />

                    </div>

                  </motion.div>

                ))}

              </div>

            </div>

          </div>

          {/* LEGEND */}
          <div className="bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6 overflow-hidden relative">

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-blue-500/[0.01]" />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">

                    Risk Legend

                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">

                    Spatial threat classification

                  </p>

                </div>

                <Activity className="text-cyan-400 dark:text-cyan-300" />

              </div>

              <div className="space-y-5">

                {[
                  {
                    color: "bg-green-400",
                    label: "Low Risk",
                  },

                  {
                    color: "bg-yellow-400",
                    label: "Moderate",
                  },

                  {
                    color: "bg-orange-400",
                    label: "High",
                  },

                  {
                    color: "bg-red-500",
                    label: "Critical",
                  },
                ].map((item) => (

                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-background/50 border border-white/[0.05] backdrop-blur-xl"
                  >

                    <div className={`w-4 h-4 rounded-full ${item.color}`} />

                    <span className="text-slate-700 dark:text-slate-300">

                      {item.label}

                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default HeatmapPage