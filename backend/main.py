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
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# MODELS / REQUESTS
# =========================

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


class StartCollectionRequest(BaseModel):
    user_id: str
    device_id: str


class IoTTokenCollectedRequest(BaseModel):
    device_id: str
    event: str = "token_collected"
    points: int = 50


# =========================
# DADOS TEMPORÁRIOS
# Sem banco de dados por enquanto
# =========================

usuarios_pontos = {}

usuarios_missoes = {}

coletas_pendentes = {}


# =========================
# ROTAS GERAIS
# =========================

@app.get("/")
def health_check():
    return {"status": "API CarePlus funcionando"}


# =========================
# AUTH
# =========================

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


# =========================
# ONBOARDING
# =========================

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

# =========================
# PONTOS E MISSÕES CAREPLUS
# =========================

@app.get("/users/{user_id}/points")
def get_user_points(user_id: str):
    if user_id not in usuarios_pontos:
        usuarios_pontos[user_id] = 0

    return {
        "user_id": user_id,
        "points": usuarios_pontos[user_id],
    }


@app.get("/users/{user_id}/mission")
def get_user_mission(user_id: str):
    if user_id not in usuarios_missoes:
        usuarios_missoes[user_id] = {
            "title": "Coletar Token CarePlus",
            "description": "Abra a missão e confirme sua presença no ponto CarePlus.",
            "status": "nao_iniciada",
            "reward_points": 50,
            "device_id": None,
        }

    return {
        "user_id": user_id,
        "mission": usuarios_missoes[user_id],
    }


@app.post("/missions/start-collection")
def start_collection(payload: StartCollectionRequest):
    user_id = payload.user_id
    device_id = payload.device_id

    coletas_pendentes[device_id] = {
        "user_id": user_id,
        "status": "aguardando_totem",
    }

    usuarios_missoes[user_id] = {
        "title": "Coletar Token CarePlus",
        "description": "Aperte o botão no totem para confirmar a coleta do token.",
        "status": "aguardando_totem",
        "reward_points": 50,
        "device_id": device_id,
    }

    if user_id not in usuarios_pontos:
        usuarios_pontos[user_id] = 0

    return {
        "message": "Coleta iniciada. Aguardando confirmação do totem.",
        "user_id": user_id,
        "device_id": device_id,
        "status": "aguardando_totem",
        "pending_collections": coletas_pendentes,
    }


@app.post("/iot/token-collected")
def token_collected(payload: IoTTokenCollectedRequest):
    device_id = payload.device_id

    if device_id not in coletas_pendentes:
        raise HTTPException(
            status_code=404,
            detail="Nenhum usuário aguardando coleta neste totem."
        )

    user_id = coletas_pendentes[device_id]["user_id"]

    if user_id not in usuarios_pontos:
        usuarios_pontos[user_id] = 0

    usuarios_pontos[user_id] += payload.points

    usuarios_missoes[user_id] = {
        "title": "Coletar Token CarePlus",
        "description": "Token coletado com sucesso.",
        "status": "concluida",
        "reward_points": payload.points,
        "device_id": device_id,
    }

    del coletas_pendentes[device_id]

    return {
        "message": "Token coletado com sucesso",
        "user_id": user_id,
        "device_id": device_id,
        "points_added": payload.points,
        "total_points": usuarios_pontos[user_id],
        "mission": usuarios_missoes[user_id],
    }


@app.get("/missions/pending")
def get_pending_collections():
    return {
        "pending_collections": coletas_pendentes
    }


@app.post("/users/{user_id}/mission/reset")
def reset_user_mission(user_id: str):
    usuarios_pontos[user_id] = 0

    usuarios_missoes[user_id] = {
        "title": "Coletar Token CarePlus",
        "description": "Abra a missão e confirme sua presença no ponto CarePlus.",
        "status": "nao_iniciada",
        "reward_points": 50,
        "device_id": None,
    }

    devices_to_remove = []

    for device_id, collection in coletas_pendentes.items():
        if collection["user_id"] == user_id:
            devices_to_remove.append(device_id)

    for device_id in devices_to_remove:
        del coletas_pendentes[device_id]

    return {
        "message": "Missão resetada com sucesso",
        "user_id": user_id,
        "points": usuarios_pontos[user_id],
        "mission": usuarios_missoes[user_id],
        "pending_collections": coletas_pendentes,
    }
