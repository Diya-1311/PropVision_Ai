from fastapi import APIRouter, HTTPException
from typing import List
from models import Society, SocietyDemandResponse, ServiceDemand
from data import SOCIETIES, SOCIETY_DEMANDS

router = APIRouter()

@router.get("/societies", response_model=List[Society])
def get_societies():
    return SOCIETIES

@router.get("/societies/{society_id}", response_model=Society)
def get_society(society_id: str):
    for s in SOCIETIES:
        if s.id == society_id:
            return s
    raise HTTPException(status_code=404, detail="Society not found")

@router.get("/societies/{society_id}/demand", response_model=SocietyDemandResponse)
def get_society_demand(society_id: str):
    society = get_society(society_id)
    raw_demands = SOCIETY_DEMANDS.get(society_id, [])
    
    demands = []
    # Mocking current average prices and potential group prices for the demo
    base_prices = {
        "Home Cleaning": 1500,
        "Plumber": 500,
        "Electrician": 400,
        "Gardener": 800,
        "Cook": 3500
    }
    
    for rd in raw_demands:
        cat = rd["category"]
        count = rd["count"]
        curr_price = base_prices.get(cat, 1000)
        
        # Calculate group discount based on volume (fake economics for MVP)
        if count >= 15: discount = 0.25
        elif count >= 10: discount = 0.15
        elif count >= 5: discount = 0.10
        else: discount = 0.05
        
        group_price = curr_price * (1 - discount)
        
        demands.append(ServiceDemand(
            service_category=cat,
            households_interested=count,
            current_avg_price=curr_price,
            potential_group_price=round(group_price, 2),
            estimated_savings_percentage=round(discount * 100, 1)
        ))
        
    return SocietyDemandResponse(
        society_id=society.id,
        society_name=society.name,
        demands=demands
    )
