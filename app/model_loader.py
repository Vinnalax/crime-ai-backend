import os
import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = os.path.join(BASE_DIR, "models", "crime_classifier.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "models", "label_encoder.pkl")

model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)


def predict_crime(data):

    input_data = pd.DataFrame([{
        "Latitude": data.Latitude,
        "Longitude": data.Longitude,
        "day": data.day,
        "month": data.month,
        "year": data.year,
        "weekday": data.weekday,
        "is_weekend": data.is_weekend
    }])

    prediction = model.predict(input_data)[0]

    predicted_label = label_encoder.inverse_transform([prediction])[0]

    confidence = 0

    if hasattr(model, "predict_proba"):
        confidence = max(model.predict_proba(input_data)[0]) * 100

    return {
        "predicted_crime": str(predicted_label),
        "confidence": float(confidence)
    }