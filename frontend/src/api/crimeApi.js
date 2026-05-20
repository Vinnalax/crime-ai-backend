import api from "./client"

/*
====================================
PREDICTION
====================================
*/

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

    const response = await api.get(
      "/analytics/hotspots"
    )

    return response.data
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