import KpiCard from "../components/KpiCard"

function OverviewPage() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="mb-16 pt-4">

        <p className="text-accent uppercase tracking-[0.3em] text-sm">
          Bengaluru Urban Intelligence
        </p>

        <h1 className="text-6xl font-bold mt-4 leading-[1.1] tracking-tight max-w-5xl">
          Bengaluru Crime Heatmap &
          Geospatial Intelligence Platform
        </h1>

        <p className="text-muted text-xl mt-6 max-w-3xl leading-relaxed">
          AI-powered geospatial crime intelligence system
          designed for hotspot analysis, spatial risk
          visualization, and urban safety analytics.
        </p>

      </section>

      {/* KPI SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">

        <KpiCard
          title="Total FIR Records"
          value="181K+"
          subtitle="Validated Bengaluru FIR dataset"
        />

        <KpiCard
          title="Active Hotspots"
          value="11"
          subtitle="DBSCAN hotspot clusters detected"
        />

        <KpiCard
          title="Geo Coordinates"
          value="143K+"
          subtitle="GIS validated spatial points"
        />

        <KpiCard
          title="Top Crime Type"
          value="THEFT"
          subtitle="Most frequent Bengaluru crime category"
        />

      </section>

      {/* ANALYTICS PREVIEW */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT PANEL */}
        <div className="xl:col-span-2 bg-card border border-white/10 rounded-2xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-semibold">
                Bengaluru Crime Intelligence
              </h2>

              <p className="text-muted mt-2">
                Spatial hotspot analytics and urban risk visualization.
              </p>

            </div>

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

          </div>

          {/* MAP PREVIEW */}
          <div className="mt-8 h-[400px] rounded-2xl bg-background border border-white/5 flex items-center justify-center">

            <p className="text-muted text-lg">
              Interactive Heatmap Intelligence
            </p>

          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="bg-card border border-white/10 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold">
            Top Hotspot Zones
          </h2>

          <div className="mt-6 space-y-4">

            {[
              "K.R. Puram",
              "Byatarayanapura",
              "Subramanyapura",
              "Peenya",
              "Varthur",
            ].map((zone) => (

              <div
                key={zone}
                className="flex items-center justify-between bg-background rounded-xl px-4 py-3 border border-white/5"
              >

                <span>
                  {zone}
                </span>

                <span className="text-red-400 text-sm">
                  High Risk
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>
  )
}

export default OverviewPage