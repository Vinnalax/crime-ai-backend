from fastapi import APIRouter
from app.gis.heatmap_engine import generate_heatmap_points

router = APIRouter()

# =========================================
# HEATMAP ENDPOINT
# =========================================

@router.get("/heatmap")
def get_heatmap(
    crime_type: str = None,
    year: int = None
):

    points = generate_heatmap_points(
        crime_type=crime_type,
        year=year
    )

    return {
        "total_points": len(points),
        "heatmap_points": points
    }