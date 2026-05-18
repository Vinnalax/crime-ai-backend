import pandas as pd
from pathlib import Path

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

# =========================================
# CRIME TYPE ANALYTICS
# =========================================

def get_crime_type_stats():

    stats = (
        df["CrimeGroup_Name"]
        .value_counts()
        .head(10)
    )

    return stats.to_dict()

# =========================================
# YEARLY CRIME ANALYTICS
# =========================================

def get_yearly_crime_stats():

    stats = (
        df["FIR_YEAR"]
        .value_counts()
        .sort_index()
    )

    return stats.to_dict()

# =========================================
# POLICE STATION ANALYTICS
# =========================================

def get_hotspot_station_stats():

    stats = (
        df["UnitName"]
        .value_counts()
        .head(10)
    )

    return stats.to_dict()