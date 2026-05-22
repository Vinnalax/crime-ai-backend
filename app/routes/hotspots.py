from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.gis.hotspot_engine import (
    generate_hotspots
)

router = APIRouter()

@router.get("/hotspots")

def hotspots():

    try:

        data = generate_hotspots()

        return JSONResponse(
            content=data
        )

    except Exception as e:

        return JSONResponse(
            status_code=500,
            content={
                "error": str(e)
            }
        )