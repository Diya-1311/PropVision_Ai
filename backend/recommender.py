from models import Property, PropertyPreferences, RecommendedProperty, ServiceProvider, ServiceRequest, RecommendedProvider
from typing import List

# Pre-defined Location distances (mocking a real map distance for scoring)
LOCATIONS = ["Gota", "Chandkheda", "Bopal", "Thaltej", "SG Highway", "Satellite", "Prahlad Nagar", "Vastrapur"]
# Mock distance map (0 to 10 scale, smaller is closer)
DISTANCE_MAP = {
    "Gota": {"Gota": 0, "Chandkheda": 2, "SG Highway": 3, "Thaltej": 4, "Bopal": 6, "Satellite": 7, "Vastrapur": 5, "Prahlad Nagar": 8},
    "Bopal": {"Gota": 6, "Chandkheda": 8, "SG Highway": 4, "Thaltej": 3, "Bopal": 0, "Satellite": 4, "Vastrapur": 5, "Prahlad Nagar": 4},
    # Defaulting missing keys to a medium distance (5) for simplicity in prototype
}

def get_distance(loc1: str, loc2: str) -> float:
    if loc1 == loc2:
        return 0
    return DISTANCE_MAP.get(loc1, {}).get(loc2, DISTANCE_MAP.get(loc2, {}).get(loc1, 5))

def recommend_properties(preferences: PropertyPreferences, properties: List[Property]) -> List[RecommendedProperty]:
    recommended = []
    
    # Weights
    weights = {
        "Budget": 30,
        "Location": 25,
        "PropertyType": 15,
        "Area": 10,
        "Bedrooms": 10,
        "Amenities": 10
    }
    
    for prop in properties:
        score = 0
        feature_scores = {}
        explanation = []
        
        # 1. Budget (30 points)
        if preferences.budget_min <= prop.price <= preferences.budget_max:
            s = 30
            exp = "✓ Within your budget"
        else:
            diff = min(abs(prop.price - preferences.budget_max), abs(prop.price - preferences.budget_min))
            penalty = (diff / preferences.budget_max) * 30
            s = max(0, 30 - penalty)
            exp = "x Slightly outside budget" if s > 15 else "x Outside budget"
            
        feature_scores["Budget"] = {"score": round(s, 1), "max": 30, "explanation": exp}
        score += s
        if s >= 20: explanation.append(exp)
        
        # 2. Location (25 points)
        dist = get_distance(preferences.location, prop.location)
        s = max(0, 25 - (dist * 2.5))
        if dist == 0:
            exp = "✓ Preferred location"
        elif dist <= 3:
            exp = "✓ Close to preferred location"
        else:
            exp = "x Far from preferred location"
        
        feature_scores["Location"] = {"score": round(s, 1), "max": 25, "explanation": exp}
        score += s
        if s >= 15: explanation.append(exp)
            
        # 3. Property Type (15 points)
        s = 15 if prop.property_type.lower() == preferences.property_type.lower() else 0
        exp = f"✓ Matches {preferences.property_type} requirement" if s == 15 else f"x Not a {preferences.property_type}"
        feature_scores["Property Type"] = {"score": s, "max": 15, "explanation": exp}
        score += s
        if s == 15: explanation.append(exp)
        
        # 4. Area (10 points)
        if prop.area >= preferences.min_area:
            s = 10
            exp = "✓ Area preference satisfied"
        else:
            s = max(0, 10 - ((preferences.min_area - prop.area) / preferences.min_area) * 10)
            exp = "x Smaller than required area"
        feature_scores["Area"] = {"score": round(s, 1), "max": 10, "explanation": exp}
        score += s
        if s >= 8: explanation.append(exp)
            
        # 5. Bedrooms (10 points)
        s = 10 if prop.bedrooms == preferences.bedrooms else max(0, 10 - abs(prop.bedrooms - preferences.bedrooms) * 3)
        exp = f"✓ Matches {preferences.bedrooms} BHK requirement" if s == 10 else f"~ {prop.bedrooms} BHK instead of {preferences.bedrooms}"
        feature_scores["Bedrooms"] = {"score": round(s, 1), "max": 10, "explanation": exp}
        score += s
        if s >= 7: explanation.append(exp)
        
        # 6. Amenities (10 points)
        if not preferences.amenities:
            s = 10
            exp = "✓ No specific amenities required"
        else:
            matched_amenities = set(prop.amenities).intersection(set(preferences.amenities))
            s = (len(matched_amenities) / len(preferences.amenities)) * 10
            exp = f"✓ {len(matched_amenities)}/{len(preferences.amenities)} amenities available"
        feature_scores["Amenities"] = {"score": round(s, 1), "max": 10, "explanation": exp}
        score += s
        if s >= 5: explanation.append(exp)
        
        recommended.append(RecommendedProperty(
            property=prop,
            score=round(score, 1),
            feature_scores=feature_scores,
            explanation=explanation
        ))
        
    # Sort by score descending
    recommended.sort(key=lambda x: x.score, reverse=True)
    return recommended


def recommend_providers(request: ServiceRequest, providers: List[ServiceProvider]) -> List[RecommendedProvider]:
    recommended = []
    
    # Filter by category first
    category_providers = [p for p in providers if p.category.lower() == request.service_category.lower()]
    
    for prov in category_providers:
        score = 0
        feature_scores = {}
        explanation = []
        
        # Skill match (25%)
        # In a real scenario, this would use NLP to match 'additional_requirements' with 'skills'
        s = 25
        exp = "✓ Required skill match"
        feature_scores["Skill Match"] = {"score": s, "max": 25, "explanation": exp}
        score += s
        explanation.append(exp)
        
        # Distance (20%)
        dist = get_distance(request.location, prov.location)
        s = max(0, 20 - (dist * 2))
        dist_km = round(max(1.0, dist * 1.5), 1)
        exp = f"✓ {dist_km} km from society"
        feature_scores["Distance"] = {"score": round(s, 1), "max": 20, "explanation": exp}
        score += s
        if s >= 10: explanation.append(exp)
            
        # Availability (15%)
        matched_days = set(prov.availability_days).intersection(set(request.preferred_days))
        if request.preferred_days:
            s = (len(matched_days) / len(request.preferred_days)) * 15
            exp = "✓ Available on requested days" if s == 15 else "x Partial availability"
        else:
            s = 15
            exp = "✓ Available"
        feature_scores["Availability"] = {"score": round(s, 1), "max": 15, "explanation": exp}
        score += s
        if s >= 10: explanation.append(exp)
            
        # Rating (15%)
        s = (prov.rating / 5.0) * 15
        exp = f"✓ {prov.rating} rating"
        feature_scores["Rating"] = {"score": round(s, 1), "max": 15, "explanation": exp}
        score += s
        explanation.append(exp)
        
        # Experience (10%)
        s = min(10, prov.experience_years) # Cap at 10 years for scoring
        exp = f"✓ {prov.experience_years} years experience"
        feature_scores["Experience"] = {"score": round(s, 1), "max": 10, "explanation": exp}
        score += s
        explanation.append(exp)
        
        # Price compatibility (10%)
        if prov.base_price <= request.budget:
            s = 10
            exp = "✓ Within budget"
        else:
            diff = prov.base_price - request.budget
            s = max(0, 10 - (diff / request.budget) * 10)
            exp = "x Outside budget"
        feature_scores["Price"] = {"score": round(s, 1), "max": 10, "explanation": exp}
        score += s
        if s >= 5: explanation.append(exp)
            
        # Verification (5%)
        s = 5 if prov.verified else 0
        exp = "✓ Verified provider" if prov.verified else "x Not verified"
        feature_scores["Verification"] = {"score": s, "max": 5, "explanation": exp}
        score += s
        if s == 5: explanation.append(exp)
        
        recommended.append(RecommendedProvider(
            provider=prov,
            score=round(score, 1),
            feature_scores=feature_scores,
            explanation=explanation
        ))
        
    recommended.sort(key=lambda x: x.score, reverse=True)
    return recommended
