
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users, todos

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include Routers
app.include_router(users.router)
app.include_router(todos.router)

@app.get("/")
def home():
    return {"message": "Welcome to the FastAPI Todo App"}
