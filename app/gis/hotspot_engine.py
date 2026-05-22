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

# =========================================
# SAFE DATA LOADING
# =========================================

try:

    df = pd.read_parquet(DATA_PATH)

    geo_df = df[
        df["has_coordinates"] == True
    ].copy()

except Exception as e:

    print(f"HOTSPOT DATA LOAD ERROR: {e}")

    geo_df = pd.DataFrame()

# =========================================
# HOTSPOT CLUSTERING
# =========================================

def generate_hotspots():

    try:

        # ---------------------------------
        # EMPTY DATA PROTECTION
        # ---------------------------------

        if geo_df.empty:

            return []

        # ---------------------------------
        # LIMIT DATA FOR RAILWAY
        # ---------------------------------

        MAX_POINTS = 5000

        sample_df = geo_df.head(
            MAX_POINTS
        ).copy()

        # ---------------------------------
        # DROP INVALID COORDINATES
        # ---------------------------------

        sample_df = sample_df.dropna(
            subset=["Latitude", "Longitude"]
        )

        # ---------------------------------
        # ENSURE NUMERIC
        # ---------------------------------

        sample_df["Latitude"] = pd.to_numeric(
            sample_df["Latitude"],
            errors="coerce"
        )

        sample_df["Longitude"] = pd.to_numeric(
            sample_df["Longitude"],
            errors="coerce"
        )

        sample_df = sample_df.dropna(
            subset=["Latitude", "Longitude"]
        )

        # ---------------------------------
        # NO DATA CHECK
        # ---------------------------------

        if len(sample_df) == 0:

            return []

        # ---------------------------------
        # EXTRACT COORDINATES
        # ---------------------------------

        coords = sample_df[
            ["Latitude", "Longitude"]
        ].values

        # ---------------------------------
        # DBSCAN CLUSTERING
        # ---------------------------------

        clustering = DBSCAN(
            eps=0.01,
            min_samples=20,
            algorithm="ball_tree"
        ).fit(coords)

        sample_df["cluster"] = (
            clustering.labels_
        )

        # ---------------------------------
        # REMOVE NOISE
        # ---------------------------------

        clustered_df = sample_df[
            sample_df["cluster"] != -1
        ]

        # ---------------------------------
        # NO CLUSTERS FOUND
        # ---------------------------------

        if clustered_df.empty:

            return []

        # ---------------------------------
        # GENERATE HOTSPOTS
        # ---------------------------------

        hotspots = []

        for cluster_id in clustered_df[
            "cluster"
        ].unique():

            cluster_points = clustered_df[
                clustered_df["cluster"]
                == cluster_id
            ]

            center_lat = (
                cluster_points["Latitude"]
                .mean()
            )

            center_lng = (
                cluster_points["Longitude"]
                .mean()
            )

            crime_count = int(
                len(cluster_points)
            )

            risk_score = min(
                crime_count / 500,
                1.0
            )

            hotspots.append({

                "cluster_id": int(cluster_id),

                "center_lat": float(
                    round(center_lat, 6)
                ),

                "center_lng": float(
                    round(center_lng, 6)
                ),

                "crime_count": int(
                    crime_count
                ),

                "risk_score": float(
                    round(risk_score, 2)
                )

            })

        return hotspots

    except Exception as e:

        print(
            f"HOTSPOT GENERATION ERROR: {e}"
        )

        return []