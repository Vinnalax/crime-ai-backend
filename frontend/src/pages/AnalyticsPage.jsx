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
    <div>

      {/* HERO */}
      <div className="relative mb-10">

        {/* AMBIENT GLOW */}
        <div className="absolute top-[-120px] left-[-80px] w-[350px] h-[350px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">

          <div className="flex items-center gap-3 mb-5">

            <div className="px-5 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs tracking-[0.25em] uppercase shadow-glow">

              Crime Intelligence Analytics

            </div>

            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted text-xs">

              AI Trend Analysis

            </div>

          </div>

          <h1 className="text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight max-w-5xl">

            Bengaluru Crime Intelligence Analytics

          </h1>

          <p className="text-muted text-lg mt-5 max-w-3xl leading-relaxed">

            Advanced crime trend analysis, hotspot ranking,
            category intelligence, and predictive urban
            safety insights powered by AI-driven analytics.

          </p>

        </div>

      </div>

      {/* QUICK INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* CARD 1 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-card to-[#081225] backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-[0_0_35px_rgba(59,130,246,0.06)] hover:border-white/20 transition-all duration-300">

          <div className="absolute top-[-40px] right-[-40px] w-[140px] h-[140px] bg-blue-500/10 blur-[80px] rounded-full" />

          <p className="text-muted text-sm">
            Crime Growth
          </p>

          <h2 className="text-4xl font-bold mt-3">
            +28%
          </h2>

          <p className="text-green-400 mt-3 text-sm">
            Increased intelligence detection
          </p>

        </div>

        {/* CARD 2 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-card to-[#120b16] backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-[0_0_35px_rgba(239,68,68,0.06)] hover:border-white/20 transition-all duration-300">

          <div className="absolute top-[-40px] right-[-40px] w-[140px] h-[140px] bg-red-500/10 blur-[80px] rounded-full" />

          <p className="text-muted text-sm">
            Highest Risk Zone
          </p>

          <h2 className="text-4xl font-bold mt-3">
            K.R Puram
          </h2>

          <p className="text-red-400 mt-3 text-sm">
            Critical hotspot intensity
          </p>

        </div>

        {/* CARD 3 */}
        <div className="relative overflow-hidden bg-gradient-to-br from-card to-[#161108] backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-[0_0_35px_rgba(249,115,22,0.06)] hover:border-white/20 transition-all duration-300">

          <div className="absolute top-[-40px] right-[-40px] w-[140px] h-[140px] bg-orange-500/10 blur-[80px] rounded-full" />

          <p className="text-muted text-sm">
            Dominant Crime Type
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Theft
          </h2>

          <p className="text-orange-400 mt-3 text-sm">
            34% of total incidents
          </p>

        </div>

      </div>

      {/* ANALYTICS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* TREND CHART */}
        <div className="relative overflow-hidden bg-gradient-to-br from-card to-[#081225] backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(59,130,246,0.08)] hover:border-white/20 transition-all duration-300">

          <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] bg-blue-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold">
                  Yearly Crime Trend
                </h2>

                <p className="text-muted mt-2">
                  AI-detected urban crime growth patterns
                </p>

              </div>

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={yearlyCrimeData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
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
                      background: "#081028",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      color: "white",
                    }}
                    cursor={{
                      fill: "rgba(255,255,255,0.03)",
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
        <div className="relative overflow-hidden bg-gradient-to-br from-card to-[#140b12] backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(239,68,68,0.08)] hover:border-white/20 transition-all duration-300">

          <div className="absolute bottom-[-60px] left-[-60px] w-[180px] h-[180px] bg-red-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold">
                  Crime Distribution
                </h2>

                <p className="text-muted mt-2">
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
                      background: "#081028",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      color: "white",
                    }}
                    cursor={{
                      fill: "rgba(255,255,255,0.03)",
                    }}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* BAR CHART */}
        <div className="xl:col-span-2 relative overflow-hidden bg-gradient-to-br from-card to-[#120d10] backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(239,68,68,0.06)] hover:border-white/20 transition-all duration-300">

          <div className="absolute top-[-80px] right-[20%] w-[260px] h-[260px] bg-red-500/10 blur-[120px] rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-semibold">
                  High Risk Hotspot Ranking
                </h2>

                <p className="text-muted mt-2">
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
                    stroke="rgba(255,255,255,0.05)"
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
                      background: "#081028",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      color: "white",
                    }}
                    cursor={{
                      fill: "rgba(255,255,255,0.03)",
                    }}
                  />

                  <Bar
                    dataKey="risk"
                    fill="url(#crimeGradient)"
                    radius={[12, 12, 0, 0]}
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