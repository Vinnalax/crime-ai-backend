import pandas as pd
from pathlib import Path
from sklearn.cluster import DBSCAN
import numpy as np

# =========================================
# LOAD DATA
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATA_PATH = (
    BASE_DIR
    / "data"
    / "processed"
    / "bengaluru.parquet"
)

df = pd.read_parquet(DATA_PATH)

geo_df = df[
    df["has_coordinates"] == True
].copy()

# =========================================
# HOTSPOT CLUSTERING
# =========================================

def generate_hotspots():

    # -------------------------------------
    # LIMIT DATA FOR MVP PERFORMANCE
    # -------------------------------------

    sample_df = geo_df.head(15000).copy()

    # -------------------------------------
    # EXTRACT COORDINATES
    # -------------------------------------

    coords = sample_df[
        ["Latitude", "Longitude"]
    ].values

    # -------------------------------------
    # DBSCAN CLUSTERING
    # -------------------------------------

    clustering = DBSCAN(
        eps=0.01,
        min_samples=25
    ).fit(coords)

    sample_df["cluster"] = clustering.labels_

    # -------------------------------------
    # REMOVE NOISE
    # -------------------------------------

    clustered_df = sample_df[
        sample_df["cluster"] != -1
    ]

    # -------------------------------------
    # GENERATE HOTSPOTS
    # -------------------------------------

    hotspots = []

    for cluster_id in clustered_df["cluster"].unique():

        cluster_points = clustered_df[
            clustered_df["cluster"] == cluster_id
        ]

        center_lat = cluster_points["Latitude"].mean()

        center_lng = cluster_points["Longitude"].mean()

        crime_count = len(cluster_points)

        risk_score = min(
            crime_count / 500,
            1.0
        )

        hotspots.append({
            "cluster_id": int(cluster_id),
            "center_lat": round(center_lat, 6),
            "center_lng": round(center_lng, 6),
            "crime_count": int(crime_count),
            "risk_score": round(risk_score, 2)
        })

    return hotspots