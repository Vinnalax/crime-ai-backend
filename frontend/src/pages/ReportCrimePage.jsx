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
    () => {

      if (
        !crime ||
        !resolvedLocation
      ) return

      setSubmitted(true)

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
        <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-8 overflow-hidden relative">

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.01]" />

          <div className="relative z-10">

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-10">

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">

                <ShieldAlert className="text-blue-300" />

              </div>

              <div>

                <h2 className="text-2xl font-semibold">

                  Incident Query

                </h2>

                <p className="text-slate-400 text-sm mt-1">

                  Spatial intelligence submission

                </p>

              </div>

            </div>

            {/* CRIME INPUT */}
            <div className="mb-7">

              <label className="text-sm text-slate-400 mb-3 block">

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
                className="w-full bg-black/20 border border-white/[0.08] rounded-2xl px-5 py-4 outline-none focus:border-blue-400/30 transition-all text-white placeholder:text-slate-500"
              />

            </div>

            {/* LOCATION */}
            <div className="mb-7">

              <label className="text-sm text-slate-400 mb-3 block">

                Incident Location

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

                  Hour of Day

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

            {/* VERIFY BUTTON */}
            <button
              onClick={
                handleVerifyLocation
              }
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 transition-all duration-300 font-medium shadow-2xl shadow-blue-500/20 mb-4"
            >

              {loading
                ? "Running Geospatial Scan..."
                : "Verify Intelligence Input"}

            </button>

            {/* SUBMIT BUTTON */}
            <button
              onClick={
                handleSubmit
              }
              className="w-full py-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300 font-medium"
            >

              Submit Crime Report

            </button>

            {/* SUCCESS */}
            <AnimatePresence>

              {submitted && (

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
                  className="mt-6 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 p-5 flex items-center gap-4"
                >

                  <CheckCircle2 className="text-emerald-400 w-6 h-6" />

                  <div>

                    <h3 className="font-medium text-emerald-300">

                      Crime Added To Intelligence Database

                    </h3>

                    <p className="text-sm text-emerald-400/80 mt-1">

                      Incident successfully indexed into
                      Bengaluru urban intelligence system.

                    </p>

                  </div>

                </motion.div>

              )}

            </AnimatePresence>

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

        {/* RIGHT PANEL */}
        <div className="space-y-6">

          {/* AI STATUS */}
          <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-7 overflow-hidden relative">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.01]" />

            <div className="relative z-10">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">

                  <Radar className="text-blue-300" />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold">

                    AI Status

                  </h2>

                  <p className="text-slate-400 mt-1 text-sm">

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

                    <p className="text-sm text-slate-300">

                      {item}

                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* SPATIAL VERIFICATION */}
          <div className="rounded-[32px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-7 overflow-hidden relative">

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-blue-500/[0.01]" />

            <div className="relative z-10">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">

                  <Activity className="text-cyan-300" />

                </div>

                <div>

                  <h2 className="text-2xl font-semibold">

                    Spatial Verification

                  </h2>

                  <p className="text-slate-400 mt-1 text-sm">

                    GIS intelligence validation

                  </p>

                </div>

              </div>

              <AnimatePresence mode="wait">

                {resolvedLocation ? (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="space-y-6"
                  >

                    <div>

                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">

                        Verified Location

                      </p>

                      <p className="leading-relaxed text-slate-300">

                        {resolvedLocation.display}

                      </p>

                    </div>

                    <div className="grid grid-cols-2 gap-5">

                      <div>

                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">

                          Latitude

                        </p>

                        <p className="text-cyan-300">

                          {resolvedLocation.latitude.toFixed(
                            5
                          )}

                        </p>

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">

                          Longitude

                        </p>

                        <p className="text-cyan-300">

                          {resolvedLocation.longitude.toFixed(
                            5
                          )}

                        </p>

                      </div>

                    </div>

                  </motion.div>

                ) : (

                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    className="rounded-2xl border border-dashed border-white/[0.08] p-10 text-center"
                  >

                    <FileWarning className="w-12 h-12 text-blue-300 mx-auto mb-5" />

                    <h3 className="text-lg font-medium mb-2">

                      Awaiting Verification

                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed">

                      Enter a Bengaluru location to validate
                      geospatial intelligence coordinates.

                    </p>

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default ReportCrimePage