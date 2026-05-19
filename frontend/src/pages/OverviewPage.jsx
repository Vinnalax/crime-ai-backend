import {
  motion,
} from "framer-motion"

import {
  Activity,
  Radar,
  ShieldAlert,
} from "lucide-react"

import {
  MapContainer,
  TileLayer,
  CircleMarker,
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

import KpiCard from "../components/KpiCard"

const hotspotZones = [
  {
    zone: "K.R. Puram",
    risk: 96,
  },
  {
    zone: "Byatarayanapura",
    risk: 92,
  },
  {
    zone: "Subramanyapura",
    risk: 88,
  },
  {
    zone: "Peenya",
    risk: 84,
  },
  {
    zone: "Varthur",
    risk: 79,
  },
]

const liveFeed = [
  "Neural hotspot clustering synchronized",
  "Temporal anomaly spike detected in Whitefield",
  "Spatial intelligence grid recalibrated",
  "Live predictive inference engine active",
]

const hotspots = [
  {
    lat: 12.9716,
    lng: 77.5946,
    intensity: 1,
  },
  {
    lat: 12.9352,
    lng: 77.6245,
    intensity: 0.8,
  },
  {
    lat: 13.0098,
    lng: 77.5511,
    intensity: 0.7,
  },
  {
    lat: 12.926,
    lng: 77.6762,
    intensity: 0.9,
  },
  {
    lat: 13.0358,
    lng: 77.597,
    intensity: 0.6,
  },
]

function OverviewPage() {

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
            duration: 14,
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
          className="absolute bottom-[-180px] right-[-120px] w-[360px] h-[360px] bg-cyan-500/10 blur-[120px] rounded-full"
        />

      </div>

      {/* HERO */}
      <section className="relative mb-16 pt-8">

        <div className="relative z-10">

          {/* BADGES */}
          <div className="flex flex-wrap items-center gap-3 mb-5">

            <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[11px] tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.15)]">

              Bengaluru Urban Intelligence

            </div>

            <div className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 text-xs">

              AI-Powered GIS Platform

            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs">

              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              Live Intelligence Active

            </div>

          </div>

          {/* TITLE */}
          <h1 className="text-6xl xl:text-7xl font-bold leading-[1.02] tracking-tight max-w-6xl">

            Bengaluru Crime Heatmap &
            Geospatial Intelligence Platform

          </h1>

          {/* DESCRIPTION */}
          <p className="text-slate-400 text-xl mt-7 max-w-3xl leading-relaxed">

            AI-powered geospatial crime intelligence
            system designed for hotspot analysis,
            spatial risk visualization, and predictive
            urban safety analytics.

          </p>

          {/* LIVE STRIP */}
          <div className="mt-10 flex flex-wrap gap-4">

            {[
              "Neural Engine Active",
              "GIS Layer Synced",
              "Live Prediction Pipeline",
              "11 Active Hotspots",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl"
              >

                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

                <span className="text-sm text-slate-300">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* KPI */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">

        {[
          {
            title: "Total FIR Records",
            value: "181K+",
            subtitle: "Validated Bengaluru FIR dataset",
          },
          {
            title: "Active Hotspots",
            value: "11",
            subtitle: "DBSCAN hotspot clusters detected",
          },
          {
            title: "Geo Coordinates",
            value: "143K+",
            subtitle: "GIS validated spatial points",
          },
          {
            title: "Top Crime Type",
            value: "THEFT",
            subtitle: "Most frequent Bengaluru crime category",
          },
        ].map((item) => (

          <motion.div
            key={item.title}
            whileHover={{
              y: -4,
              scale: 1.01,
            }}
            transition={{
              duration: 0.2,
            }}
          >

            <KpiCard
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
            />

          </motion.div>

        ))}

      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.8fr] gap-6">

        {/* LEFT PANEL */}
        <div className="relative bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6 overflow-hidden">

          {/* AMBIENT */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-cyan-500/[0.01]" />

          {/* HEADER */}
          <div className="relative z-10 flex items-center justify-between mb-6">

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[10px] tracking-[0.3em] uppercase">

                  Live GIS Grid

                </div>

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              </div>

              <h2 className="text-3xl font-semibold">

                Bengaluru Crime Intelligence

              </h2>

              <p className="text-slate-400 mt-3">

                Real-time geospatial hotspot monitoring
                powered by AI-driven urban intelligence.

              </p>

            </div>

            <Radar className="text-cyan-300 w-7 h-7" />

          </div>

          {/* MAP */}
          <div className="relative h-[500px] rounded-[28px] overflow-hidden border border-white/[0.04]">

            {/* MAP GLOW */}
            <div className="absolute inset-0 z-[400] pointer-events-none bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)]" />

            {/* TOP FADE */}
            <div className="absolute inset-x-0 top-0 h-32 z-[500] pointer-events-none bg-gradient-to-b from-[#020617] to-transparent" />

            {/* BOTTOM OVERLAY */}
            <div className="absolute bottom-0 left-0 right-0 z-[500] p-6 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 mb-2">

                    Spatial Intelligence

                  </p>

                  <h3 className="text-2xl font-semibold">

                    Live Hotspot Visualization

                  </h3>

                  <p className="text-slate-400 mt-2 text-sm">

                    Real-time Bengaluru crime density
                    and hotspot clustering analysis.

                  </p>

                </div>

                <div className="hidden md:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-xl">

                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                  <span className="text-sm text-slate-300">

                    Live Intelligence Feed

                  </span>

                </div>

              </div>

            </div>

            {/* LEAFLET */}
            <MapContainer
              center={[12.9716, 77.5946]}
              zoom={11}
              scrollWheelZoom={false}
              zoomControl={false}
              attributionControl={false}
              className="h-full w-full z-0"
            >

              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {hotspots.map(
                (
                  hotspot,
                  index
                ) => (

                  <CircleMarker
                    key={index}
                    center={[
                      hotspot.lat,
                      hotspot.lng,
                    ]}
                    radius={
                      hotspot.intensity * 28
                    }
                    pathOptions={{
                      color:
                        "rgba(255,100,100,0.15)",
                      fillColor:
                        "#ff4d4d",
                      fillOpacity: 0.4,
                      weight: 0,
                    }}
                  />

                )
              )}

              {hotspots.map(
                (
                  hotspot,
                  index
                ) => (

                  <CircleMarker
                    key={`core-${index}`}
                    center={[
                      hotspot.lat,
                      hotspot.lng,
                    ]}
                    radius={6}
                    pathOptions={{
                      color: "#ff6b6b",
                      fillColor:
                        "#ff6b6b",
                      fillOpacity: 1,
                      weight: 0,
                    }}
                  />

                )
              )}

            </MapContainer>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* HOTSPOTS */}
          <div className="bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6 overflow-hidden relative">

            <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.03] to-transparent" />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-semibold">

                    Top Hotspot Zones

                  </h2>

                  <p className="text-slate-400 mt-2">

                    AI-prioritized spatial risk zones

                  </p>

                </div>

                <ShieldAlert className="text-red-300" />

              </div>

              <div className="space-y-5">

                {hotspotZones.map(
                  (zone) => (

                    <motion.div
                      whileHover={{
                        x: 4,
                      }}
                      key={zone.zone}
                      className="bg-background/60 border border-white/[0.04] rounded-2xl p-4"
                    >

                      <div className="flex items-center justify-between mb-4">

                        <div className="flex items-center gap-3">

                          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />

                          <span className="font-medium">

                            {zone.zone}

                          </span>

                        </div>

                        <span className="text-red-400 text-sm">

                          {zone.risk}%

                        </span>

                      </div>

                      <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">

                        <motion.div
                          initial={{
                            width: 0,
                          }}
                          animate={{
                            width: `${zone.risk}%`,
                          }}
                          transition={{
                            duration: 1,
                          }}
                          className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                        />

                      </div>

                    </motion.div>

                  )
                )}

              </div>

            </div>

          </div>

          {/* LIVE FEED */}
          <div className="bg-card/70 backdrop-blur-2xl border border-white/[0.06] rounded-[32px] p-6 overflow-hidden relative">

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] to-blue-500/[0.01]" />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-2xl font-semibold">

                    Intelligence Activity

                  </h2>

                  <p className="text-slate-400 mt-2 text-sm">

                    Live neural monitoring events

                  </p>

                </div>

                <Activity className="text-cyan-300" />

              </div>

              <div className="space-y-4">

                {liveFeed.map(
                  (item) => (

                    <motion.div
                      whileHover={{
                        x: 3,
                      }}
                      key={item}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-background/50 border border-white/[0.04]"
                    >

                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 animate-pulse" />

                      <div>

                        <p className="text-sm leading-relaxed text-slate-300">

                          {item}

                        </p>

                      </div>

                    </motion.div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default OverviewPage