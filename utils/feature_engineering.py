import pandas as pd

def create_features(df):

    # =========================
    # TIME FEATURES
    # =========================

    df["hour"] = 12

    # FIR dataset has no exact hour
    # so we use placeholder

    df["day"] = df["Date"].dt.day

    df["month"] = df["Date"].dt.month

    df["year"] = df["Date"].dt.year

    df["weekday"] = df["Date"].dt.weekday

    # Weekend flag
    df["is_weekend"] = (
        df["weekday"] >= 5
    ).astype(int)

    # Placeholder night flag
    df["is_night"] = 0

    return df