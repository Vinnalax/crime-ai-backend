from fastapi import APIRouter

from app.gis.analytics_engine import (
    get_crime_type_stats,
    get_yearly_crime_stats,
    get_hotspot_station_stats
)

router = APIRouter()

# =========================================
# CRIME TYPE ANALYTICS
# =========================================

@router.get("/analytics/crime-types")
def crime_type_analytics():

    return get_crime_type_stats()

# =========================================
# YEARLY ANALYTICS
# =========================================

@router.get("/analytics/yearly")
def yearly_analytics():

    return get_yearly_crime_stats()

# =========================================
# HOTSPOT STATION ANALYTICS
# =========================================

@router.get("/analytics/hotspots")
def hotspot_analytics():

    return get_hotspot_station_stats()