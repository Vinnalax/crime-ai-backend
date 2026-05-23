from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router
from app.routes.system import router as system_router
from app.routes.heatmap import router as heatmap_router
from app.routes.hotspots import router as hotspot_router
from app.routes.analytics import router as analytics_router
from app.routes.report_crime import router as report_router
from app.your_model_file import load_model

app = FastAPI(
    title="Crime Prediction API",
    description="AI-powered Crime Prediction Backend",
    version="0.5"
)



# =========================
# CORS CONFIGURATION
# =========================


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():

    load_model()

    print("MODEL PRELOADED")
    
# Routes
app.include_router(predict_router)
app.include_router(system_router)
app.include_router(heatmap_router)
app.include_router(hotspot_router)
app.include_router(analytics_router)
app.include_router(report_router)

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

@app.get("/cors-test")
def cors_test():
    return {"message": "cors working"}