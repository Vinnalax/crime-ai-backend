import api from "./client"

/*
====================================
PREDICTION
====================================
*/
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000"

export const normalizeHotspot = (spot) => ({
  clusterId: spot.cluster_id,

  lat: Number(spot.center_lat),
  lng: Number(spot.center_lng),

  crimeCount: Number(spot.crime_count || 0),
  riskScore: Number(spot.risk_score || 0),

  intensity: Number(spot.risk_score || 0),
})

export const predictCrime = async (
  payload
) => {

  const response = await api.post(
    "/predict",
    payload
  )

  return response.data
}

/*
====================================
HEATMAP
====================================
*/

export const getHeatmap = async () => {

  const response = await api.get(
    "/heatmap"
  )

  return response.data
}

/*
====================================
HOTSPOTS
====================================
*/

export const getHotspots = async () => {
  const response = await api.get("/hotspots")

  return {
    ...response.data,

    hotspots: (response.data.hotspots || []).map(
      normalizeHotspot
    ),
  }
}


/*
====================================
ANALYTICS
====================================
*/

export const getCrimeTypes =
  async () => {

    const response = await api.get(
      "/analytics/crime-types"
    )

    return response.data
}

export const getYearlyAnalytics =
  async () => {

    const response = await api.get(
      "/analytics/yearly"
    )

    return response.data
}

export const getHotspotAnalytics =
  async () => {

    const response =
      await fetch(
        `${API_BASE_URL}/hotspots`
      )

    if (!response.ok) {

      throw new Error(
        "Failed to fetch hotspots"
      )
    }

    return response.json()
  }

/*
====================================
REPORT CRIME
====================================
*/

export const reportCrime = async (
  payload
) => {

  const response = await api.post(
    "/report-crime",
    payload
  )

  return response.data
}
