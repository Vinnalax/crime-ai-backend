import logging
from pathlib import Path


# =========================
# CREATE LOG DIRECTORY
# =========================

LOG_DIR = Path("logs")

LOG_DIR.mkdir(exist_ok=True)

LOG_FILE = LOG_DIR / "backend.log"


# =========================
# LOGGER CONFIGURATION
# =========================

logging.basicConfig(
    level=logging.INFO,

    format="%(asctime)s - %(levelname)s - %(message)s",

    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)


logger = logging.getLogger("crime_ai")