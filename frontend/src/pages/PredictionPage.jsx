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
  ScanSearch,
  ChevronRight,
  Clock3,
  CalendarDays,
  AlertTriangle,
  BrainCircuit,
} from "lucide-react"

import { predictCrime } from "../api/crimeApi"

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
        return "text-blue-400"

      if (
        prediction.risk
          ?.toLowerCase() === "high"
      )
        return "text-red-400"

      if (
        prediction.risk
          ?.toLowerCase() === "medium"
      )
        return "text-amber-400"

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

        const data =
          await predictCrime(payload)
        
        console.log(
          "PREDICTION:",
            data
        )

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

        console.error(
          "PREDICTION ERROR:",
          error
        )

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

        <div className="flex flex-wrap items-center gap-3 mb-6">

          <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 dark:text-blue-300 text-[11px] tracking-[0.3em] uppercase">

            Predictive Intelligence Engine

          </div>

          <div className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-slate-600 dark:text-slate-400 text-xs backdrop-blur-xl">

            AI Crime Forecasting System

          </div>

        </div>

        <h1 className="text-5xl xl:text-6xl font-bold leading-[1.02] tracking-tight max-w-5xl text-slate-900 dark:text-white">

          Predictive Crime Intelligence

        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-xl mt-6 max-w-3xl leading-relaxed">

          AI-powered urban threat forecasting using
          geospatial intelligence, temporal analysis,
          and predictive hotspot modeling.

        </p>

      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8">

        {/* LEFT PANEL */}
        <div className="relative overflow-hidden rounded-[36px] border border-slate-200/70 dark:border-white/[0.08] bg-white/85 dark:bg-card/70 backdrop-blur-2xl p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-none">

          {/* PREMIUM BACKGROUND */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-cyan-500/[0.02] to-transparent dark:from-blue-500/[0.03] dark:to-cyan-500/[0.01]" />

          <div className="relative z-10">

            {/* HEADER */}
            <div className="flex items-center gap-5 mb-10">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500/15 to-cyan-400/10 border border-blue-400/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.15)]">

                <BrainCircuit
                  className="text-blue-500 dark:text-blue-300"
                  size={28}
                />

              </div>

              <div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">

                  Prediction Query

                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">

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
                    className="
                      px-5 py-3 rounded-2xl
                      border border-slate-200 dark:border-white/[0.08]
                      bg-white dark:bg-white/[0.03]
                      text-sm font-medium
                      text-slate-700 dark:text-slate-300
                      shadow-sm
                      hover:border-blue-400/30
                      hover:bg-blue-500/[0.06]
                      hover:-translate-y-0.5
                      transition-all duration-300
                      backdrop-blur-xl
                    "
                    >

                      {item}

                    </button>

                ))}

            </div>

            {/* LOCATION */}
            <div className="mb-8">

              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 block">

                Target Location

              </label>

              <div className="relative">

                <MapPinned className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 dark:text-blue-300" />

                <input
                  type="text"
                  placeholder="Enter Bengaluru area..."
                  value={location}
                  onChange={(e) =>
                    setLocation(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    bg-white dark:bg-black/20
                    border border-slate-200 dark:border-white/[0.08]
                    rounded-2xl
                    pl-12 pr-5 py-4
                    outline-none
                    shadow-inner
                    focus:border-blue-400/40
                    focus:ring-4
                    focus:ring-blue-500/10
                    transition-all
                    text-slate-900 dark:text-white
                    placeholder:text-slate-400
                    backdrop-blur-xl
                  "
                />

              </div>

            </div>

            {/* TIME INPUTS */}
            <div className="grid grid-cols-2 gap-4 mb-8">

              {/* HOUR */}
              <div>

                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 block">

                  Hour

                </label>

                <div className="relative">

                  <Clock3 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 dark:text-blue-300" />

                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hour}
                    onChange={(e) =>
                      setHour(e.target.value)
                    }
                    placeholder="Current"
                    className="
                      w-full
                      bg-white dark:bg-black/20
                      border border-slate-200 dark:border-white/[0.08]
                      rounded-2xl
                      pl-11 pr-4 py-4
                      outline-none
                      shadow-inner
                      focus:border-blue-400/40
                      focus:ring-4
                      focus:ring-blue-500/10
                      transition-all
                      text-slate-900 dark:text-white
                      placeholder:text-slate-400
                    "
                  />

                </div>

              </div>

              {/* MONTH */}
              <div>

                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 block">

                  Month

                </label>

                <div className="relative">

                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500 dark:text-blue-300" />

                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={month}
                    onChange={(e) =>
                      setMonth(e.target.value)
                    }
                    placeholder="Current"
                    className="
                      w-full
                      bg-white dark:bg-black/20
                      border border-slate-200 dark:border-white/[0.08]
                      rounded-2xl
                      pl-11 pr-4 py-4
                      outline-none
                      shadow-inner
                      focus:border-blue-400/40
                      focus:ring-4
                      focus:ring-blue-500/10
                      transition-all
                      text-slate-900 dark:text-white
                      placeholder:text-slate-400
                    "
                  />

                </div>

              </div>

            </div>

            {/* RUN BUTTON */}
            <motion.button
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={handlePrediction}
              disabled={loading}
              className="
                relative overflow-hidden
                w-full rounded-2xl
                py-4 px-6
                font-semibold
                text-white
                bg-gradient-to-r
                from-blue-600
                via-blue-500
                to-cyan-500
                shadow-[0_10px_35px_rgba(59,130,246,0.35)]
                hover:shadow-[0_15px_45px_rgba(59,130,246,0.45)]
                transition-all duration-300
                disabled:opacity-60
              "
            >

              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />

              <div className="relative flex items-center justify-center gap-3">

                <ScanSearch size={20} />

                <span>

                  {loading
                    ? "Running AI Analysis..."
                    : "Run AI Prediction"}

                </span>

              </div>

            </motion.button>

            {/* ERROR */}
            {error && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mt-6 rounded-2xl
                  border border-red-400/20
                  bg-red-500/10
                  p-4
                  flex items-start gap-3
                "
              >

                <AlertTriangle
                  className="text-red-400 mt-0.5"
                  size={18}
                />

                <p className="text-red-500 dark:text-red-300 text-sm">

                  {error}

                </p>

              </motion.div>

            )}

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-8">

          {/* THREAT PANEL */}
          <div className="relative overflow-hidden rounded-[36px] border border-slate-200/70 dark:border-white/[0.08] bg-white/85 dark:bg-card/70 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-none">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] to-cyan-500/[0.015] dark:from-blue-500/[0.03] dark:to-cyan-500/[0.01]" />

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

                <div className="relative w-[180px] h-[180px] rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] shadow-[0_0_50px_rgba(59,130,246,0.25)]">

                  <div className="w-full h-full rounded-full bg-white dark:bg-[#081120] flex flex-col items-center justify-center">

                    <ShieldAlert className="w-8 h-8 text-blue-500 dark:text-blue-300 mb-3" />

                    <h1 className={`text-5xl font-bold ${riskColor}`}>

                      {prediction
                        ? `${prediction.confidence}%`
                        : "--"}

                    </h1>

                    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mt-2">

                      Threat Score

                    </p>

                  </div>

                </div>

              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex items-center gap-4 mb-7">

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">

                    <Radar className="text-blue-500 dark:text-blue-300" />

                  </div>

                  <div>

                    <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">

                      Threat Intelligence

                    </h2>

                    <p className="text-slate-500 dark:text-slate-400 mt-1">

                      Neural inference prediction output

                    </p>

                  </div>

                </div>

                {prediction ? (

                  <div>

                    <h1 className="text-6xl leading-none font-bold tracking-tight text-slate-900 dark:text-white">

                      {prediction.crime}

                    </h1>

                    <div className="flex flex-wrap gap-4 mt-8">

                      <div className="px-6 py-4 rounded-2xl bg-blue-500/[0.06] border border-blue-400/10">

                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2">

                          Risk Level

                        </p>

                        <p className={`text-2xl font-semibold ${riskColor}`}>

                          {prediction.risk}

                        </p>

                      </div>

                      <div className="px-6 py-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] shadow-sm">

                        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-2">

                          Confidence

                        </p>

                        <p className="text-2xl font-semibold text-blue-500 dark:text-blue-300">

                          {prediction.confidence}%

                        </p>

                      </div>

                    </div>

                  </div>

                ) : (

                  <div>

                    <div className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl text-lg">

                      Run AI prediction to generate
                      geospatial threat forecasting and
                      predictive urban intelligence analysis.

                    </div>

                    {/* METRICS */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

                      <div className="rounded-3xl border border-slate-200 dark:border-white/[0.06] bg-white/70 dark:bg-background/40 p-5 shadow-sm">

                        <p className="text-slate-500 dark:text-slate-400 text-sm">

                          AI Confidence

                        </p>

                        <h3 className="text-3xl font-bold mt-3 text-slate-900 dark:text-white">

                          94%

                        </h3>

                      </div>

                      <div className="rounded-3xl border border-slate-200 dark:border-white/[0.06] bg-white/70 dark:bg-background/40 p-5 shadow-sm">

                        <p className="text-slate-500 dark:text-slate-400 text-sm">

                          Risk Level

                        </p>

                        <h3 className="text-3xl font-bold mt-3 text-orange-500">

                          Moderate

                        </h3>

                      </div>

                      <div className="rounded-3xl border border-slate-200 dark:border-white/[0.06] bg-white/70 dark:bg-background/40 p-5 shadow-sm">

                        <p className="text-slate-500 dark:text-slate-400 text-sm">

                          Predicted Density

                        </p>

                        <h3 className="text-3xl font-bold mt-3 text-cyan-500">

                          71%

                        </h3>

                      </div>

                    </div>

                  </div>

                )}

              </div>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* SPATIAL */}
            <div className="rounded-[30px] border border-slate-200 dark:border-white/[0.08] bg-white/85 dark:bg-white/[0.03] backdrop-blur-2xl p-6 shadow-sm">

              <div className="flex items-center gap-3 mb-6">

                <MapPinned className="text-blue-500 dark:text-blue-300" />

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">

                  Spatial Metadata

                </h3>

              </div>

              <div className="space-y-5">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2">

                    Resolved Location

                  </p>

                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">

                    {resolvedLocation ||
                      "Awaiting location input"}

                  </p>

                </div>

                {prediction && (

                  <>
                    <div>

                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2">

                        Latitude

                      </p>

                      <p className="text-blue-500 dark:text-cyan-300">

                        {prediction.latitude.toFixed(
                          5
                        )}

                      </p>

                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-2">

                        Longitude

                      </p>

                      <p className="text-blue-500 dark:text-cyan-300">

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
            <div className="rounded-[30px] border border-slate-200 dark:border-white/[0.08] bg-white/85 dark:bg-white/[0.03] backdrop-blur-2xl p-6 shadow-sm">

              <div className="flex items-center gap-3 mb-6">

                <Activity className="text-blue-500 dark:text-blue-300" />

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">

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

                    <p className="text-sm text-slate-700 dark:text-slate-300">

                      {item}

                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* AI RECOMMENDATIONS */}
            <div className="rounded-[30px] border border-slate-200 dark:border-white/[0.08] bg-white/85 dark:bg-white/[0.03] backdrop-blur-2xl p-6 shadow-sm">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">

                    AI Recommendations

                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">

                    Predictive operational guidance

                  </p>

                </div>

                <AlertTriangle className="text-blue-500 dark:text-blue-300" />

              </div>

              <div className="space-y-4">

                {aiRecommendations.map(
                  (item) => (

                    <motion.div
                      whileHover={{
                        x: 4,
                      }}
                      key={item}
                      className="bg-white dark:bg-black/20 border border-slate-200 dark:border-white/[0.06] rounded-2xl p-4 hover:border-blue-400/20 transition-all duration-300 shadow-sm"
                    >

                      <div className="flex gap-3">

                        <ChevronRight className="text-blue-500 dark:text-blue-300 w-5 h-5 mt-0.5" />

                        <p className="leading-relaxed text-sm text-slate-700 dark:text-slate-300">

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
          <div className="relative overflow-hidden rounded-[36px] border border-slate-200/70 dark:border-white/[0.08] bg-white/90 dark:bg-[#071226] backdrop-blur-2xl p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-none">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.01]" />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">

                    24-Hour Threat Projection

                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 mt-2">

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
                      stroke="rgba(148,163,184,0.12)"
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