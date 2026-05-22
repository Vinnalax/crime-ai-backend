from fastapi import APIRouter

from app.schemas.request_models import CrimePredictionRequest
from app.services.prediction_service import predict_crime

router = APIRouter()

@router.post("/predict-crime")
def predict(data: CrimePredictionRequest):
    return predict_crime(data)