from pydantic import BaseModel

class CrimeReportRequest(BaseModel):

    crime_type: str

    latitude: float

    longitude: float

    description: str = ""