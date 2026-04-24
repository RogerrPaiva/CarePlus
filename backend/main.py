from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services import (
    AuthService,
    DuplicateResourceError,
    InvalidCredentialsError,
    StorageError,
    UserNotFoundError,
)

app = FastAPI()
service = AuthService()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SignupRequest(BaseModel):
    full_name: str
    email: str
    phone: str
    cpf: str
    birth_date: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class CompleteOnboardingRequest(BaseModel):
    selected_plan: str


@app.get("/")
def health_check():
    return {"status": "API CarePlus funcionando"}


@app.post("/auth/register")
def register_user(payload: SignupRequest):
    try:
        user = service.register_user(payload)

        return {
            "message": "Conta criada com sucesso",
            "user": user,
        }

    except DuplicateResourceError as error:
        raise HTTPException(status_code=409, detail=error.message)

    except (ValueError, StorageError) as error:
        raise HTTPException(status_code=400, detail=str(error))


@app.post("/auth/login")
def login_user(payload: LoginRequest):
    try:
        user = service.authenticate_user(payload)

        return {
            "message": "Login realizado com sucesso",
            "user": user,
        }

    except InvalidCredentialsError as error:
        raise HTTPException(status_code=401, detail=error.message)

    except (ValueError, StorageError) as error:
        raise HTTPException(status_code=400, detail=str(error))


@app.post("/users/{user_id}/onboarding-complete")
def complete_user_onboarding(user_id: str, payload: CompleteOnboardingRequest):
    try:
        user = service.complete_onboarding(user_id, payload)

        return {
            "message": "Onboarding concluido com sucesso",
            "user": user,
        }

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))

    except UserNotFoundError as error:
        raise HTTPException(status_code=404, detail=error.message)

    except StorageError as error:
        raise HTTPException(status_code=400, detail=str(error))
