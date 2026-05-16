import pandas as pd
import joblib

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report

from xgboost import XGBClassifier

import sys
import os

# =========================================
# IMPORT FEATURE ENGINEERING
# =========================================

CURRENT_DIR = os.path.dirname(__file__)

UTILS_PATH = os.path.abspath(
    os.path.join(CURRENT_DIR, "../utils")
)

sys.path.append(UTILS_PATH)

from feature_engineering import create_features

# =========================================
# PATHS
# =========================================

BASE_DIR = Path(__file__).resolve().parent.parent

INPUT_FILE = (
    BASE_DIR /
    "data" /
    "processed" /
    "bengaluru.parquet"
)

MODEL_DIR = BASE_DIR / "models"

MODEL_DIR.mkdir(exist_ok=True)

# =========================================
# LOAD DATA
# =========================================

print("Loading Bengaluru dataset...")

df = pd.read_parquet(INPUT_FILE)

print(f"Rows Loaded: {len(df):,}")

# =========================================
# FEATURE ENGINEERING
# =========================================

print("\nCreating features...")

df = create_features(df)

# =========================================
# TARGET COLUMN
# =========================================

TARGET = "CrimeGroup_Name"

FEATURES = [
    "Latitude",
    "Longitude",
    "day",
    "month",
    "year",
    "weekday",
    "is_weekend"
]

# =========================================
# REMOVE MISSING
# =========================================

df = df.dropna(
    subset=FEATURES + [TARGET]
)

print(f"\nRows After Cleaning: {len(df):,}")

# =========================================
# FEATURES + LABELS
# =========================================

X = df[FEATURES]

encoder = LabelEncoder()

y = encoder.fit_transform(
    df[TARGET]
)

# =========================================
# SPLIT DATA
# =========================================

print("\nSplitting train/test data...")

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# =========================================
# TRAIN MODEL
# =========================================

print("\nTraining XGBoost model...")

model = XGBClassifier(
    n_estimators=150,
    max_depth=8,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    tree_method="hist",
    eval_metric="mlogloss"
)

model.fit(
    X_train,
    y_train
)

# =========================================
# EVALUATION
# =========================================

print("\nEvaluating model...")

preds = model.predict(X_test)

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        preds
    )
)

# =========================================
# SAVE MODEL
# =========================================

print("\nSaving model...")

joblib.dump(
    model,
    MODEL_DIR / "crime_classifier.pkl"
)

joblib.dump(
    encoder,
    MODEL_DIR / "label_encoder.pkl"
)

print("\nSUCCESS")
print("\nModel Saved Successfully")