from fastapi import APIRouter, HTTPException
from database import db
from models import User,login_user

router = APIRouter(prefix="/users", tags=["Users"])

# User Collection
users_collection = db["users"]

@router.post("/register")
async def register(user: User):
    print(user)
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="email already exists")
    
    new_user = {"username": user.username,"email":user.email, "password": user.password}
    users_collection.insert_one(new_user)
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(user: login_user):
    existing_user = users_collection.find_one({"username": user.email, "password": user.password})
    if not existing_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {"message": "Login successful"}



# from fastapi import APIRouter, HTTPException
# from database import db
# from models import User,login_user
# from passlib.context import CryptContext
# router = APIRouter(prefix="/users", tags=["Users"])

# # User Collection
# users_collection = db["users"]


# # hashing password 
# hashing_context=CryptContext(schemes=["bcrypt"],deprecated="auto")

# @router.post("/register")
# async def register(user: User):
#     print(user)
#     check_email=await users_collection.find_one({"email": user.email})
#     if check_email:
#         raise HTTPException(status_code=400, detail="email already exists")
#     hashed_password=hashing_context(user.password)
#     new_user = {"username": user.username,"email":user.email, "password": hashed_password}
#     users_collection.insert_one(new_user)
#     return {"message": "User registered successfully"}

# @router.post("/login")
# async def login(user: login_user):
#     existing_user = users_collection.find_one({"email": user.email, "password": user.password})
#     if not existing_user:
#         raise HTTPException(status_code=401, detail="Invalid credentials")
    
#     return {"message": "Login successful"}
