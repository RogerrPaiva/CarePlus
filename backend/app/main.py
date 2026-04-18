from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .schemas import AuthResponse, LoginRequest, MessageResponse, SignupRequest, UpdateUserRequest, UserResponse
from .services import AuthService, DuplicateResourceError, InvalidCredentialsError, StorageError, UserNotFoundError

app = FastAPI(
  title="Care Plus Backend",
  version="0.1.0",
  summary="API local para cadastro e login do Care Plus",
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

service = AuthService()


@app.get("/", response_model=MessageResponse)
def read_root():
  return {"message": "Care Plus backend ativo."}


@app.get("/health", response_model=MessageResponse)
def health_check():
  return {"message": "ok"}


@app.post("/auth/signup", response_model=AuthResponse, status_code=201)
def signup(payload: SignupRequest):
  try:
    user = service.register_user(payload)
  except DuplicateResourceError as error:
    raise HTTPException(status_code=409, detail=error.message) from error
  except ValueError as error:
    raise HTTPException(status_code=400, detail=str(error)) from error
  except StorageError as error:
    raise HTTPException(status_code=500, detail=str(error)) from error

  return {
    "message": "Conta criada com sucesso.",
    "next_step_route": "/onboarding",
    "user": user,
  }


@app.post("/auth/login", response_model=AuthResponse)
def login(payload: LoginRequest):
  try:
    user = service.authenticate_user(payload)
  except InvalidCredentialsError as error:
    raise HTTPException(status_code=401, detail=error.message) from error
  except ValueError as error:
    raise HTTPException(status_code=400, detail=str(error)) from error
  except StorageError as error:
    raise HTTPException(status_code=500, detail=str(error)) from error

  return {
    "message": "Login realizado com sucesso.",
    "next_step_route": "/onboarding",
    "user": user,
  }


@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: str):
  try:
    return service.get_user(user_id)
  except UserNotFoundError as error:
    raise HTTPException(status_code=404, detail=error.message) from error
  except StorageError as error:
    raise HTTPException(status_code=500, detail=str(error)) from error


@app.put("/users/{user_id}", response_model=AuthResponse)
def update_user(user_id: str, payload: UpdateUserRequest):
  try:
    user = service.update_user(user_id, payload)
  except UserNotFoundError as error:
    raise HTTPException(status_code=404, detail=error.message) from error
  except DuplicateResourceError as error:
    raise HTTPException(status_code=409, detail=error.message) from error
  except ValueError as error:
    raise HTTPException(status_code=400, detail=str(error)) from error
  except StorageError as error:
    raise HTTPException(status_code=500, detail=str(error)) from error

  return {
    "message": "Dados atualizados com sucesso.",
    "next_step_route": None,
    "user": user,
  }
