from pydantic import BaseModel
from typing import Optional
from bson import ObjectId

# User Model
class User(BaseModel):
    username: str
    email: str
    password:str
# login 
class login_user(BaseModel):
    email:str
    password:str
# Todo Model
class Todo(BaseModel):
    todo: str
    completed: bool = False
    userid: str=None  # Storing user_id as a string (ObjectId)
