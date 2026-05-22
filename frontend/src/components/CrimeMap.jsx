import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet"

import {
  useEffect,
  useState,
} from "react"

import {
  getHotspots,
} from "../api/crimeApi"

/*
==========================================
AREA MAPPING
==========================================
*/

const knownAreas = [
  {
    name: "Whitefield",
    lat: 12.9698,
    lng: 77.7499,
  },

  {
    name: "KR Puram",
    lat: 13.0196,
    lng: 77.6953,
  },

  {
    name: "Hebbal",
    lat: 13.0358,
    lng: 77.5970,
  },

  {
    name: "Electronic City",
    lat: 12.8399,
    lng: 77.6770,
  },

  {
    name: "Yelahanka",
    lat: 13.1007,
    lng: 77.5963,
  },

  {
    name: "Peenya",
    lat: 13.0321,
    lng: 77.5273,
  },

  {
    name: "Indiranagar",
    lat: 12.9784,
    lng: 77.6408,
  },

  {
    name: "Koramangala",
    lat: 12.9352,
    lng: 77.6245,
  },

  {
    name: "Marathahalli",
    lat: 12.9591,
    lng: 77.6974,
  },

  {
    name: "HSR Layout",
    lat: 12.9116,
    lng: 77.6474,
  },

  {
    name: "BTM Layout",
    lat: 12.9166,
    lng: 77.6101,
  },
]

/*
==========================================
GET NEAREST AREA
==========================================
*/

function getNearestArea(lat, lng) {

  let nearest =
    knownAreas[0]

  let minDistance =
    Infinity

  knownAreas.forEach((area) => {

    const distance =
      Math.sqrt(
        Math.pow(
          lat - area.lat,
          2
        ) +
        Math.pow(
          lng - area.lng,
          2
        )
      )

    if (
      distance < minDistance
    ) {
      minDistance =
        distance

      nearest = area
    }
  })

  return nearest.name
}

function CrimeMap() {

  const [hotspots, setHotspots] =
    useState([])

  /*
  ==========================================
  LOAD HOTSPOTS
  ==========================================
  */

  useEffect(() => {

    const loadHotspots =
      async () => {

        try {

          const response =
            await getHotspots()

          console.log(
            "HOTSPOTS:",
            response
          )

          const formatted =
            (
              response.hotspots ||
              []
            ).map((spot) => ({

              ...spot,

              location:
                getNearestArea(
                  spot.center_lat,
                  spot.center_lng
                ),
            }))

          setHotspots(
            formatted
          )

        } catch (error) {

          console.error(
            "HOTSPOT ERROR:",
            error
          )
        }
      }

    loadHotspots()

  }, [])

  return (

    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={11}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
    >

      {/* MAP TILE */}
      <TileLayer
        attribution='&copy; OpenStreetMap contributors & CartoDB'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {/* OUTER GLOW */}
      {hotspots.map((spot, index) => (

        <CircleMarker
          key={`outer-${index}`}
          center={[
            spot.center_lat,
            spot.center_lng,
          ]}
          radius={42}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.035,
            weight: 0,
          }}
        />

      ))}

      {/* MID GLOW */}
      {hotspots.map((spot, index) => (

        <CircleMarker
          key={`mid-${index}`}
          center={[
            spot.center_lat,
            spot.center_lng,
          ]}
          radius={28}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.06,
            weight: 0,
          }}
        />

      ))}

      {/* INNER GLOW */}
      {hotspots.map((spot, index) => (

        <CircleMarker
          key={`inner-${index}`}
          center={[
            spot.center_lat,
            spot.center_lng,
          ]}
          radius={16}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.12,
            weight: 0,
          }}
        />

      ))}

      {/* CENTER DOT */}
      {hotspots.map((spot, index) => (

        <CircleMarker
          key={`center-${index}`}
          center={[
            spot.center_lat,
            spot.center_lng,
          ]}
          radius={7}
          pathOptions={{
            color: "#dc2626",
            fillColor: "#ef4444",
            fillOpacity: 0.9,
            weight: 2,
          }}
        >

          <Popup>

            <div className="text-sm">

              <h3 className="font-bold">
                {spot.location}
              </h3>

              <p>
                Crime Count: {spot.crime_count}
              </p>

            </div>

          </Popup>

        </CircleMarker>

      ))}

    </MapContainer>
  )
}

export default CrimeMap