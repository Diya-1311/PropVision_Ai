from fastapi import APIRouter
from pydantic import BaseModel
from data import PROVIDERS

router = APIRouter()

class FeedbackRequest(BaseModel):
    provider_id: str
    rating: int
    review: str
    hire_again: bool

FEEDBACKS = []

@router.post("/feedback")
def submit_feedback(feedback: FeedbackRequest):
    FEEDBACKS.append(feedback)
    
    # Simple logic to update provider rating for MVP
    for p in PROVIDERS:
        if p.id == feedback.provider_id:
            # Fake rolling average to show it works
            p.rating = round(((p.rating * 10) + feedback.rating) / 11, 1)
            break
            
    return {"message": "Feedback received.", "status": "success"}
