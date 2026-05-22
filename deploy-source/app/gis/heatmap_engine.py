import pandas as pd
from pathlib import Path

# =========================================
# LOAD DATASET
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent.parent

DATA_PATH = (
    BASE_DIR
    / "data"
    / "processed"
    / "bengaluru.parquet"
)

# =========================================
# LAZY LOAD DATASET
# =========================================

df = None
geo_df = None


def load_dataset():
    global df
    global geo_df

    if df is None:

        df = pd.read_parquet(DATA_PATH)

        # =========================================
        # KEEP ONLY VALID COORDINATES
        # =========================================

        geo_df = df[
            df["has_coordinates"] == True
        ].copy()

    return geo_df


# =========================================
# GENERATE HEATMAP POINTS
# =========================================

def generate_heatmap_points(
    crime_type=None,
    year=None
):

    data = load_dataset()

    filtered_df = data.copy()

    # -------------------------------------
    # FILTER BY CRIME TYPE
    # -------------------------------------

    if crime_type:

        filtered_df = filtered_df[
            filtered_df["CrimeGroup_Name"]
            == crime_type.upper()
        ]

    # -------------------------------------
    # FILTER BY YEAR
    # -------------------------------------

    if year:

        filtered_df = filtered_df[
            filtered_df["FIR_YEAR"] == year
        ]

    # -------------------------------------
    # LIMIT RESPONSE SIZE
    # -------------------------------------

    MAX_POINTS = 5000

    filtered_df = filtered_df.head(MAX_POINTS)

    # -------------------------------------
    # CREATE HEATMAP RESPONSE
    # -------------------------------------

    heatmap_points = []

    for _, row in filtered_df.iterrows():

        heatmap_points.append({
            "lat": float(row["Latitude"]),
            "lng": float(row["Longitude"]),
            "intensity": 1
        })

    return heatmap_points