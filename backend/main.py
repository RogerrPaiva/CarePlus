from datetime import datetime

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


class MundoProgressRequest(BaseModel):
    mundo_escolhido: str | None = None
    quiz_finalizado: bool | None = None
    porcentagem_base: int | None = None
    bonus_saude: int | None = None
    streak_dias: int | None = None
    ultima_atividade: str | None = None
    data_missoes: str | None = None
    missoes_concluidas_hoje: list[str] | None = None


class CompleteDailyMissionRequest(BaseModel):
    mission_id: str
    title: str
    points: int = 10
    health_bonus: int = 1
    date: str


# =========================
# DADOS TEMPORÁRIOS
# Sem banco de dados por enquanto
# =========================

usuarios_pontos = {}

usuarios_missoes = {}

coletas_pendentes = {}

usuarios_mundos = {}

usuarios_missoes_diarias = {}


# =========================
# FUNÇÕES AUXILIARES
# =========================

def get_today_key():
    return datetime.now().strftime("%Y-%m-%d")


def criar_mundo_padrao():
    return {
        "mundo_escolhido": None,
        "quiz_finalizado": False,
        "porcentagem_base": 0,
        "bonus_saude": 0,
        "streak_dias": 0,
        "ultima_atividade": None,
        "data_missoes": None,
        "missoes_concluidas_hoje": [],
    }


def garantir_mundo_usuario(user_id: str):
    if user_id not in usuarios_mundos:
        usuarios_mundos[user_id] = criar_mundo_padrao()

    return usuarios_mundos[user_id]


def garantir_pontos_usuario(user_id: str):
    if user_id not in usuarios_pontos:
        usuarios_pontos[user_id] = 0

    return usuarios_pontos[user_id]


def registrar_atividade_no_mundo(user_id: str, data: str, health_bonus: int):
    mundo = garantir_mundo_usuario(user_id)

    mundo["data_missoes"] = data

    bonus_atual = int(mundo.get("bonus_saude", 0))
    mundo["bonus_saude"] = min(bonus_atual + max(health_bonus, 0), 20)

    if mundo.get("ultima_atividade") != data:
        mundo["streak_dias"] = int(mundo.get("streak_dias", 0)) + 1
        mundo["ultima_atividade"] = data

    return mundo


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
    garantir_pontos_usuario(user_id)

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

    garantir_pontos_usuario(user_id)
    garantir_mundo_usuario(user_id)

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

    garantir_pontos_usuario(user_id)
    garantir_mundo_usuario(user_id)

    usuarios_pontos[user_id] += payload.points

    usuarios_missoes[user_id] = {
        "title": "Coletar Token CarePlus",
        "description": "Token coletado com sucesso.",
        "status": "concluida",
        "reward_points": payload.points,
        "device_id": device_id,
    }

    hoje = get_today_key()
    mundo = registrar_atividade_no_mundo(
        user_id=user_id,
        data=hoje,
        health_bonus=3,
    )

    if mundo.get("data_missoes") != hoje:
        mundo["data_missoes"] = hoje
        mundo["missoes_concluidas_hoje"] = []

    missoes_concluidas = mundo.get("missoes_concluidas_hoje", [])

    if "token_careplus" not in missoes_concluidas:
        missoes_concluidas.append("token_careplus")

    mundo["missoes_concluidas_hoje"] = missoes_concluidas

    del coletas_pendentes[device_id]

    return {
        "message": "Token coletado com sucesso",
        "user_id": user_id,
        "device_id": device_id,
        "points_added": payload.points,
        "total_points": usuarios_pontos[user_id],
        "mission": usuarios_missoes[user_id],
        "mundo": mundo,
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

    usuarios_mundos[user_id] = criar_mundo_padrao()

    usuarios_missoes_diarias[user_id] = {
        "date": get_today_key(),
        "completed": [],
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
        "mundo": usuarios_mundos[user_id],
        "pending_collections": coletas_pendentes,
    }


# =========================
# MUNDO IDEAL
# =========================

@app.get("/users/{user_id}/mundo")
def get_user_mundo(user_id: str):
    mundo = garantir_mundo_usuario(user_id)

    return {
        "user_id": user_id,
        "mundo": mundo,
    }


@app.patch("/users/{user_id}/mundo")
def update_user_mundo(user_id: str, payload: MundoProgressRequest):
    mundo = garantir_mundo_usuario(user_id)

    dados_recebidos = payload.model_dump(exclude_none=True)

    mundo.update(dados_recebidos)

    return {
        "message": "Progresso do mundo atualizado com sucesso",
        "user_id": user_id,
        "mundo": mundo,
    }


# =========================
# MISSÕES DIÁRIAS
# =========================

@app.post("/users/{user_id}/missions/daily")
def complete_daily_mission(user_id: str, payload: CompleteDailyMissionRequest):
    garantir_pontos_usuario(user_id)
    mundo = garantir_mundo_usuario(user_id)

    if user_id not in usuarios_missoes_diarias:
        usuarios_missoes_diarias[user_id] = {
            "date": payload.date,
            "completed": [],
        }

    if usuarios_missoes_diarias[user_id]["date"] != payload.date:
        usuarios_missoes_diarias[user_id] = {
            "date": payload.date,
            "completed": [],
        }

        mundo["data_missoes"] = payload.date
        mundo["missoes_concluidas_hoje"] = []

    missoes_concluidas = usuarios_missoes_diarias[user_id]["completed"]

    if payload.mission_id in missoes_concluidas:
        raise HTTPException(
            status_code=409,
            detail="Esta missão já foi concluída hoje."
        )

    missoes_concluidas.append(payload.mission_id)

    usuarios_pontos[user_id] += max(payload.points, 0)

    mundo["data_missoes"] = payload.date
    mundo["missoes_concluidas_hoje"] = missoes_concluidas

    mundo = registrar_atividade_no_mundo(
        user_id=user_id,
        data=payload.date,
        health_bonus=payload.health_bonus,
    )

    return {
        "message": "Missão diária concluída com sucesso",
        "user_id": user_id,
        "points": usuarios_pontos[user_id],
        "mission_completed": {
            "id": payload.mission_id,
            "title": payload.title,
            "points": payload.points,
            "health_bonus": payload.health_bonus,
        },
        "mundo": mundo,
        "daily_missions": usuarios_missoes_diarias[user_id],
    }