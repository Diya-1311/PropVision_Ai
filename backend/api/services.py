from fastapi import APIRouter
from models import ServiceRequest
from typing import List

router = APIRouter()

# In-memory store for demo
SERVICE_REQUESTS = []

@router.post("/service-requests")
def create_service_request(request: ServiceRequest):
    SERVICE_REQUESTS.append(request)
    return {"message": "Service request created successfully", "status": "success"}

@router.get("/service-requests", response_model=List[ServiceRequest])
def get_service_requests():
    return SERVICE_REQUESTS
