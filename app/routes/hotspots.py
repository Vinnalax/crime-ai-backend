from fastapi import APIRouter
from app.gis.hotspot_engine import generate_hotspots

router = APIRouter()

# =========================================
# HOTSPOT ENDPOINT
# =========================================

@router.get("/hotspots")
def get_hotspots():

    hotspots = generate_hotspots()

    return {
        "total_hotspots": len(hotspots),
        "hotspots": hotspots
    }