import pandas as pd
from pathlib import Path

# =========================================
# FILE PATHS
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent

INPUT_FILE = BASE_DIR / "data" / "raw" / "karnataka_fir.csv"

OUTPUT_FILE = BASE_DIR / "data" / "processed" / "crime.parquet"

# =========================================
# LOAD DATASET
# =========================================

print("Loading CSV dataset...")

try:
    df = pd.read_csv(
        INPUT_FILE,
        low_memory=False,
        encoding="latin1"
    )
except Exception as e:
    print(f"ERROR LOADING CSV: {e}")
    exit()

print(f"\nOriginal Rows: {len(df):,}")

# =========================================
# CLEAN COLUMN NAMES
# =========================================

df.columns = [col.strip() for col in df.columns]

print("\nColumns Found:")
print(df.columns.tolist())

# =========================================
# REMOVE DUPLICATES
# =========================================

df = df.drop_duplicates()

print(f"\nRows After Duplicate Removal: {len(df):,}")

# =========================================
# CREATE DATE COLUMN
# =========================================

print("\nCreating Date column...")

required_date_cols = [
    "FIR_YEAR",
    "FIR_MONTH",
    "FIR_Day"
]

for col in required_date_cols:
    if col not in df.columns:
        print(f"ERROR: Missing column -> {col}")
        exit()

# Convert to numeric safely
df["FIR_YEAR"] = pd.to_numeric(
    df["FIR_YEAR"],
    errors="coerce"
)

df["FIR_MONTH"] = pd.to_numeric(
    df["FIR_MONTH"],
    errors="coerce"
)

df["FIR_Day"] = pd.to_numeric(
    df["FIR_Day"],
    errors="coerce"
)

# Remove invalid rows
df = df.dropna(
    subset=["FIR_YEAR", "FIR_MONTH", "FIR_Day"]
)

# Convert to integer
df["FIR_YEAR"] = df["FIR_YEAR"].astype(int)
df["FIR_MONTH"] = df["FIR_MONTH"].astype(int)
df["FIR_Day"] = df["FIR_Day"].astype(int)

# Create proper date
df["Date"] = pd.to_datetime(
    dict(
        year=df["FIR_YEAR"],
        month=df["FIR_MONTH"],
        day=df["FIR_Day"]
    ),
    errors="coerce"
)

# Remove invalid dates
df = df.dropna(subset=["Date"])

print(f"Rows After Date Cleaning: {len(df):,}")

# =========================================
# GEO CLEANING
# =========================================

if "Latitude" in df.columns and "Longitude" in df.columns:

    print("\nCleaning coordinates...")

    df["Latitude"] = pd.to_numeric(
        df["Latitude"],
        errors="coerce"
    )

    df["Longitude"] = pd.to_numeric(
        df["Longitude"],
        errors="coerce"
    )

    # Remove invalid coordinates
    df = df[
        (df["Latitude"].between(-90, 90)) &
        (df["Longitude"].between(-180, 180))
    ]

    print(f"Rows After Geo Cleaning: {len(df):,}")

else:
    print("\nWARNING: Latitude/Longitude columns not found.")

# =========================================
# MEMORY OPTIMIZATION
# =========================================

print("\nOptimizing memory...")

for col in df.select_dtypes(include="object").columns:
    df[col] = df[col].astype("category")

# =========================================
# SAVE PARQUET
# =========================================

print("\nSaving parquet file...")

try:

    df.to_parquet(
        OUTPUT_FILE,
        index=False
    )

    print("\nSUCCESS")
    print(f"\nSaved To:\n{OUTPUT_FILE}")

except Exception as e:
    print(f"\nERROR SAVING PARQUET: {e}")

# =========================================
# FINAL INFO
# =========================================

print("\nFinal Dataset Info:\n")

print(df.info())

print("\nDataset Preview:\n")

print(df.head())