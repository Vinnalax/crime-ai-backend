from fastapi import APIRouter
from app.schemas.crime_schema import (
    CrimeInput,
    PredictionResponse
)
from app.services.prediction_service import predict_crime
import logging

router = APIRouter()

logging.basicConfig(level=logging.INFO)


@router.post(
    "/predict",
    response_model=PredictionResponse
)
def predict(data: CrimeInput):

    logging.info("Crime prediction request received")

    result = predict_crime(data)

    logging.info(f"Prediction result: {result}")

    return result