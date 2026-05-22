from datetime import datetime
from app.model_loader import predict_crime as model_predict


def predict_crime(data):

    try:

        result = model_predict(
            data.latitude,
            data.longitude,
            data.hour,
            data.month
        )

        return {
            "status": "success",
            "predicted_crime": result["predicted_crime"],
            "confidence": result["confidence"],
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:

        print("FULL ERROR:", str(e))

        return {
            "status": "error",
            "predicted_crime": "UNKNOWN",
            "confidence": 0,
            "timestamp": ""
        }