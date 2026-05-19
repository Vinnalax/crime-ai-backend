import { useEffect, useMemo, useState } from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  Line,
} from "recharts"

import {
  ShieldAlert,
  Radar,
  MapPinned,
  Activity,
  Sparkles,
  ScanSearch,
  ChevronRight,
  Clock3,
  CalendarDays,
  AlertTriangle,
  BrainCircuit,
} from "lucide-react"

/*
==================================================
FORECAST DATA
==================================================
*/

const predictionData = [
  { hour: "00", risk: 42 },
  { hour: "03", risk: 48 },
  { hour: "06", risk: 58 },
  { hour: "09", risk: 64 },
  { hour: "12", risk: 72 },
  { hour: "15", risk: 81 },
  { hour: "18", risk: 91 },
  { hour: "21", risk: 87 },
  { hour: "24", risk: 69 },
]

/*
==================================================
AI RECOMMENDATIONS
==================================================
*/

const aiRecommendations = [
  "Increase patrol deployment near KR Puram",
  "Monitor escalating theft density in East Bengaluru",
  "High nighttime activity detected near Whitefield",
  "Temporal anomaly spike observed in Electronic City",
]

/*
==================================================
AREA NORMALIZATION
==================================================
*/

const areaAliases = {
  "kr puram": "K.R. Puram Bengaluru",
  "krpuram": "K.R. Puram Bengaluru",
  "btm": "BTM Layout Bengaluru",
  "hsr": "HSR Layout Bengaluru",
  "ecity": "Electronic City Bengaluru",
  "electronic city": "Electronic City Bengaluru",
  "mg road": "MG Road Bengaluru",
  "jp nagar": "JP Nagar Bengaluru",
  "whitefield": "Whitefield Bengaluru",
  "indiranagar": "Indiranagar Bengaluru",
  "koramangala": "Koramangala Bengaluru",
  "marathahalli": "Marathahalli Bengaluru",
  "hebbal": "Hebbal Bengaluru",
  "yelahanka": "Yelahanka Bengaluru",
}

/*
==================================================
SCAN SEQUENCE
==================================================
*/

const scanSteps = [
  "Resolving geospatial coordinates...",
  "Synchronizing GIS intelligence layer...",
  "Scanning hotspot clusters...",
  "Executing neural inference...",
  "Generating predictive threat analysis...",
]

function PredictionPage() {

  const [location, setLocation] =
    useState("")

  const [hour, setHour] =
    useState("")

  const [month, setMonth] =
    useState("")

  const [prediction, setPrediction] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const [resolvedLocation, setResolvedLocation] =
    useState("")

  const [scanIndex, setScanIndex] =
    useState(0)

  /*
  ==================================================
  RISK COLOR
  ==================================================
  */

  const riskColor =
    useMemo(() => {

      if (!prediction)
        return "text-blue-300"

      if (
        prediction.risk
          ?.toLowerCase() === "high"
      )
        return "text-red-400"

      if (
        prediction.risk
          ?.toLowerCase() === "medium"
      )
        return "text-amber-300"

      return "text-emerald-400"

    }, [prediction])

  /*
  ==================================================
  SCAN ANIMATION
  ==================================================
  */

  useEffect(() => {

    if (!loading) {
      setScanIndex(0)
      return
    }

    const interval =
      setInterval(() => {

        setScanIndex((prev) => {

          if (
            prev <
            scanSteps.length - 1
          ) {
            return prev + 1
          }

          return prev
        })

      }, 700)

    return () =>
      clearInterval(interval)

  }, [loading])

  /*
  ==================================================
  HANDLE PREDICTION
  ==================================================
  */

  const handlePrediction =
    async () => {

      if (
        !location.trim()
      )
        return

      setLoading(true)

      setError("")

      setPrediction(null)

      try {

        const normalizedLocation =
          areaAliases[
            location
              .trim()
              .toLowerCase()
          ] ||
          `${location}, Bengaluru`

        const geoResponse =
          await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              normalizedLocation
            )}&format=json&limit=1`
          )

        const geoData =
          await geoResponse.json()

        if (!geoData.length) {

          setError(
            "Location not found"
          )

          setLoading(false)

          return
        }

        const latitude =
          parseFloat(
            geoData[0].lat
          )

        const longitude =
          parseFloat(
            geoData[0].lon
          )

        setResolvedLocation(
          geoData[0]
            .display_name
        )

        const payload = {
          latitude,
          longitude,
        }

        if (hour !== "") {
          payload.hour =
            Number(hour)
        }

        if (month !== "") {
          payload.month =
            Number(month)
        }

        const response =
          await fetch(
            "http://127.0.0.1:8000/predict",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify(
                  payload
                ),
            }
          )

        if (!response.ok) {
          throw new Error(
            "Prediction failed"
          )
        }

        const data =
          await response.json()

        setPrediction({
          crime:
            data.predicted_crime,

          confidence:
            (
              data.confidence *
              100
            ).toFixed(1),

          risk:
            data.risk_level,

          latitude,
          longitude,
        })

      } catch (error) {

        console.error(error)

        setError(
          "AI prediction pipeline failed"
        )

      } finally {

        setLoading(false)

      }
    }

  return (
    <div className="relative min-h-screen">

      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize:
              "60px 60px",
          }}
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
          }}
          className="absolute top-[-120px] right-[-120px] w-[420px] h-[420px] bg-blue-500/10 blur-[140px] rounded-full"
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
          className="absolute bottom-[-140px] left-[-140px] w-[360px] h-[360px] bg-cyan-500/10 blur-[120px] rounded-full"
        />

      </div>

      {/* HERO */}
      <div className="relative z-10 mb-14">

        <div className="flex items-center gap-3 mb-6">

          <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[11px] tracking-[0.3em] uppercase">

            Predictive Intelligence Engine

          </div>

          <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-xs">

            AI Crime Forecasting System

          </div>

        </div>

        <h1 className="text-5xl xl:text-6xl font-bold leading-[1.02] tracking-tight max-w-5xl">

          Predictive Crime Intelligence

        </h1>

        <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

          AI-powered urban threat forecasting using
          geospatial intelligence, temporal analysis,
          and predictive hotspot modeling.

        </p>

      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8">

        {/* LEFT PANEL */}
        <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-8 overflow-hidden relative">

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.01]" />

          <div className="relative z-10">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-10">

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">

                <BrainCircuit className="text-blue-300" />

              </div>

              <div>

                <h2 className="text-2xl font-semibold">

                  Prediction Query

                </h2>

                <p className="text-slate-400 text-sm mt-1">

                  Spatial + temporal intelligence

                </p>

              </div>

            </div>

            {/* QUICK CHIPS */}
            <div className="flex flex-wrap gap-3 mb-10">

              {[
                "Whitefield",
                "KR Puram",
                "Electronic City",
                "Indiranagar",
                "Koramangala",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() =>
                    setLocation(item)
                  }
                  className="px-5 py-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-sm text-slate-300 hover:border-blue-400/20 hover:bg-blue-500/[0.05] transition-all duration-300"
                >

                  {item}

                </button>

              ))}

            </div>

            {/* LOCATION */}
            <div className="mb-7">

              <label className="text-sm text-slate-400 mb-3 block">

                Target Location

              </label>

              <div className="relative">

                <MapPinned className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />

                <input
                  type="text"
                  placeholder="Enter Bengaluru area..."
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/20 border border-white/[0.08] rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-blue-400/30 transition-all text-white placeholder:text-slate-500"
                />

              </div>

            </div>

            {/* TEMPORAL */}
            <div className="grid grid-cols-2 gap-5 mb-10">

              <div>

                <label className="text-sm text-slate-400 mb-3 block">

                  Hour

                </label>

                <div className="relative">

                  <Clock3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />

                  <input
                    type="number"
                    min="0"
                    max="23"
                    placeholder="Current"
                    value={hour}
                    onChange={(e) =>
                      setHour(
                        e.target.value
                      )
                    }
                    className="w-full bg-black/20 border border-white/[0.08] rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-blue-400/30 transition-all text-white placeholder:text-slate-500"
                  />

                </div>

              </div>

              <div>

                <label className="text-sm text-slate-400 mb-3 block">

                  Month

                </label>

                <div className="relative">

                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" />

                  <input
                    type="number"
                    min="1"
                    max="12"
                    placeholder="Current"
                    value={month}
                    onChange={(e) =>
                      setMonth(
                        e.target.value
                      )
                    }
                    className="w-full bg-black/20 border border-white/[0.08] rounded-2xl pl-12 pr-5 py-4 outline-none focus:border-blue-400/30 transition-all text-white placeholder:text-slate-500"
                  />

                </div>

              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={
                handlePrediction
              }
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition-all duration-300 font-medium shadow-2xl shadow-blue-500/20"
            >

              {loading
                ? "Running Intelligence..."
                : "Run AI Prediction"}

            </button>

            {/* ERROR */}
            {error && (

              <div className="mt-5 bg-red-500/10 border border-red-400/20 rounded-2xl p-4 text-red-300 text-sm">

                {error}

              </div>

            )}

            {/* SCAN */}
            <AnimatePresence>

              {loading && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="mt-8 rounded-2xl border border-white/[0.06] bg-black/20 p-5"
                >

                  <div className="flex items-center gap-3 mb-5">

                    <ScanSearch className="text-blue-300 w-5 h-5 animate-pulse" />

                    <h3 className="font-medium">

                      Intelligence Scan

                    </h3>

                  </div>

                  <div className="space-y-4">

                    {scanSteps.map(
                      (
                        step,
                        index
                      ) => (

                        <motion.div
                          key={step}
                          animate={{
                            opacity:
                              index <=
                              scanIndex
                                ? 1
                                : 0.25,
                          }}
                          className="flex items-center gap-3 text-sm"
                        >

                          <div
                            className={`w-2 h-2 rounded-full ${
                              index <=
                              scanIndex
                                ? "bg-blue-400"
                                : "bg-white/10"
                            }`}
                          />

                          <span className="text-slate-300">

                            {step}

                          </span>

                        </motion.div>

                      )
                    )}

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-8">

          {/* THREAT PANEL */}
          <div className="rounded-[36px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-10 overflow-hidden relative">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.01]" />

            <div className="absolute top-[-100px] right-[5%] w-[260px] h-[260px] bg-blue-500/10 blur-[120px] rounded-full" />

            <div className="relative z-10 flex flex-col xl:flex-row gap-12 items-center justify-between">

              {/* THREAT RING */}
              <div className="relative flex items-center justify-center">

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-[260px] h-[260px] rounded-full border border-dashed border-blue-400/[0.12]"
                />

                <div className="relative w-[180px] h-[180px] rounded-full border border-white/[0.08] bg-black/20 backdrop-blur-2xl flex flex-col items-center justify-center shadow-[0_0_80px_rgba(59,130,246,0.12)]">

                  <ShieldAlert className="w-8 h-8 text-blue-300 mb-3" />

                  <h1 className={`text-5xl font-bold ${riskColor}`}>

                    {prediction
                      ? `${prediction.confidence}%`
                      : "--"}

                  </h1>

                  <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mt-2">

                    Threat Score

                  </p>

                </div>

              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex items-center gap-4 mb-7">

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">

                    <Radar className="text-blue-300" />

                  </div>

                  <div>

                    <h2 className="text-3xl font-semibold">

                      Threat Intelligence

                    </h2>

                    <p className="text-slate-400 mt-1">

                      Neural inference prediction output

                    </p>

                  </div>

                </div>

                {prediction ? (

                  <div>

                    <h1 className="text-6xl leading-none font-bold tracking-tight">

                      {prediction.crime}

                    </h1>

                    <div className="flex flex-wrap gap-4 mt-8">

                      <div className="px-6 py-4 rounded-2xl bg-blue-500/[0.06] border border-blue-400/10">

                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-2">

                          Risk Level

                        </p>

                        <p className={`text-2xl font-semibold ${riskColor}`}>

                          {prediction.risk}

                        </p>

                      </div>

                      <div className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">

                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 mb-2">

                          Confidence

                        </p>

                        <p className="text-2xl font-semibold text-blue-300">

                          {prediction.confidence}%

                        </p>

                      </div>

                    </div>

                  </div>

                ) : (

                  <div className="text-slate-400 leading-relaxed max-w-2xl text-lg">

                    Run AI prediction to generate
                    geospatial threat forecasting and
                    predictive urban intelligence analysis.

                  </div>

                )}

              </div>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* SPATIAL */}
            <div className="rounded-[30px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-6">

              <div className="flex items-center gap-3 mb-6">

                <MapPinned className="text-blue-300" />

                <h3 className="text-lg font-semibold">

                  Spatial Metadata

                </h3>

              </div>

              <div className="space-y-5">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">

                    Resolved Location

                  </p>

                  <p className="text-sm leading-relaxed text-slate-300">

                    {resolvedLocation ||
                      "Awaiting location input"}

                  </p>

                </div>

                {prediction && (

                  <>
                    <div>

                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">

                        Latitude

                      </p>

                      <p className="text-cyan-300">

                        {prediction.latitude.toFixed(
                          5
                        )}

                      </p>

                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">

                        Longitude

                      </p>

                      <p className="text-cyan-300">

                        {prediction.longitude.toFixed(
                          5
                        )}

                      </p>

                    </div>
                  </>

                )}

              </div>

            </div>

            {/* AI STATUS */}
            <div className="rounded-[30px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-6">

              <div className="flex items-center gap-3 mb-6">

                <Activity className="text-blue-300" />

                <h3 className="text-lg font-semibold">

                  AI Status

                </h3>

              </div>

              <div className="space-y-5">

                {[
                  "Neural engine online",
                  "GIS layer synchronized",
                  "Threat indexing active",
                  "Temporal analysis calibrated",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />

                    <p className="text-sm text-slate-300">

                      {item}

                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* AI RECOMMENDATIONS */}
            <div className="rounded-[30px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-xl font-semibold">

                    AI Recommendations

                  </h2>

                  <p className="text-slate-400 mt-2 text-sm">

                    Predictive operational guidance

                  </p>

                </div>

                <AlertTriangle className="text-blue-300" />

              </div>

              <div className="space-y-4">

                {aiRecommendations.map(
                  (item) => (

                    <motion.div
                      whileHover={{
                        x: 4,
                      }}
                      key={item}
                      className="bg-black/20 border border-white/[0.06] rounded-2xl p-4 hover:border-blue-400/20 transition-all duration-300"
                    >

                      <div className="flex gap-3">

                        <ChevronRight className="text-blue-300 w-5 h-5 mt-0.5" />

                        <p className="leading-relaxed text-sm text-slate-300">

                          {item}

                        </p>

                      </div>

                    </motion.div>

                  )
                )}

              </div>

            </div>

          </div>

          {/* TIMELINE */}
          <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-7 overflow-hidden relative">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] to-cyan-500/[0.01]" />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-semibold">

                    24-Hour Threat Projection

                  </h2>

                  <p className="text-slate-400 mt-2">

                    AI projected hotspot intensity timeline

                  </p>

                </div>

                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />

              </div>

              <div className="h-[380px]">

                <ResponsiveContainer width="100%" height="100%">

                  <AreaChart data={predictionData}>

                    <defs>

                      <linearGradient
                        id="threatGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="0%"
                          stopColor="#3b82f6"
                          stopOpacity={0.35}
                        />

                        <stop
                          offset="100%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />

                      </linearGradient>

                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.04)"
                    />

                    <XAxis
                      dataKey="hour"
                      stroke="#64748b"
                    />

                    <YAxis
                      stroke="#64748b"
                    />

                    <Tooltip
                      contentStyle={{
                        background:
                          "#08111f",
                        border:
                          "1px solid rgba(255,255,255,0.08)",
                        borderRadius:
                          "18px",
                        color: "white",
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="risk"
                      stroke="#3b82f6"
                      fill="url(#threatGradient)"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="#7dd3fc"
                      strokeWidth={2}
                      dot={{
                        r: 4,
                        fill: "#7dd3fc",
                      }}
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default PredictionPage