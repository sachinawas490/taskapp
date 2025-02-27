from fastapi import APIRouter, HTTPException
from database import db
from models import User, login_user
from passlib.context import CryptContext
from utils import verify_token,create_token
router = APIRouter(prefix="/users", tags=["Users"])

# User Collection
users_collection = db["users"]
hashing_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/register")
async def register(user: User):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_password = hashing_context.hash(user.password)
    new_user = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password
    }
    users_collection.insert_one(new_user)
    
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(user: login_user):
    existing_user = users_collection.find_one({"email": user.email})
    print("existing user data is ",existing_user)
    if not existing_user:
        raise HTTPException(status_code=401, detail="Email not found")

    if not hashing_context.verify(user.password, existing_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")  # ✅ Proper error response
    user_data={
            "username": existing_user["username"],
            "email": existing_user["email"],
            "userid":str(existing_user["_id"]),
        }
    token=create_token(user_data)
    return {
        "message": "Login successful",
        "user": user_data,
        "token":token
    }
