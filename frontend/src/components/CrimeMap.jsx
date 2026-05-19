import {
  MapContainer,
  TileLayer,
 CircleMarker,
  Popup,
} from "react-leaflet"

const hotspots = [
  {
    name: "K.R. Puram",
    lat: 13.0196,
    lng: 77.6953,
    risk: "High",
  },

  {
    name: "Peenya",
    lat: 13.0321,
    lng: 77.5273,
    risk: "High",
  },

  {
    name: "Varthur",
    lat: 12.9406,
    lng: 77.7476,
    risk: "Moderate",
  },

  {
    name: "Byatarayanapura",
    lat: 13.076,
    lng: 77.593,
    risk: "High",
  },
]

function CrimeMap() {
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

      {/* OUTER HEAT GLOW */}
      {hotspots.map((spot) => (

        <CircleMarker
          key={`${spot.name}-outer`}
          center={[spot.lat, spot.lng]}
          radius={42}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.035,
            weight: 0,
          }}
        />

      ))}

      {/* MID HEAT GLOW */}
      {hotspots.map((spot) => (

        <CircleMarker
          key={`${spot.name}-mid`}
          center={[spot.lat, spot.lng]}
          radius={28}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.06,
            weight: 0,
          }}
        />

      ))}

      {/* INNER CORE */}
      {hotspots.map((spot) => (

        <CircleMarker
          key={`${spot.name}-inner`}
          center={[spot.lat, spot.lng]}
          radius={16}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.12,
            weight: 0,
          }}
        />

      ))}

      {/* CENTER HOTSPOT */}
      {hotspots.map((spot) => (

        <CircleMarker
          key={spot.name}
          center={[spot.lat, spot.lng]}
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
                {spot.name}
              </h3>

              <p>
                Risk Level: {spot.risk}
              </p>

            </div>

          </Popup>

        </CircleMarker>

      ))}

    </MapContainer>
  )
}

export default CrimeMap