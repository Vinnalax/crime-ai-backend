import CrimeMap from "../components/CrimeMap"

function HeatmapPage() {
  return (
    <div>

      {/* PAGE HEADER */}
      <div className="relative mb-10">

        {/* AMBIENT GLOW */}
        <div className="absolute top-[-80px] left-0 w-[350px] h-[350px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">

          {/* BADGES */}
          <div className="flex items-center gap-3 mb-4">

            <div className="px-4 py-2 rounded-full bg-red-500/10 border border-red-400/20 text-red-300 text-xs tracking-[0.2em] uppercase shadow-glow">

              Geospatial Intelligence

            </div>

            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted text-xs">

              Real-Time Crime Density

            </div>

          </div>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            Bengaluru Crime Heatmap
          </h1>

          <p className="text-muted text-lg mt-4 max-w-3xl">
            Real-time spatial hotspot visualization and
            urban crime density analytics powered by
            AI-driven geospatial intelligence.
          </p>

        </div>

      </div>

      {/* FILTER BAR */}
      <div className="bg-card/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-wrap gap-4 items-center mb-8 shadow-[0_0_40px_rgba(255,255,255,0.03)]">

        <select className="bg-background border border-white/10 rounded-xl px-4 py-3 text-sm outline-none hover:border-accent/30 transition-all">

          <option>All Crime Types</option>
          <option>Theft</option>
          <option>Cyber Crime</option>
          <option>Robbery</option>

        </select>

        <select className="bg-background border border-white/10 rounded-xl px-4 py-3 text-sm outline-none hover:border-accent/30 transition-all">

          <option>All Years</option>
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>

        </select>

        <button className="bg-accent hover:bg-accent/90 hover:scale-105 transition-all duration-300 px-5 py-3 rounded-xl text-sm font-medium shadow-glow">

          Apply Filters

        </button>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* MAP PANEL */}
        <div className="xl:col-span-3 bg-card/80 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-[0_0_40px_rgba(255,255,255,0.03)]">

          <div className="flex items-center justify-between mb-5">

            <div>

              <h2 className="text-2xl font-semibold">
                Live Crime Density Map
              </h2>

              <p className="text-muted mt-2">
                Spatial heatmap visualization across Bengaluru.
              </p>

            </div>

            <div className="flex items-center gap-2">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

              <span className="text-sm text-muted">
                Live GIS Layer
              </span>

            </div>

          </div>

          {/* REAL MAP */}
          <div className="h-[620px] rounded-3xl overflow-hidden border border-white/5 relative">

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/0 z-[400] pointer-events-none" />

            {/* MAP GLOW */}
            <div className="absolute top-[-50px] right-[-50px] w-[250px] h-[250px] bg-blue-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />

            <CrimeMap />

          </div>

        </div>

        {/* SIDE PANEL */}
        <div className="space-y-6">

          {/* HOTSPOT PANEL */}
          <div className="bg-card/80 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-[0_0_40px_rgba(255,255,255,0.03)]">

            <h2 className="text-2xl font-semibold">
              Hotspot Zones
            </h2>

            <div className="mt-6 space-y-4">

              {[
                "K.R. Puram",
                "Byatarayanapura",
                "Peenya",
                "Varthur",
                "Subramanyapura",
              ].map((zone) => (

                <div
                  key={zone}
                  className="bg-background/80 backdrop-blur-md border border-white/5 rounded-2xl px-4 py-4 hover:border-red-400/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all duration-300"
                >

                  <div className="flex items-center justify-between">

                    <span className="font-medium">
                      {zone}
                    </span>

                    <span className="text-red-400 text-sm">
                      High Risk
                    </span>

                  </div>

                  <div className="mt-3 w-full bg-white/5 rounded-full h-2">

                    <div className="bg-red-400 h-2 rounded-full w-[80%]" />

                  </div>

                </div>

              ))}

            </div>
          </div>

          {/* LEGEND */}
          <div className="bg-card/80 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-[0_0_40px_rgba(255,255,255,0.03)]">

            <h2 className="text-2xl font-semibold">
              Risk Legend
            </h2>

            <div className="mt-5 space-y-4">

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
                  className="flex items-center gap-3"
                >

                  <div className={`w-4 h-4 rounded-full ${item.color}`} />

                  <span className="text-muted">
                    {item.label}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default HeatmapPage