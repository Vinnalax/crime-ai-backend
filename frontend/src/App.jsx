import { useState } from "react"

import MainLayout from "./layout/MainLayout"

import OverviewPage from "./pages/OverviewPage"
import HeatmapPage from "./pages/HeatmapPage"

function App() {

  const [activePage, setActivePage] =
    useState("overview")

  const renderPage = () => {

    switch (activePage) {

      case "heatmap":
        return <HeatmapPage />

      default:
        return <OverviewPage />
    }
  }

  return (
    <MainLayout
      activePage={activePage}
      setActivePage={setActivePage}
    >
      {renderPage()}
    </MainLayout>
  )
}

export default App