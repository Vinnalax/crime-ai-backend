import {
  LayoutDashboard,
  Flame,
  BarChart3,
  Brain,
  FileWarning,
} from "lucide-react"

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    key: "overview",
  },

  {
    title: "Heatmap",
    icon: Flame,
    key: "heatmap",
  },

  {
    title: "Analytics",
    icon: BarChart3,
    key: "analytics",
  },

  {
    title: "Prediction",
    icon: Brain,
    key: "prediction",
  },

  {
    title: "Report Crime",
    icon: FileWarning,
    key: "report",
  },
]

function Sidebar({
  activePage,
  setActivePage,
}) {

  return (
    <aside className="w-64 bg-card/70 backdrop-blur-2xl border-r border-white/[0.06] p-4 transition-all duration-500">

      <div className="mt-6 space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon

          const active =
            activePage === item.key

          return (
            <button
              key={item.title}
              onClick={() =>
                setActivePage(item.key)
              }
              className={`
                relative overflow-hidden
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl
                transition-all duration-300 group

                ${active
                  ? "bg-blue-500/[0.12] text-slate-900 dark:text-white border border-blue-400/20 shadow-[0_0_25px_rgba(59,130,246,0.12)]"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/[0.5] dark:hover:bg-white/[0.04] hover:text-slate-900 dark:hover:text-white hover:translate-x-1"
                }
              `}
            >

              {active && (
                <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-blue-400" />
              )}

              <Icon
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="font-medium">

                {item.title}

              </span>

            </button>
          )
        })}

      </div>

    </aside>
  )
}

export default Sidebar