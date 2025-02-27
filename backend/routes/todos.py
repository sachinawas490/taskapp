from fastapi import APIRouter, HTTPException,Depends
from database import db
from models import Todo
from bson import ObjectId
from utils import verify_token
router = APIRouter(prefix="/todos", tags=["Todos"])

# Todo Collection
todos_collection = db["todos"]
@router.post("/todo")
async def create_todo(todo:Todo,users:str=Depends(verify_token)):
    print("type of todo",type(todo.todo))
    print("Value of the users", users)
    return users

# @router.post("/")
# async def create_todo(todo: Todo):
#     user_id = ObjectId(todo.user_id)
#     new_todo = {"todo": todo.todo, "completed": todo.completed, "user_id": user_id}
#     todos_collection.insert_one(new_todo)
#     return {"message": "Todo created successfully"}

# @router.get("/{user_id}")
# async def get_todos(user_id: str):
#     user_id = ObjectId(user_id)
#     todos = list(todos_collection.find({"user_id": user_id}, {"_id": 0}))
#     return todos

# @router.put("/{todo_id}")
# async def update_todo(todo_id: str, todo: Todo):
#     todo_id = ObjectId(todo_id)
#     todos_collection.update_one({"_id": todo_id}, {"$set": {"todo": todo.todo, "completed": todo.completed}})
#     return {"message": "Todo updated successfully"}

# @router.delete("/{todo_id}")
# async def delete_todo(todo_id: str):
#     todo_id = ObjectId(todo_id)
#     todos_collection.delete_one({"_id": todo_id})
#     return {"message": "Todo deleted successfully"}
