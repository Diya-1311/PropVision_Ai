from fastapi import APIRouter
from typing import List
from models import Property, PropertyPreferences, RecommendedProperty
from data import PROPERTIES
from recommender import recommend_properties

router = APIRouter()

@router.get("/properties", response_model=List[Property])
def get_properties():
    return PROPERTIES

@router.post("/recommend/properties", response_model=List[RecommendedProperty])
def get_property_recommendations(preferences: PropertyPreferences):
    return recommend_properties(preferences, PROPERTIES)
