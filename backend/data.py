from models import Property, Society, ServiceProvider

# Seeded Properties
PROPERTIES = [
    Property(
        id="prop-1",
        name="Skyline Apartments",
        location="Gota",
        price=6000000,
        property_type="Apartment",
        area=1200,
        bedrooms=2,
        amenities=["Parking", "Gym", "Security", "Pool"],
        image_url="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80"
    ),
    Property(
        id="prop-2",
        name="Green Meadows",
        location="Bopal",
        price=8500000,
        property_type="Apartment",
        area=1500,
        bedrooms=3,
        amenities=["Parking", "Gym", "Security", "Clubhouse", "Garden"],
        image_url="https://images.unsplash.com/photo-1515263487990-61b07816b324?w=500&q=80"
    ),
    Property(
        id="prop-3",
        name="Urban Heights",
        location="Gota",
        price=5200000,
        property_type="Apartment",
        area=1050,
        bedrooms=2,
        amenities=["Parking", "Security"],
        image_url="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80"
    ),
    Property(
        id="prop-4",
        name="Satellite Splendor",
        location="Satellite",
        price=12000000,
        property_type="Apartment",
        area=2000,
        bedrooms=4,
        amenities=["Parking", "Gym", "Security", "Pool", "Clubhouse", "Tennis Court"],
        image_url="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80"
    ),
    Property(
        id="prop-5",
        name="Prahlad Nagar Villas",
        location="Prahlad Nagar",
        price=25000000,
        property_type="Villa",
        area=3500,
        bedrooms=4,
        amenities=["Parking", "Private Garden", "Security", "Pool"],
        image_url="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80"
    ),
    Property(
        id="prop-6",
        name="Chandkheda Comforts",
        location="Chandkheda",
        price=4500000,
        property_type="Apartment",
        area=900,
        bedrooms=2,
        amenities=["Parking"],
        image_url="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=500&q=80"
    ),
    Property(
        id="prop-7",
        name="Thaltej Towers",
        location="Thaltej",
        price=10500000,
        property_type="Apartment",
        area=1800,
        bedrooms=3,
        amenities=["Parking", "Gym", "Security", "Pool"],
        image_url="https://images.unsplash.com/photo-1493809842364-78817add7ff6?w=500&q=80"
    ),
    Property(
        id="prop-8",
        name="Vastrapur Views",
        location="Vastrapur",
        price=9000000,
        property_type="Apartment",
        area=1400,
        bedrooms=3,
        amenities=["Parking", "Security", "Lake View"],
        image_url="https://images.unsplash.com/photo-1502672260266-1c1c2b936b1b?w=500&q=80"
    ),
    Property(
        id="prop-9",
        name="SG Highway Suites",
        location="SG Highway",
        price=7500000,
        property_type="Apartment",
        area=1300,
        bedrooms=2,
        amenities=["Parking", "Gym", "Security", "Commercial Access"],
        image_url="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80"
    ),
    Property(
        id="prop-10",
        name="Gota Greens",
        location="Gota",
        price=6800000,
        property_type="Apartment",
        area=1250,
        bedrooms=3,
        amenities=["Parking", "Gym", "Security", "Garden"],
        image_url="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&q=80"
    )
]

# Seeded Societies
SOCIETIES = [
    Society(
        id="soc-1",
        name="Green Valley Society",
        location="Gota",
        residents_count=420,
        amenities=["Gym", "Pool", "Park"],
        active_service_requests=12,
        community_deals_count=3
    ),
    Society(
        id="soc-2",
        name="Bopal Orchids",
        location="Bopal",
        residents_count=350,
        amenities=["Gym", "Clubhouse"],
        active_service_requests=8,
        community_deals_count=1
    ),
    Society(
        id="soc-3",
        name="Satellite Sunbird",
        location="Satellite",
        residents_count=600,
        amenities=["Pool", "Tennis Court", "Park"],
        active_service_requests=25,
        community_deals_count=5
    ),
    Society(
        id="soc-4",
        name="Prahlad Nagar Enclave",
        location="Prahlad Nagar",
        residents_count=150,
        amenities=["Gym", "Private Park"],
        active_service_requests=5,
        community_deals_count=0
    ),
    Society(
        id="soc-5",
        name="Vastrapur Residency",
        location="Vastrapur",
        residents_count=280,
        amenities=["Lake View Park", "Gym"],
        active_service_requests=15,
        community_deals_count=2
    )
]

# Seeded Service Providers
PROVIDERS = [
    ServiceProvider(
        id="prov-1",
        name="Ramesh Kumar",
        category="Home Cleaning",
        location="Gota",
        rating=4.8,
        experience_years=5,
        base_price=1200,
        verified=True,
        skills=["Deep Cleaning", "Floor Scrubbing", "Dusting"],
        availability_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        image_url="https://ui-avatars.com/api/?name=Ramesh+Kumar&background=random"
    ),
    ServiceProvider(
        id="prov-2",
        name="Suresh Patel",
        category="Home Cleaning",
        location="Chandkheda",
        rating=4.2,
        experience_years=2,
        base_price=1000,
        verified=False,
        skills=["Standard Cleaning", "Dusting"],
        availability_days=["Monday", "Wednesday", "Friday"],
        image_url="https://ui-avatars.com/api/?name=Suresh+Patel&background=random"
    ),
    ServiceProvider(
        id="prov-3",
        name="CleanCare Services",
        category="Home Cleaning",
        location="SG Highway",
        rating=4.9,
        experience_years=8,
        base_price=1500,
        verified=True,
        skills=["Deep Cleaning", "Sanitization", "Pest Control"],
        availability_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        image_url="https://ui-avatars.com/api/?name=CleanCare+Services&background=random"
    ),
    ServiceProvider(
        id="prov-4",
        name="Mahesh Plumbers",
        category="Plumber",
        location="Bopal",
        rating=4.5,
        experience_years=10,
        base_price=500,
        verified=True,
        skills=["Leakage Repair", "Pipe Fitting", "Bathroom Fitting"],
        availability_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        image_url="https://ui-avatars.com/api/?name=Mahesh+Plumbers&background=random"
    ),
    ServiceProvider(
        id="prov-5",
        name="QuickFix Electricals",
        category="Electrician",
        location="Satellite",
        rating=4.7,
        experience_years=6,
        base_price=400,
        verified=True,
        skills=["Wiring", "Appliance Repair", "Lighting"],
        availability_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        image_url="https://ui-avatars.com/api/?name=QuickFix+Electricals&background=random"
    ),
    ServiceProvider(
        id="prov-6",
        name="Anita Sharma",
        category="Cook",
        location="Prahlad Nagar",
        rating=4.9,
        experience_years=12,
        base_price=3500,
        verified=True,
        skills=["Gujarati Thali", "Punjabi", "Healthy Meals"],
        availability_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        image_url="https://ui-avatars.com/api/?name=Anita+Sharma&background=random"
    ),
    ServiceProvider(
        id="prov-7",
        name="GreenThumb Gardeners",
        category="Gardener",
        location="Vastrapur",
        rating=4.6,
        experience_years=7,
        base_price=800,
        verified=True,
        skills=["Landscaping", "Pruning", "Plant Care"],
        availability_days=["Tuesday", "Thursday", "Saturday"],
        image_url="https://ui-avatars.com/api/?name=GreenThumb+Gardeners&background=random"
    ),
    ServiceProvider(
        id="prov-8",
        name="CoolAir Tech",
        category="AC Technician",
        location="Thaltej",
        rating=4.3,
        experience_years=4,
        base_price=600,
        verified=False,
        skills=["AC Servicing", "Installation", "Gas Filling"],
        availability_days=["Monday", "Wednesday", "Friday", "Sunday"],
        image_url="https://ui-avatars.com/api/?name=CoolAir+Tech&background=random"
    ),
    ServiceProvider(
        id="prov-9",
        name="SafeDrive Solutions",
        category="Driver",
        location="Gota",
        rating=4.8,
        experience_years=15,
        base_price=15000,
        verified=True,
        skills=["Automatic", "Manual", "Outstation"],
        availability_days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        image_url="https://ui-avatars.com/api/?name=SafeDrive+Solutions&background=random"
    ),
    ServiceProvider(
        id="prov-10",
        name="Vijay Cleaners",
        category="Home Cleaning",
        location="Bopal",
        rating=4.1,
        experience_years=3,
        base_price=1100,
        verified=False,
        skills=["Dusting", "Mopping"],
        availability_days=["Monday", "Tuesday", "Thursday", "Friday"],
        image_url="https://ui-avatars.com/api/?name=Vijay+Cleaners&background=random"
    )
]

# Seeded Society Demand
SOCIETY_DEMANDS = {
    "soc-1": [
        {"category": "Home Cleaning", "count": 18},
        {"category": "Plumber", "count": 7},
        {"category": "Electrician", "count": 11},
        {"category": "Gardener", "count": 9}
    ],
    "soc-2": [
        {"category": "Cook", "count": 12},
        {"category": "Home Cleaning", "count": 15},
    ]
}
