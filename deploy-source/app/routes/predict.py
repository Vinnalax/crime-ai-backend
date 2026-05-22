from fastapi import APIRouter

from app.schemas.crime_schema import (
    CrimeInput,
    PredictionResponse
)

from app.services.prediction_service import predict_crime

from app.core.logging_config import logger


# =========================
# ROUTER
# =========================

router = APIRouter()


# =========================
# PREDICTION ENDPOINT
# =========================

@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(data: CrimeInput):

    logger.info(
        f"Crime prediction request received: {data.dict()}"
    )

    result = predict_crime(data)

    logger.info(
        f"Prediction result: {result}"
    )

    return result