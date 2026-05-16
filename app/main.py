from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router

app = FastAPI(
    title="Crime Prediction API",
    description="AI-powered Crime Prediction Backend",
    version="0.5"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(predict_router)

# Root route
@app.get("/")
def home():
    return {
        "message": "Crime Prediction API Running",
        "version": "0.5",
        "status": "online"
    }

# Health check
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "server": "running"
    }