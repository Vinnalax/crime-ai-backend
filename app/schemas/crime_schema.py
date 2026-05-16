from pydantic import BaseModel, Field


# =========================
# INPUT SCHEMA
# =========================

class CrimeInput(BaseModel):

    latitude: float = Field(
        ...,
        ge=-90,
        le=90,
        description="Latitude coordinate"
    )

    longitude: float = Field(
        ...,
        ge=-180,
        le=180,
        description="Longitude coordinate"
    )

    hour: int | None = Field(
        default=None,
        ge=0,
        le=23,
        description="Hour of incident"
    )

    month: int | None = Field(
        default=None,
        ge=1,
        le=12,
        description="Month number"
    )


# =========================
# RESPONSE SCHEMA
# =========================

class PredictionResponse(BaseModel):

    status: str

    predicted_crime: str

    confidence: float

    timestamp: str