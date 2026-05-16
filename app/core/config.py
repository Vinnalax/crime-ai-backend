import os


BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
)


MODEL_DIR = os.path.join(BASE_DIR, "models")


CRIME_MODEL_PATH = os.path.join(
    MODEL_DIR,
    "crime_classifier.pkl"
)


LABEL_ENCODER_PATH = os.path.join(
    MODEL_DIR,
    "label_encoder.pkl"
)