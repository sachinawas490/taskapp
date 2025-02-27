from pymongo import MongoClient

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017/")
db = client["todo_db"]

print("✅ Successfully connected to the database")
