import pandas as pd

# CHANGE THIS PATH if needed
DATASET_PATH = "data/raw/karnataka_fir.csv"

print("\nLoading dataset...\n")

df = pd.read_csv(DATASET_PATH)

print("=" * 80)
print("DATASET SHAPE")
print("=" * 80)
print(df.shape)

print("\n")

print("=" * 80)
print("COLUMN NAMES")
print("=" * 80)

for col in df.columns:
    print(col)

print("\n")

print("=" * 80)
print("FIRST 5 ROWS")
print("=" * 80)

print(df.head())

print("\n")

print("=" * 80)
print("MISSING VALUES")
print("=" * 80)

missing = df.isnull().sum()
missing = missing[missing > 0]

print(missing.sort_values(ascending=False))

print("\n")

print("=" * 80)
print("DATA TYPES")
print("=" * 80)

print(df.dtypes)

print("\n")

print("=" * 80)
print("SAMPLE UNIQUE VALUES")
print("=" * 80)

candidate_columns = [
    "district",
    "unit_name",
    "police_station",
    "crime_no",
    "offence_from_date",
    "offence_to_date",
    "place_of_occurrence",
    "area_name",
]

for col in candidate_columns:
    if col in df.columns:
        print(f"\n--- {col} ---")
        print(df[col].dropna().astype(str).unique()[:20])

print("\nInspection complete.\n")