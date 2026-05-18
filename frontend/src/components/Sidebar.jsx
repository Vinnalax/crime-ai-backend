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
    <aside className="w-64 bg-card/70 backdrop-blur-md border-r border-white/10 p-4">

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
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300

                ${active
                  ? "bg-accent/15 text-white border border-accent/30 shadow-glow"
                  : "text-muted hover:bg-white/5 hover:text-white"
                }
              `}
            >

              <Icon size={20} />

              <span>
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