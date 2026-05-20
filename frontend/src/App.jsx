console.log(
  import.meta.env.VITE_API_BASE_URL
)

import { useEffect, useState } from "react"

import {
  AnimatePresence,
  motion,
} from "framer-motion"

import MainLayout from "./layout/MainLayout"

import OverviewPage from "./pages/OverviewPage"
import HeatmapPage from "./pages/HeatmapPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import PredictionPage from "./pages/PredictionPage"
import ReportCrimePage from "./pages/ReportCrimePage"

function App() {

  /*
  ==========================================
  PAGE STATE
  ==========================================
  */

  const [activePage, setActivePage] =
    useState("overview")

  /*
  ==========================================
  THEME STATE
  ==========================================
  */

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme") ||
      "dark"
    )

  /*
  ==========================================
  APPLY THEME
  ==========================================
  */

  useEffect(() => {

    document.documentElement.classList.remove(
      "light",
      "dark"
    )

    document.documentElement.classList.add(
      theme
    )

    localStorage.setItem(
      "theme",
      theme
    )
    
  }, [theme])

  /*
  ==========================================
  TOGGLE THEME
  ==========================================
  */

  const toggleTheme =
    () => {

      setTheme((prev) =>
        prev === "dark"
          ? "light"
          : "dark"
      )

    }

  /*
  ==========================================
  RENDER PAGE
  ==========================================
  */

  const renderPage =
    () => {

      switch (activePage) {

        case "heatmap":
          return <HeatmapPage />

        case "analytics":
          return <AnalyticsPage />

        case "prediction":
          return <PredictionPage />

        case "report":
          return <ReportCrimePage />

        default:
          return <OverviewPage />
      }
    }

  return (
    <MainLayout
      activePage={activePage}
      setActivePage={setActivePage}
      theme={theme}
      toggleTheme={toggleTheme}
    >

      <AnimatePresence mode="wait">

        <motion.div
          key={activePage}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -12,
          }}
          transition={{
            duration: 0.35,
          }}
        >

          {renderPage()}

        </motion.div>

      </AnimatePresence>

    </MainLayout>
  )
}

export default App