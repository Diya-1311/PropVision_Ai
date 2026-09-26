from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import properties, societies, services, providers, deals, research, feedback

app = FastAPI(title="PropVision AI - API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(properties.router, prefix="/api")
app.include_router(societies.router, prefix="/api")
app.include_router(services.router, prefix="/api")
app.include_router(providers.router, prefix="/api")
app.include_router(deals.router, prefix="/api")
app.include_router(research.router, prefix="/api")
app.include_router(feedback.router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to PropVision AI API"}
