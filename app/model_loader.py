import joblib
import pandas as pd
from pathlib import Path
from datetime import datetime

# =========================
# MODEL PATHS
# =========================

# =========================
# BASE DIRECTORY
# =========================

BASE_DIR = Path(__file__).resolve().parent.parent

# =========================
# MODEL PATHS
# =========================

MODEL_PATH = BASE_DIR / "models" / "crime_classifier.pkl"

ENCODER_PATH = BASE_DIR / "models" / "label_encoder.pkl"

# =========================
# LOAD MODEL + LABEL ENCODER
# =========================

model = joblib.load(MODEL_PATH)

label_encoder = joblib.load(ENCODER_PATH)

print("MODEL LOADED SUCCESSFULLY")
print("LABEL ENCODER LOADED SUCCESSFULLY")

# =========================
# PREDICTION FUNCTION
# =========================

def predict_crime(latitude, longitude, hour=None, month=None):

    try:

        # Current datetime
        now = datetime.now()

        # Use provided month if available
        final_month = month if month else now.month

        # Build features EXACTLY matching training
        features = pd.DataFrame([{
            "Latitude": latitude,
            "Longitude": longitude,
            "day": now.day,
            "month": final_month,
            "year": now.year,
            "weekday": now.weekday(),
            "is_weekend": 1 if now.weekday() >= 5 else 0
        }])

        print("\nFEATURES:")
        print(features)

        # Predict encoded class
        prediction = model.predict(features)

        print("\nRAW PREDICTION:")
        print(prediction)

        # Decode class label
        decoded_prediction = label_encoder.inverse_transform(
            prediction
        )

        print("\nDECODED PREDICTION:")
        print(decoded_prediction)

        # Default confidence
        confidence = 0.0

        # Predict probabilities safely
        try:

            probabilities = model.predict_proba(features)

            confidence = float(max(probabilities[0]))

            print("\nCONFIDENCE:")
            print(confidence)

        except Exception as prob_error:

            print("\nPROBA ERROR:")
            print(prob_error)

        return {
            "predicted_crime": str(decoded_prediction[0]),
            "confidence": round(confidence, 2)
        }

    except Exception as e:

        print("\nFULL MODEL ERROR:")
        print(e)

        return {
            "predicted_crime": "UNKNOWN",
            "confidence": 0
        }