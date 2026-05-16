import pandas as pd
from pathlib import Path

# =========================================
# FILE PATHS
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent

INPUT_FILE = BASE_DIR / "data" / "processed" / "crime.parquet"

OUTPUT_FILE = BASE_DIR / "data" / "processed" / "bengaluru.parquet"

# =========================================
# LOAD CLEANED DATA
# =========================================

print("Loading cleaned dataset...")

df = pd.read_parquet(INPUT_FILE)

print(f"\nTotal Rows: {len(df):,}")

# =========================================
# FILTER BENGALURU
# =========================================

print("\nFiltering Bengaluru data...")

# Match Bengaluru/Bangalore variations
keywords = [
    "BENGALURU",
    "BANGALORE",
    "BENGALURU CITY"
]

# Convert to uppercase for matching
df["District_Name"] = df["District_Name"].astype(str).str.upper()

mask = df["District_Name"].str.contains(
    "|".join(keywords),
    na=False
)

bengaluru_df = df[mask].copy()

print(f"\nBengaluru Rows: {len(bengaluru_df):,}")

# =========================================
# SAVE FILTERED DATA
# =========================================

print("\nSaving Bengaluru parquet...")

bengaluru_df.to_parquet(
    OUTPUT_FILE,
    index=False
)

print("\nSUCCESS")
print(f"\nSaved To:\n{OUTPUT_FILE}")

# =========================================
# PREVIEW
# =========================================

print("\nDistrict Counts:\n")

print(
    bengaluru_df["District_Name"]
    .value_counts()
)

print("\nDataset Preview:\n")

print(bengaluru_df.head())