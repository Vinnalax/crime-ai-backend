from fastapi import APIRouter
from datetime import datetime


router = APIRouter()


# =========================
# SYSTEM INFORMATION
# =========================

@router.get("/system/info")
def system_info():

    return {
        "status": "online",
        "model_loaded": True,
        "server_time": datetime.now().isoformat(),
        "version": "1.0.0"
    }