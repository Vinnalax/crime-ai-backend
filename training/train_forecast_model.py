import pandas as pd
from prophet import Prophet
import joblib
from pathlib import Path

print("Loading Bengaluru dataset...")

BASE_DIR = Path(__file__).resolve().parent.parent

data_path = BASE_DIR / "data" / "processed" / "crime.parquet"

df = pd.read_parquet(data_path)

print(f"Rows Loaded: {len(df):,}")

# Create daily crime counts
daily_crime = (
    df.groupby("Date")
    .size()
    .reset_index(name="CrimeCount")
)

# Prophet format
daily_crime.columns = ["ds", "y"]

print("\nTraining forecasting model...")

model = Prophet(
    daily_seasonality=True,
    weekly_seasonality=True,
    yearly_seasonality=True
)

model.fit(daily_crime)

# Save model
model_path = BASE_DIR / "models" / "forecast_model.pkl"

joblib.dump(model, model_path)

print("\nSUCCESS")
print(f"Forecast Model Saved To: {model_path}")