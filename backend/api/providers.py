from fastapi import APIRouter
from typing import List
from models import ServiceProvider, ServiceRequest, RecommendedProvider
from data import PROVIDERS
from recommender import recommend_providers

router = APIRouter()

@router.get("/providers", response_model=List[ServiceProvider])
def get_providers():
    return PROVIDERS

@router.post("/recommend/providers", response_model=List[RecommendedProvider])
def get_provider_recommendations(request: ServiceRequest):
    return recommend_providers(request, PROVIDERS)
