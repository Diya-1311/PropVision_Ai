from fastapi import APIRouter
from typing import List
from models import CommunityDeal
import uuid

router = APIRouter()

DEALS = []

@router.post("/societies/{society_id}/deals", response_model=CommunityDeal)
def create_deal(society_id: str, deal_request: dict):
    # This expects something like:
    # { "service_category": "Home Cleaning", "provider_id": "prov-1", "participating_households": 18, 
    #   "individual_price": 1500, "group_price": 1150 }
    
    new_deal = CommunityDeal(
        id=f"deal-{uuid.uuid4().hex[:6]}",
        society_id=society_id,
        service_category=deal_request["service_category"],
        provider_id=deal_request["provider_id"],
        participating_households=deal_request["participating_households"],
        individual_price=deal_request["individual_price"],
        group_price=deal_request["group_price"],
        status="Open for residents"
    )
    DEALS.append(new_deal)
    return new_deal

@router.get("/societies/{society_id}/deals", response_model=List[CommunityDeal])
def get_society_deals(society_id: str):
    return [d for d in DEALS if d.society_id == society_id]
