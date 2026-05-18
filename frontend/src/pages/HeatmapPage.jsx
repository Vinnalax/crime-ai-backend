function HeatmapPage() {
  return (
    <div>

      {/* PAGE HEADER */}
      <div className="mb-8">

        <p className="text-accent uppercase tracking-[0.3em] text-sm">
          Geospatial Intelligence
        </p>

        <h1 className="text-5xl font-bold mt-4">
          Bengaluru Crime Heatmap
        </h1>

        <p className="text-muted text-lg mt-4 max-w-3xl">
          Real-time spatial hotspot visualization and
          urban crime density analytics powered by
          AI-driven geospatial intelligence.
        </p>

      </div>

      {/* FILTER BAR */}
      <div className="bg-card/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-wrap gap-4 items-center mb-8">

        <select className="bg-background border border-white/10 rounded-xl px-4 py-3 text-sm outline-none">

          <option>All Crime Types</option>
          <option>Theft</option>
          <option>Cyber Crime</option>
          <option>Robbery</option>

        </select>

        <select className="bg-background border border-white/10 rounded-xl px-4 py-3 text-sm outline-none">

          <option>All Years</option>
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>

        </select>

        <button className="bg-accent hover:bg-accent/90 transition-all px-5 py-3 rounded-xl text-sm font-medium shadow-glow">

          Apply Filters

        </button>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* MAP PANEL */}
        <div className="xl:col-span-3 bg-card border border-white/10 rounded-3xl p-5">

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

          {/* MAP PLACEHOLDER */}
          <div className="h-[650px] rounded-3xl bg-background border border-white/5 flex items-center justify-center relative overflow-hidden">

            {/* GRID */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* GLOW */}
            <div className="absolute w-[300px] h-[300px] bg-red-500/20 blur-[100px] rounded-full top-20 left-40" />

            <p className="relative z-10 text-muted text-xl">
              Bengaluru Heatmap Rendering Coming Next
            </p>

          </div>

        </div>

        {/* SIDE PANEL */}
        <div className="space-y-6">

          {/* HOTSPOT PANEL */}
          <div className="bg-card border border-white/10 rounded-3xl p-5">

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
                  className="bg-background border border-white/5 rounded-2xl px-4 py-4"
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
          <div className="bg-card border border-white/10 rounded-3xl p-5">

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