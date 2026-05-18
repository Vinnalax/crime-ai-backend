import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function MainLayout({
  children,
  activePage,
  setActivePage,
}) {
  return (
    <div className="relative min-h-screen bg-background text-white overflow-hidden">

      {/* AMBIENT GLOWS */}
      <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-250px] right-[-150px] w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10">

        <Navbar />

        <div className="flex">

          <Sidebar
            activePage={activePage}
            setActivePage={setActivePage}
          />

          <main className="flex-1 p-6">
            {children}
          </main>

        </div>
      </div>
    </div>
  )
}

export default MainLayout