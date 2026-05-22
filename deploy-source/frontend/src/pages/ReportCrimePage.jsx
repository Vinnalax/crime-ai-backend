import { useState } from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  ShieldAlert,
  MapPinned,
  Radar,
  Clock3,
  CalendarDays,
  CheckCircle2,
  Activity,
  ScanSearch,
  Sparkles,
  FileWarning,
} from "lucide-react"

import {
  reportCrime,
} from "../api/crimeApi"

const areaAliases = {
  "kr puram": "K.R. Puram Bengaluru",
  "whitefield": "Whitefield Bengaluru",
  "electronic city": "Electronic City Bengaluru",
  "koramangala": "Koramangala Bengaluru",
  "indiranagar": "Indiranagar Bengaluru",
  "hsr": "HSR Layout Bengaluru",
  "btm": "BTM Layout Bengaluru",
  "hebbal": "Hebbal Bengaluru",
  "marathahalli": "Marathahalli Bengaluru",
  "jayanagar": "Jayanagar Bengaluru",
  "malleshwaram": "Malleshwaram Bengaluru",
}

const scanSteps = [
  "Resolving geospatial coordinates...",
  "Validating Bengaluru intelligence grid...",
  "Indexing spatial reference vectors...",
  "Synchronizing GIS intelligence layer...",
]

function ReportCrimePage() {

  const [crime, setCrime] =
    useState("")

  const [location, setLocation] =
    useState("")

  const [hour, setHour] =
    useState("")

  const [month, setMonth] =
    useState("")

  const [resolvedLocation, setResolvedLocation] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [scanIndex, setScanIndex] =
    useState(0)

  const [submitted, setSubmitted] =
    useState(false)

  /*
  ==========================================
  GEO VERIFY
  ==========================================
  */

  const handleVerifyLocation =
    async () => {

      if (!location) return

      try {

        setLoading(true)

        setResolvedLocation(null)

        setSubmitted(false)

        let index = 0

        const interval =
          setInterval(() => {

            index++

            setScanIndex(index)

            if (
              index >=
              scanSteps.length - 1
            ) {
              clearInterval(interval)
            }

          }, 600)

        /*
        ==========================================
        NORMALIZATION
        ==========================================
        */

        const normalizedLocation =
          areaAliases[
            location
              .trim()
              .toLowerCase()
          ] ||
          `${location}, Bengaluru`

        /*
        ==========================================
        GEOCODING
        ==========================================
        */

        const response =
          await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              normalizedLocation
            )}&format=json&limit=1`
          )

        const data =
          await response.json()

        if (!data.length) return

        setResolvedLocation({
          display:
            data[0]
              .display_name,

          latitude:
            parseFloat(
              data[0].lat
            ),

          longitude:
            parseFloat(
              data[0].lon
            ),
        })

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)

      }
    }

  /*
  ==========================================
  SUBMIT REPORT
  ==========================================
  */

  const handleSubmit =
    async () => {

      if (
        !crime ||
        !resolvedLocation
      ) return

      try {

        setLoading(true)

        const payload = {

          crime_type:
            crime,

          latitude:
            resolvedLocation.latitude,

          longitude:
            resolvedLocation.longitude,
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
          await reportCrime(
            payload
          )

        setSubmitted(true)

      } catch (error) {

        console.error(
          "REPORT ERROR:",
          error
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
            duration: 16,
            repeat: Infinity,
          }}
          className="absolute top-[-140px] right-[-120px] w-[420px] h-[420px] bg-blue-500/10 blur-[140px] rounded-full"
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
          className="absolute bottom-[-140px] left-[-120px] w-[360px] h-[360px] bg-cyan-500/10 blur-[120px] rounded-full"
        />

      </div>

      {/* HERO */}
      <div className="relative z-10 mb-14">

        <div className="flex items-center gap-3 mb-6">

          <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[11px] tracking-[0.3em] uppercase">

            Incident Intelligence Input

          </div>

          <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-slate-400 text-xs">

            Geospatial Verification System

          </div>

        </div>

        <h1 className="text-5xl xl:text-6xl font-bold leading-[1.02] tracking-tight max-w-5xl">

          Urban Crime Intelligence Reporting

        </h1>

        <p className="text-slate-400 text-lg mt-6 max-w-3xl leading-relaxed">

          Submit verified urban incident intelligence
          into the Bengaluru crime intelligence system.

        </p>

      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">

        {/* LEFT PANEL */}
        <div className="relative overflow-hidden rounded-[36px] border border-slate-200/70 dark:border-white/[0.08] bg-white/85 dark:bg-card/70 backdrop-blur-2xl p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-none">

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-cyan-500/[0.02] to-transparent dark:from-blue-500/[0.03] dark:to-cyan-500/[0.01]" />

          <div className="relative z-10">

            {/* HEADER */}
            <div className="flex items-center gap-5 mb-10">

              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500/15 to-cyan-400/10 border border-blue-400/20 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.15)]">

                <ShieldAlert
                  className="text-blue-500 dark:text-blue-300"
                  size={28}
                />

              </div>

              <div>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">

                  Incident Query

                </h2>

                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">

                  Spatial intelligence submission

                </p>

              </div>

            </div>

            {/* CRIME */}
            <div className="mb-8">

              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 block">

                Witnessed Crime

              </label>

              <input
                type="text"
                placeholder="Enter crime type..."
                value={crime}
                onChange={(e) =>
                  setCrime(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-white dark:bg-black/20
                  border border-slate-200 dark:border-white/[0.08]
                  rounded-2xl
                  px-5 py-4
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

            {/* LOCATION */}
            <div className="mb-8">

              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 block">

                Incident Location

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
                  "
                />

              </div>

            </div>

            {/* TEMPORAL */}
            <div className="grid grid-cols-2 gap-5 mb-10">

              <div>

                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 block">

                  Hour of Day

                </label>

                <div className="relative">

                  <Clock3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 dark:text-blue-300" />

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
                    "
                  />

                </div>

              </div>

              <div>

                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 block">

                  Month

                </label>

                <div className="relative">

                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 dark:text-blue-300" />

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
                    "
                  />

                </div>

              </div>

            </div>

            {/* VERIFY */}
            <button
              onClick={
                handleVerifyLocation
              }
              className="
                w-full py-4 rounded-2xl
                bg-gradient-to-r
                from-blue-600
                via-blue-500
                to-cyan-500
                hover:scale-[1.01]
                transition-all duration-300
                font-medium
                shadow-[0_10px_40px_rgba(59,130,246,0.3)]
                text-white
                mb-4
              "
            >

              {loading
                ? "Running Geospatial Scan..."
                : "Verify Intelligence Input"}

            </button>

            {/* SUBMIT */}
            <button
              onClick={
                handleSubmit
              }
              className="
                w-full py-4 rounded-2xl
                border border-slate-200
                dark:border-white/[0.08]
                bg-white dark:bg-white/[0.03]
                hover:bg-blue-500/[0.05]
                transition-all duration-300
                font-medium
                shadow-sm
                text-slate-700 dark:text-white
              "
            >

              Submit Crime Report

            </button>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {/* AI STATUS */}
          <div className="rounded-[36px] border border-slate-200/70 dark:border-white/[0.08] bg-white/85 dark:bg-card/70 backdrop-blur-2xl p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:shadow-none overflow-hidden relative">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.01]" />

            <div className="relative z-10">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">

                  <Radar className="text-blue-500 dark:text-blue-300" />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">

                    AI Status

                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">

                    Intelligence system synchronization

                  </p>

                </div>

              </div>

              <div className="space-y-5">

                {[
                  "GIS pipeline active",
                  "Spatial indexing synchronized",
                  "Coordinate verification stable",
                  "Neural intelligence engine online",
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

          </div>

          {submitted && (

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                rounded-[36px]
                border border-emerald-400/20
                bg-emerald-500/10
                backdrop-blur-2xl
                p-7
              "
            >

              <div className="flex items-center gap-4 mb-5">

                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">

                  <CheckCircle2 className="text-emerald-400" />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold text-white">

                    Report Submitted

                  </h2>

                  <p className="text-emerald-300 text-sm mt-1">

                    Intelligence successfully synced to backend

                  </p>

                </div>

              </div>

              <div className="space-y-3 text-sm text-slate-300">

                <p>

                  Crime:
                  {" "}
                  <span className="text-white font-medium">

                    {crime}

                  </span>

                </p>

                <p>

                  Location:
                  {" "}
                  <span className="text-white font-medium">

                    {resolvedLocation?.display}

                  </span>

                </p>

              </div>

            </motion.div>

          )}

        </div>

      </div>

    </div>
  )
}

export default ReportCrimePage