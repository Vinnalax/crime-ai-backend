from fastapi import APIRouter
from app.schemas.crime_report import CrimeReportRequest

router = APIRouter()

# =========================================
# REPORT CRIME
# =========================================

@router.post("/report-crime")

def report_crime(
    request: CrimeReportRequest
):

    return {
        "message": "Crime report submitted successfully",
        "data": request.dict()
    }