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
    active: true,
  },

  {
    title: "Heatmap",
    icon: Flame,
  },

  {
    title: "Analytics",
    icon: BarChart3,
  },

  {
    title: "Prediction",
    icon: Brain,
  },

  {
    title: "Report Crime",
    icon: FileWarning,
  },
]

function Sidebar() {
  return (
    <aside className="w-64 bg-card/70 backdrop-blur-md border-r border-white/10 p-4">

      <div className="mt-6 space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon

          return (
            <button
              key={item.title}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300

                ${item.active
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