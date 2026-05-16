import pandas as pd
import joblib
from sklearn.cluster import DBSCAN
from pathlib import Path

print("Loading Bengaluru dataset...")

BASE_DIR = Path(__file__).resolve().parent.parent

data_path = BASE_DIR / "data" / "processed" / "bengaluru.parquet"

df = pd.read_parquet(data_path)

print(f"Rows Loaded: {len(df):,}")

# Keep only rows with coordinates
df = df.dropna(subset=["Latitude", "Longitude"])

print(f"Rows After Coordinate Cleaning: {len(df):,}")

# Coordinates
coords = df[["Latitude", "Longitude"]]

print("Training hotspot clustering model...")

# DBSCAN clustering
model = DBSCAN(
    eps=0.01,
    min_samples=20
)

clusters = model.fit_predict(coords)

df["HotspotCluster"] = clusters

# Count hotspots
num_hotspots = len(set(clusters)) - (1 if -1 in clusters else 0)

print(f"Hotspots Found: {num_hotspots}")

# Save clustered dataset
output_data = BASE_DIR / "data" / "processed" / "bengaluru_hotspots.parquet"

df.to_parquet(output_data)

# Save model
model_path = BASE_DIR / "models" / "hotspot_model.pkl"

joblib.dump(model, model_path)

print("\nSUCCESS")
print(f"Model Saved To: {model_path}")
print(f"Clustered Data Saved To: {output_data}")