from pydantic import BaseModel
from typing import Optional


class CrimeInput(BaseModel):

    Latitude: Optional[float] = None
    Longitude: Optional[float] = None

    day: Optional[int] = None
    month: Optional[int] = None
    year: Optional[int] = None

    weekday: Optional[int] = None
    is_weekend: Optional[int] = None


class PredictionResponse(BaseModel):

    status: str
    predicted_crime: str
    confidence: float
    timestamp: str