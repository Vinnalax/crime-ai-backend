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

import {
  useEffect,
  useState,
} from "react"

import {
  getHotspotAnalytics,
} from "../api/crimeApi"


const liveFeed = [
  "Neural hotspot clustering synchronized",
  "Temporal anomaly spike detected in Whitefield",
  "Spatial intelligence grid recalibrated",
  "Live predictive inference engine active",
]

function OverviewPage() {

  /*
  ==========================================
  HOTSPOT STATES
  ==========================================
  */

  const [hotspots, setHotspots] =
    useState([])

  const [hotspotZones, setHotspotZones] =
    useState([])

  /*
  ==========================================
  AREA MAPPING
  ==========================================
  */

  const knownAreas = [
    {
      name: "Whitefield",
      lat: 12.9698,
      lng: 77.7499,
    },

    {
      name: "KR Puram",
      lat: 13.0196,
      lng: 77.6953,
    },

    {
      name: "Hebbal",
      lat: 13.0358,
      lng: 77.5970,
    },

    {
      name: "Electronic City",
      lat: 12.8399,
      lng: 77.6770,
    },

    {
      name: "Yelahanka",
      lat: 13.1007,
      lng: 77.5963,
    },

    {
      name: "Peenya",
      lat: 13.0321,
      lng: 77.5273,
    },

    {
      name: "Indiranagar",
      lat: 12.9784,
      lng: 77.6408,
    },

    {
      name: "Koramangala",
      lat: 12.9352,
      lng: 77.6245,
    },

    {
      name: "Marathahalli",
      lat: 12.9591,
      lng: 77.6974,
    },

    {
      name: "HSR Layout",
      lat: 12.9116,
      lng: 77.6474,
    },

    {
      name: "BTM Layout",
      lat: 12.9166,
      lng: 77.6101,
    },
  ]

  /*
  ==========================================
  GET NEAREST AREA
  ==========================================
  */

  function getNearestArea(
    lat,
    lng
  ) {

    let nearest =
      knownAreas[0]

    let minDistance =
      Infinity

    knownAreas.forEach(
      (area) => {

        const distance =
          Math.sqrt(
            Math.pow(
              lat - area.lat,
              2
            ) +
            Math.pow(
              lng - area.lng,
              2
            )
          )

        if (
          distance <
          minDistance
        ) {
          minDistance =
            distance

          nearest = area
        }
      }
    )

    return nearest.name
  }

  /*
  ==========================================
  LOAD HOTSPOTS
  ==========================================
  */

  useEffect(() => {

    const loadHotspots =
      async () => {

        try {

          const response =
            await getHotspotAnalytics()

          const formatted =
            (
              response.hotspots ||
              []
            ).map((spot) => ({

              ...spot,

              location:
                getNearestArea(
                  spot.center_lat,
                  spot.center_lng
                ),

              lat:
                spot.center_lat,

              lng:
                spot.center_lng,

              intensity:
                Math.min(
                  1,
                  spot.crime_count /
                    30
                ),
            }))

          setHotspots(
            formatted
          )

          const mergedZones = {}

          const maxCrimeCount =
            Math.max(
              ...formatted.map(
                (spot) =>
                  spot.crime_count
              )
            )

          formatted.forEach((spot) => {

            const normalizedRisk =
              Math.round(

                55 +

                (
                  (
                    Math.log(
                      spot.crime_count + 1
                    ) /

                    Math.log(
                      maxCrimeCount + 1
                    )
                  ) * 35
                )
              )

            if (
              !mergedZones[
                spot.location
              ]
            ) {

              mergedZones[
                spot.location
              ] = {
                zone:
                  spot.location,

                risk:
                  normalizedRisk,
              }
            }

            mergedZones[
              spot.location
            ].risk = Math.max(
              mergedZones[
                spot.location
              ].risk,

              normalizedRisk
            )
          })

          setHotspotZones(

            Object.values(
              mergedZones
            )
              .sort(
                (a, b) =>
                  b.risk - a.risk
              )
              .slice(0, 5)
          )

        } catch (error) {

          console.error(
            "HOTSPOT ANALYTICS ERROR:",
            error
          )
        }
      }

    loadHotspots()

  }, [])

  console.log("MAP HOTSPOTS:", hotspots)

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

            <div className="px-5 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 dark:text-blue-300 text-[11px] tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.15)]">

              Bengaluru Urban Intelligence

            </div>

            <div className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.06] text-slate-600 dark:text-slate-400 text-xs backdrop-blur-xl">

              AI-Powered GIS Platform

            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-500 dark:text-emerald-300 text-xs">

              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              Live Intelligence Active

            </div>

          </div>

          {/* TITLE */}
          <h1 className="text-6xl xl:text-7xl font-bold leading-[1.02] tracking-tight max-w-6xl text-slate-900 dark:text-white">

            Bengaluru Crime Heatmap &
            Geospatial Intelligence Platform

          </h1>

          {/* DESCRIPTION */}
          <p className="text-slate-600 dark:text-slate-400 text-xl mt-7 max-w-3xl leading-relaxed">

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
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.45] dark:bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl"
              >

                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

                <span className="text-sm text-slate-700 dark:text-slate-300">

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

                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 dark:text-blue-300 text-[10px] tracking-[0.3em] uppercase">

                  Live GIS Grid

                </div>

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

              </div>

              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">

                Bengaluru Crime Intelligence

              </h2>

              <p className="text-slate-600 dark:text-slate-400 mt-3">

                Real-time geospatial hotspot monitoring
                powered by AI-driven urban intelligence.

              </p>

            </div>

            <Radar className="text-cyan-400 dark:text-cyan-300 w-7 h-7" />

          </div>

          {/* MAP */}
          <div className="relative h-[500px] rounded-[28px] overflow-hidden border border-white/[0.04]">

            {/* FLOATING INFO */}
            <div className="absolute bottom-6 left-6 right-6 z-[500] flex items-end justify-between pointer-events-none">

              <div className="max-w-xl">

                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300 mb-3 font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">

                  Spatial Intelligence

                </p>

                <h3 className="text-3xl font-bold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">

                  Live Hotspot Visualization

                </h3>

                <p className="text-slate-200 mt-3 text-sm leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">

                  Real-time Bengaluru crime density
                  and hotspot clustering analysis.

                </p>

              </div>

              <div className="hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">

                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                <span className="text-sm text-white">

                  Live Intelligence Feed

                </span>

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
                attribution='&copy; OpenStreetMap contributors & CartoDB'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />

              {hotspots.map(
                (
                  hotspot,
                  index
                ) => (

                  <CircleMarker
                    pane="markerPane"
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
                    pane="markerPane"
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

                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">

                    Top Hotspot Zones

                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 mt-2">

                    AI-prioritized spatial risk zones

                  </p>

                </div>

                <ShieldAlert className="text-red-400 dark:text-red-300" />

              </div>

              <div className="space-y-5">

                {hotspotZones.map(
                  (zone) => (

                    <motion.div
                      whileHover={{
                        x: 4,
                      }}
                      key={zone.zone}
                      className="bg-white/50 dark:bg-background/60 border border-white/[0.05] rounded-2xl p-4 backdrop-blur-xl"
                    >

                      <div className="flex items-center justify-between mb-4">

                        <div className="flex items-center gap-3">

                          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />

                          <span className="font-medium text-slate-900 dark:text-white">

                            {zone.zone}

                          </span>

                        </div>

                        <span className="text-red-400 text-sm">

                          {zone.risk}%

                        </span>

                      </div>

                      <div className="h-2 rounded-full bg-black/[0.04] dark:bg-white/[0.04] overflow-hidden">

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

                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">

                    Intelligence Activity

                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">

                    Live neural monitoring events

                  </p>

                </div>

                <Activity className="text-cyan-400 dark:text-cyan-300" />

              </div>

              <div className="space-y-4">

                {liveFeed.map(
                  (item) => (

                    <motion.div
                      whileHover={{
                        x: 3,
                      }}
                      key={item}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-white/50 dark:bg-background/50 border border-white/[0.05] backdrop-blur-xl"
                    >

                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 animate-pulse" />

                      <div>

                        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">

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