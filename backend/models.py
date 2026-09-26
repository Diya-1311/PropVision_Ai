from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class Property(BaseModel):
    id: str
    name: str
    location: str
    price: float
    property_type: str
    area: float
    bedrooms: int
    amenities: List[str]
    image_url: str

class PropertyPreferences(BaseModel):
    location: str
    budget_min: float
    budget_max: float
    property_type: str
    bedrooms: int
    min_area: float
    buy_or_rent: str
    amenities: List[str]
    priorities: List[str] # e.g., ["price", "location", "area", "amenities"]

class RecommendedProperty(BaseModel):
    property: Property
    score: float
    feature_scores: Dict[str, Dict[str, Any]] # e.g., {"Budget": {"score": 30, "max": 30, "explanation": "Within your budget"}}
    explanation: List[str]

class Society(BaseModel):
    id: str
    name: str
    location: str
    residents_count: int
    amenities: List[str]
    active_service_requests: int
    community_deals_count: int

class ServiceProvider(BaseModel):
    id: str
    name: str
    category: str
    location: str
    rating: float
    experience_years: int
    base_price: float
    verified: bool
    skills: List[str]
    availability_days: List[str]
    image_url: str

class ServiceRequest(BaseModel):
    society_id: str
    service_category: str
    required_date: str
    preferred_days: List[str]
    budget: float
    frequency: str
    location: str
    additional_requirements: str

class RecommendedProvider(BaseModel):
    provider: ServiceProvider
    score: float
    feature_scores: Dict[str, Dict[str, Any]]
    explanation: List[str]

class ServiceDemand(BaseModel):
    service_category: str
    households_interested: int
    current_avg_price: float
    potential_group_price: float
    estimated_savings_percentage: float

class SocietyDemandResponse(BaseModel):
    society_id: str
    society_name: str
    demands: List[ServiceDemand]

class CommunityDeal(BaseModel):
    id: str
    society_id: str
    service_category: str
    provider_id: str
    participating_households: int
    individual_price: float
    group_price: float
    status: str # "Open for residents", "Active"
