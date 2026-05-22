import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function MainLayout({
  children,
  activePage,
  setActivePage,
  theme,
  toggleTheme,
}) {

  return (
    <div className="relative min-h-screen bg-background text-white overflow-hidden transition-all duration-500">

      {/* GLOBAL AMBIENT */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute top-[-200px] right-[-120px] w-[500px] h-[500px] bg-blue-500/10 blur-[180px] rounded-full" />

        <div className="absolute bottom-[-240px] left-[-180px] w-[460px] h-[460px] bg-cyan-500/10 blur-[180px] rounded-full" />

      </div>

      <div className="relative z-10">

        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <div className="flex">

          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
          />

          <main className="flex-1 p-8">

            {children}

          </main>

        </div>

      </div>

    </div>
  )
}

export default MainLayout