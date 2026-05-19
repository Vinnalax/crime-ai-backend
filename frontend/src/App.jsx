import { useState } from "react"

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

  const [activePage, setActivePage] =
    useState("overview")

  const renderPage = () => {

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
    >

      <AnimatePresence mode="wait">

        <motion.div
          key={activePage}
          initial={{
            opacity: 0,
            y: 12,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: -12,
            filter: "blur(10px)",
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