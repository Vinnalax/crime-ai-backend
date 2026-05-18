import pandas as pd
from pathlib import Path

# =========================================
# FILE PATHS
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent

INPUT_FILE = BASE_DIR / "data" / "processed" / "crime.parquet"

OUTPUT_FILE = (
    BASE_DIR
    / "data"
    / "processed"
    / "bengaluru.parquet"
)

# =========================================
# LOAD DATA
# =========================================

print("\nLoading cleaned dataset...\n")

df = pd.read_parquet(INPUT_FILE)

print(f"Original Rows: {len(df):,}")

# =========================================
# STANDARDIZE DISTRICT NAMES
# =========================================

print("\nStandardizing district names...\n")

df["District_Name"] = (
    df["District_Name"]
    .astype(str)
    .str.upper()
    .str.strip()
)

# =========================================
# FILTER BENGALURU
# =========================================

print("Filtering Bengaluru data...\n")

keywords = [
    "BENGALURU",
    "BANGALORE",
    "BENGALURU CITY",
    "BANGALORE CITY",
    "BENGALURU URBAN",
    "BANGALORE URBAN"
]

mask = df["District_Name"].str.contains(
    "|".join(keywords),
    na=False
)

bengaluru_df = df[mask].copy()

print(f"Bengaluru Rows: {len(bengaluru_df):,}")

# =========================================
# REMOVE DUPLICATES
# =========================================

print("\nRemoving duplicates...\n")

before = len(bengaluru_df)

bengaluru_df = bengaluru_df.drop_duplicates()

after = len(bengaluru_df)

print(f"Duplicates Removed: {before - after:,}")

# =========================================
# CLEAN STRING COLUMNS
# =========================================

print("\nCleaning spatial columns...\n")

string_columns = [
    "UnitName",
    "CrimeGroup_Name",
    "CrimeHead_Name",
    "Place of Offence",
    "Village_Area_Name",
    "Beat_Name",
    "FIR Type",
    "FIR_Stage"
]

for col in string_columns:

    if col in bengaluru_df.columns:

        bengaluru_df[col] = (
            bengaluru_df[col]
            .astype(str)
            .str.upper()
            .str.strip()
        )

# =========================================
# VALIDATE COORDINATES
# =========================================

print("\nValidating coordinates...\n")

bengaluru_df["Latitude"] = pd.to_numeric(
    bengaluru_df["Latitude"],
    errors="coerce"
)

bengaluru_df["Longitude"] = pd.to_numeric(
    bengaluru_df["Longitude"],
    errors="coerce"
)

# =========================================
# STRICT BENGALURU GEO VALIDATION
# =========================================

print("Applying Bengaluru geo-boundary validation...\n")

# Approx Bengaluru geo boundaries
BLR_MIN_LAT = 12.70
BLR_MAX_LAT = 13.25

BLR_MIN_LNG = 77.35
BLR_MAX_LNG = 77.90

# Convert invalid coordinates to null
invalid_mask = (
    (bengaluru_df["Latitude"] < BLR_MIN_LAT)
    |
    (bengaluru_df["Latitude"] > BLR_MAX_LAT)
    |
    (bengaluru_df["Longitude"] < BLR_MIN_LNG)
    |
    (bengaluru_df["Longitude"] > BLR_MAX_LNG)
)

invalid_count = invalid_mask.sum()

print(f"Invalid Bengaluru coordinates: {invalid_count:,}")

# Nullify invalid coordinates
bengaluru_df.loc[
    invalid_mask,
    ["Latitude", "Longitude"]
] = None

print("\nGeo validation completed.")

# Coordinate availability flag
bengaluru_df["has_coordinates"] = (
    bengaluru_df["Latitude"].notnull()
    &
    bengaluru_df["Longitude"].notnull()
)

# =========================================
# TEMPORAL FEATURES
# =========================================

print("\nCreating temporal features...\n")

bengaluru_df["FIR_YEAR"] = pd.to_numeric(
    bengaluru_df["FIR_YEAR"],
    errors="coerce"
)

bengaluru_df["FIR_MONTH"] = pd.to_numeric(
    bengaluru_df["FIR_MONTH"],
    errors="coerce"
)

bengaluru_df["FIR_Day"] = pd.to_numeric(
    bengaluru_df["FIR_Day"],
    errors="coerce"
)

# Weekend approximation
bengaluru_df["is_weekend"] = (
    bengaluru_df["FIR_Day"] >= 5
)

# =========================================
# BASIC GIS FEATURES
# =========================================

print("\nCreating GIS-ready features...\n")

bengaluru_df["crime_severity_score"] = (
    bengaluru_df["CrimeGroup_Name"]
    .map({
        "MURDER": 10,
        "ROBBERY": 8,
        "DACOITY": 9,
        "THEFT": 5,
        "ASSAULT": 6
    })
    .fillna(3)
)

# =========================================
# SAVE PARQUET
# =========================================

print("\nSaving Bengaluru GIS dataset...\n")

bengaluru_df.to_parquet(
    OUTPUT_FILE,
    index=False
)

# =========================================
# SUMMARY
# =========================================

print("\n" + "=" * 80)
print("BENGALURU GIS DATASET SUMMARY")
print("=" * 80)

print(f"\nFinal Rows: {len(bengaluru_df):,}")

print("\nCoordinate Availability:\n")

print(
    bengaluru_df["has_coordinates"]
    .value_counts()
)

print("\nTop Police Stations:\n")

print(
    bengaluru_df["UnitName"]
    .value_counts()
    .head(20)
)

print("\nTop Crime Groups:\n")

print(
    bengaluru_df["CrimeGroup_Name"]
    .value_counts()
    .head(20)
)

print("\nDataset Saved Successfully")

print(f"\nOutput File:\n{OUTPUT_FILE}\n")