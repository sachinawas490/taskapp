from fastapi import APIRouter, HTTPException,Depends
from fastapi.responses import JSONResponse
from database import db
from models import Todo
from bson import ObjectId
from utils import verify_token
router = APIRouter(prefix="/todos", tags=["Todos"])

# Todo Collection
todos_collection = db["todos"]
@router.post("/todo")
async def create_todo(todo:Todo,users:str=Depends(verify_token)):
    if not todo.todo:
        raise HTTPException(status_code=401,detail="write valid todo")
    else:
        try:
            user_id=ObjectId(users["userid"]) 
            new_todo={"todo":todo.todo,"completed":todo.completed,"userid":user_id}
            todos_collection.insert_one(new_todo)
            return JSONResponse(status_code=201,content={"message":"todo added successfully done"})
        except:
            raise HTTPException(status_code=401,detail="error occurs during adding todo in db ")
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse

@router.get("/todo")
async def get_all_todo(users: dict = Depends(verify_token))->list:
    try:
        userid = users["userid"]
        object_id = ObjectId(userid)  # Convert user ID to ObjectId

        # ✅ Fetch data asynchronously
        response_cursor = todos_collection.find({"userid": object_id},{"id":0})
        response =  response_cursor.to_list(length=100)

        # ✅ Convert all ObjectId fields to strings
        for todo in response:
            todo["_id"] = str(todo["_id"])  # Convert ObjectId to string
            todo["userid"]=str(todo["userid"])
        
        return JSONResponse(status_code=200, content={"message": "Todos fetched successfully", "data": response})

    except Exception as e:
        print("Error occurred during get:", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.put("/todo/{id}")
async def update(id:str,data:Todo,users:str=Depends(verify_token)):
    # print(id,"  ",users,"  ",data)  
    try:
        userid=ObjectId(id)
        users=todos_collection.update_one({"_id": userid}, {"$set": {"todo": data.todo, "completed": data.completed}})
        print("users------------------",users)
        return JSONResponse(status_code=200,content={"message":"todo modification successfully done"})
    except:
        print("error occurs")


@router.delete("/todo/{id}")
def delete_todo(id:str,users:str=Depends(verify_token)):
    try:
        userid=ObjectId(id)
        todo_deleted=todos_collection.delete_one({"_id":userid})
        print("delete the todo",todo_deleted)
        return JSONResponse(status_code=200,content={"message":"todo deleted successfullty done"})
    except Exception as e:
        print("error ", e)




















# @router.get("/todo")
# async def get_all_todo(users:str=Depends(verify_token)):
#     try:
#         userid=ObjectId(users["userid"])
#         print("--------------------   ",userid)
#         response = await todos_collection.find({"_id": userid}).to_list(length=None)
#         print("response ---- ")
#     except:
#         print("error occus during ger")
    
# @router.post("/")
# async def create_todo(todo: Todo):
#     user_id = ObjectId(todo.user_id)
#     new_todo = {"todo": todo.todo, "completed": todo.completed, "user_id": user_id}
#     todos_collection.insert_one(new_todo)
#     return {"message": "Todo created successfully"}

@router.get("/{user_id}")
async def get_todos(user_id: str):
    user_id = ObjectId(user_id)
    todos = list(todos_collection.find({"user_id": user_id}, {"_id": 0}))
    return todos

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
