import api from "./client"

/*
====================================
PREDICTION
====================================
*/
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000"

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

  const response = await api.get(
    "/hotspots"
  )

  return response.data
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

