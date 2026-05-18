import pandas as pd
from pathlib import Path

# =========================================
# FILE PATH
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent

INPUT_FILE = (
    BASE_DIR
    / "data"
    / "processed"
    / "bengaluru.parquet"
)

# =========================================
# LOAD DATA
# =========================================

print("\nLoading Bengaluru GIS dataset...\n")

df = pd.read_parquet(INPUT_FILE)

print(f"Total Rows: {len(df):,}")

# =========================================
# BASIC COORDINATE STATS
# =========================================

print("\n" + "=" * 80)
print("COORDINATE ANALYSIS")
print("=" * 80)

print("\nLatitude Range:")

print(
    f"Min: {df['Latitude'].min()} | "
    f"Max: {df['Latitude'].max()}"
)

print("\nLongitude Range:")

print(
    f"Min: {df['Longitude'].min()} | "
    f"Max: {df['Longitude'].max()}"
)

# =========================================
# CHECK INVALID BENGALURU COORDINATES
# =========================================

print("\n" + "=" * 80)
print("INVALID COORDINATE CHECK")
print("=" * 80)

# Approx Bengaluru bounding box
blr_min_lat = 12.70
blr_max_lat = 13.25

blr_min_lng = 77.35
blr_max_lng = 77.90

invalid_coords = df[
    (df["Latitude"] < blr_min_lat)
    | (df["Latitude"] > blr_max_lat)
    | (df["Longitude"] < blr_min_lng)
    | (df["Longitude"] > blr_max_lng)
]

print(f"\nInvalid Coordinate Rows: {len(invalid_coords):,}")

# =========================================
# TOP HOTSPOT STATIONS
# =========================================

print("\n" + "=" * 80)
print("TOP HOTSPOT POLICE STATIONS")
print("=" * 80)

top_stations = (
    df["UnitName"]
    .value_counts()
    .head(20)
)

print(top_stations)

# =========================================
# TOP CRIME ZONES
# =========================================

print("\n" + "=" * 80)
print("TOP LOCALITY CLUES")
print("=" * 80)

for col in [
    "Place of Offence",
    "Village_Area_Name",
    "Beat_Name"
]:

    if col in df.columns:

        print(f"\n--- {col} ---\n")

        print(
            df[col]
            .value_counts()
            .head(15)
        )

# =========================================
# CRIME TYPE DISTRIBUTION
# =========================================

print("\n" + "=" * 80)
print("CRIME TYPE DISTRIBUTION")
print("=" * 80)

print(
    df["CrimeGroup_Name"]
    .value_counts()
    .head(20)
)

# =========================================
# YEAR DISTRIBUTION
# =========================================

print("\n" + "=" * 80)
print("YEAR DISTRIBUTION")
print("=" * 80)

print(
    df["FIR_YEAR"]
    .value_counts()
    .sort_index()
)

# =========================================
# SAVE INVALID COORDS
# =========================================

if len(invalid_coords) > 0:

    invalid_path = (
        BASE_DIR
        / "data"
        / "processed"
        / "invalid_coordinates.parquet"
    )

    invalid_coords.to_parquet(
        invalid_path,
        index=False
    )

    print(f"\nSaved invalid coordinates to:\n{invalid_path}")

print("\nSpatial audit complete.\n")