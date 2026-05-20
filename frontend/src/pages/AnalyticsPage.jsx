import {
  motion,
} from "framer-motion"

import {
  Activity,
  TrendingUp,
  ShieldAlert,
} from "lucide-react"

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const yearlyCrimeData = [
  { year: "2019", crimes: 28000 },
  { year: "2020", crimes: 24000 },
  { year: "2021", crimes: 31000 },
  { year: "2022", crimes: 39000 },
  { year: "2023", crimes: 47000 },
]

const crimeTypeData = [
  { name: "Theft", value: 34 },
  { name: "Cyber Crime", value: 18 },
  { name: "Robbery", value: 12 },
  { name: "Accidents", value: 20 },
  { name: "Others", value: 16 },
]

const hotspotData = [
  { area: "K.R Puram", risk: 95 },
  { area: "Peenya", risk: 88 },
  { area: "Varthur", risk: 82 },
  { area: "Byatarayanapura", risk: 78 },
]

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#3b82f6",
  "#8b5cf6",
]

function AnalyticsPage() {

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

        {/* GLOWS */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
          className="absolute top-[-180px] left-[-120px] w-[420px] h-[420px] bg-blue-500/10 blur-[140px] rounded-full"
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
      <div className="relative mb-12">

        <div className="relative z-10">

          {/* BADGES */}
          <div className="flex flex-wrap items-center gap-3 mb-5">

            <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 dark:text-blue-300 text-[11px] tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.15)]">

              Crime Intelligence Analytics

            </div>

            <div className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.06] text-slate-600 dark:text-slate-400 text-xs backdrop-blur-xl">

              AI Trend Analysis

            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-500 dark:text-emerald-300 text-xs">

              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              Live Neural Insights

            </div>

          </div>

          {/* TITLE */}
          <h1 className="text-5xl xl:text-6xl font-bold leading-[1.02] tracking-tight max-w-5xl text-slate-900 dark:text-white">

            Bengaluru Crime Intelligence Analytics

          </h1>

          {/* DESCRIPTION */}
          <p className="text-slate-600 dark:text-slate-400 text-xl mt-6 max-w-3xl leading-relaxed">

            Advanced crime trend analysis, hotspot ranking,
            category intelligence, and predictive urban
            safety insights powered by AI-driven analytics.

          </p>

        </div>

      </div>

      {/* QUICK INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* CARD 1 */}
        <div className="relative overflow-hidden bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6">

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent" />

          <div className="absolute top-[-40px] right-[-40px] w-[160px] h-[160px] bg-blue-500/10 blur-[90px] rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center justify-between">

              <p className="text-slate-600 dark:text-slate-400 text-sm">

                Crime Growth

              </p>

              <TrendingUp className="text-blue-400 w-5 h-5" />

            </div>

            <h2 className="text-5xl font-bold mt-4 text-slate-900 dark:text-white">

              +28%

            </h2>

            <p className="text-emerald-500 dark:text-emerald-400 mt-4 text-sm">

              Increased intelligence detection

            </p>

          </div>

        </div>

        {/* CARD 2 */}
        <div className="relative overflow-hidden bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6">

          <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] to-transparent" />

          <div className="absolute top-[-40px] right-[-40px] w-[160px] h-[160px] bg-red-500/10 blur-[90px] rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center justify-between">

              <p className="text-slate-600 dark:text-slate-400 text-sm">

                Highest Risk Zone

              </p>

              <ShieldAlert className="text-red-400 w-5 h-5" />

            </div>

            <h2 className="text-4xl font-bold mt-4 text-slate-900 dark:text-white">

              K.R Puram

            </h2>

            <p className="text-red-400 mt-4 text-sm">

              Critical hotspot intensity

            </p>

          </div>

        </div>

        {/* CARD 3 */}
        <div className="relative overflow-hidden bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6">

          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent" />

          <div className="absolute top-[-40px] right-[-40px] w-[160px] h-[160px] bg-orange-500/10 blur-[90px] rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center justify-between">

              <p className="text-slate-600 dark:text-slate-400 text-sm">

                Dominant Crime Type

              </p>

              <Activity className="text-orange-400 w-5 h-5" />

            </div>

            <h2 className="text-4xl font-bold mt-4 text-slate-900 dark:text-white">

              Theft

            </h2>

            <p className="text-orange-400 mt-4 text-sm">

              34% of total incidents

            </p>

          </div>

        </div>

      </div>

      {/* ANALYTICS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* TREND CHART */}
        <div className="relative overflow-hidden bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6">

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent" />

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">

                  Yearly Crime Trend

                </h2>

                <p className="text-slate-600 dark:text-slate-400 mt-2">

                  AI-detected urban crime growth patterns

                </p>

              </div>

              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={yearlyCrimeData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(148,163,184,0.12)"
                  />

                  <XAxis
                    dataKey="year"
                    stroke="#94A3B8"
                  />

                  <YAxis
                    stroke="#94A3B8"
                  />

                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.92)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "16px",
                      color: "white",
                      backdropFilter: "blur(12px)",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="crimes"
                    stroke="#3B82F6"
                    strokeWidth={4}
                    dot={{
                      r: 6,
                      fill: "#3B82F6",
                    }}
                    activeDot={{
                      r: 9,
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* PIE CHART */}
        <div className="relative overflow-hidden bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6">

          <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] to-transparent" />

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">

                  Crime Distribution

                </h2>

                <p className="text-slate-600 dark:text-slate-400 mt-2">

                  Category intelligence breakdown

                </p>

              </div>

              <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />

            </div>

            <div className="h-[420px] flex items-center justify-center">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={crimeTypeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={132}
                    innerRadius={78}
                    paddingAngle={3}
                    label
                  >

                    {crimeTypeData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))}

                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.92)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "16px",
                      color: "white",
                    }}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* BAR CHART */}
        <div className="xl:col-span-2 relative overflow-hidden bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6">

          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent" />

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">

                  High Risk Hotspot Ranking

                </h2>

                <p className="text-slate-600 dark:text-slate-400 mt-2">

                  AI-prioritized crime concentration zones

                </p>

              </div>

              <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse" />

            </div>

            <div className="h-[420px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={hotspotData}>

                  <defs>
                    <linearGradient id="crimeGradient" x1="0" y1="0" x2="0" y2="1">

                      <stop offset="0%" stopColor="#ff6b6b" />

                      <stop offset="100%" stopColor="#ef4444" />

                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(148,163,184,0.12)"
                  />

                  <XAxis
                    dataKey="area"
                    stroke="#94A3B8"
                  />

                  <YAxis
                    stroke="#94A3B8"
                  />

                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.92)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "16px",
                      color: "white",
                    }}
                  />

                  <Bar
                    dataKey="risk"
                    fill="url(#crimeGradient)"
                    radius={[14, 14, 0, 0]}
                    barSize={140}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AnalyticsPage