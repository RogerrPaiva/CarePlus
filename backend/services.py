from __future__ import annotations

import hashlib
import json
import re
from dataclasses import dataclass
from datetime import UTC, datetime
from pathlib import Path
from typing import Protocol
from uuid import uuid4

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


class SignupPayload(Protocol):
  full_name: str
  email: str
  phone: str
  cpf: str
  birth_date: str
  password: str


class LoginPayload(Protocol):
  email: str
  password: str


class UpdatePayload(Protocol):
  full_name: str | None
  email: str | None
  phone: str | None
  cpf: str | None
  birth_date: str | None
  password: str | None


class StorageError(Exception):
  """Raised when JSON persistence cannot be read or written."""


class DuplicateResourceError(Exception):
  def __init__(self, message: str):
    super().__init__(message)
    self.message = message


class InvalidCredentialsError(Exception):
  def __init__(self, message: str = "Credenciais invalidas."):
    super().__init__(message)
    self.message = message


class UserNotFoundError(Exception):
  def __init__(self, message: str = "Usuario nao encontrado."):
    super().__init__(message)
    self.message = message


def get_digits(value: str) -> str:
  return re.sub(r"\D", "", value or "")


def now_iso() -> str:
  return datetime.now(UTC).isoformat()


def hash_password(password: str) -> str:
  return hashlib.sha256(password.encode("utf-8")).hexdigest()


def normalize_birth_date(value: str) -> str:
  digits = get_digits(value)

  if len(digits) == 8:
    return f"{digits[:2]}/{digits[2:4]}/{digits[4:]}"

  return value.strip()


def parse_birth_date(value: str) -> datetime | None:
  normalized_value = normalize_birth_date(value)

  try:
    parsed = datetime.strptime(normalized_value, "%d/%m/%Y")
  except ValueError:
    return None

  today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
  if parsed > today:
    return None

  return parsed


def validate_cpf(value: str) -> bool:
  digits = get_digits(value)

  if len(digits) != 11 or len(set(digits)) == 1:
    return False

  total = sum(int(digits[index]) * (10 - index) for index in range(9))
  remainder = (total * 10) % 11
  first_check = 0 if remainder == 10 else remainder

  if first_check != int(digits[9]):
    return False

  total = sum(int(digits[index]) * (11 - index) for index in range(10))
  remainder = (total * 10) % 11
  second_check = 0 if remainder == 10 else remainder

  return second_check == int(digits[10])


def validate_full_name(value: str) -> str:
  normalized = " ".join(value.split())

  if not normalized:
    raise ValueError("Informe seu nome completo.")

  if len(normalized.split(" ")) < 2:
    raise ValueError("Digite nome e sobrenome.")

  return normalized


def validate_email(value: str) -> str:
  normalized = value.strip().lower()

  if not normalized:
    raise ValueError("Informe seu e-mail.")

  if not EMAIL_PATTERN.match(normalized):
    raise ValueError("Digite um e-mail valido.")

  return normalized


def validate_phone(value: str) -> str:
  digits = get_digits(value)

  if not digits:
    raise ValueError("Informe seu celular.")

  if len(digits) != 11:
    raise ValueError("Use um celular com DDD.")

  return digits


def validate_birth_date(value: str) -> str:
  if not value.strip():
    raise ValueError("Informe sua data de nascimento.")

  normalized = normalize_birth_date(value)
  parsed = parse_birth_date(normalized)
  if parsed is None:
    raise ValueError("Digite uma data valida.")

  return normalized


def validate_password(value: str) -> str:
  if not value.strip():
    raise ValueError("Crie uma senha para a conta.")

  if len(value.strip()) < 8:
    raise ValueError("Use pelo menos 8 caracteres.")

  return value


def validate_login_password(value: str) -> str:
  if not value.strip():
    raise ValueError("Informe sua senha.")

  return value


def validate_signup_payload(payload: SignupPayload) -> dict[str, str]:
  normalized_cpf = get_digits(payload.cpf)

  if not normalized_cpf:
    raise ValueError("Informe seu CPF.")

  if not validate_cpf(normalized_cpf):
    raise ValueError("Digite um CPF valido.")

  return {
    "full_name": validate_full_name(payload.full_name),
    "email": validate_email(payload.email),
    "phone": validate_phone(payload.phone),
    "cpf": normalized_cpf,
    "birth_date": validate_birth_date(payload.birth_date),
    "password_hash": hash_password(validate_password(payload.password)),
  }


def validate_update_payload(payload: UpdatePayload) -> dict[str, str]:
  updates: dict[str, str] = {}

  if payload.full_name is not None:
    updates["full_name"] = validate_full_name(payload.full_name)

  if payload.email is not None:
    updates["email"] = validate_email(payload.email)

  if payload.phone is not None:
    updates["phone"] = validate_phone(payload.phone)

  if payload.cpf is not None:
    normalized_cpf = get_digits(payload.cpf)
    if not normalized_cpf or not validate_cpf(normalized_cpf):
      raise ValueError("Digite um CPF valido.")
    updates["cpf"] = normalized_cpf

  if payload.birth_date is not None:
    updates["birth_date"] = validate_birth_date(payload.birth_date)

  if payload.password is not None:
    updates["password_hash"] = hash_password(validate_password(payload.password))

  return updates


@dataclass
class UserStorage:
  file_path: Path

  def __post_init__(self):
    self.file_path.parent.mkdir(parents=True, exist_ok=True)
    if not self.file_path.exists():
      self.file_path.write_text("[]", encoding="utf-8")

  def load_users(self) -> list[dict]:
    try:
      raw = self.file_path.read_text(encoding="utf-8")
      data = json.loads(raw)
    except FileNotFoundError as error:
      raise StorageError("Arquivo de usuarios nao encontrado.") from error
    except json.JSONDecodeError as error:
      raise StorageError("Arquivo de usuarios invalido.") from error

    if not isinstance(data, list):
      raise StorageError("Estrutura de usuarios invalida.")

    return data

  def save_users(self, users: list[dict]) -> None:
    try:
      self.file_path.write_text(json.dumps(users, indent=2, ensure_ascii=True), encoding="utf-8")
    except OSError as error:
      raise StorageError("Nao foi possivel salvar os usuarios.") from error


class AuthService:
  def __init__(self, storage: UserStorage | None = None):
    data_file = Path(__file__).resolve().parent / "data" / "users.json"
    self.storage = storage or UserStorage(data_file)

  def list_users(self) -> list[dict]:
    users = self.storage.load_users()
    return [self._public_user(user) for user in users]

  def register_user(self, payload: SignupPayload) -> dict:
    normalized = validate_signup_payload(payload)
    users = self.storage.load_users()

    if any(user["email"] == normalized["email"] for user in users):
      raise DuplicateResourceError("Ja existe uma conta com este e-mail.")

    if any(user["cpf"] == normalized["cpf"] for user in users):
      raise DuplicateResourceError("Ja existe uma conta com este CPF.")

    timestamp = now_iso()
    user = {
      "id": str(uuid4()),
      **normalized,
      "created_at": timestamp,
      "updated_at": timestamp,
    }

    users.append(user)
    self.storage.save_users(users)
    return self._public_user(user)

  def authenticate_user(self, payload: LoginPayload) -> dict:
    email = validate_email(payload.email)
    password_hash = hash_password(validate_login_password(payload.password))

    for user in self.storage.load_users():
      if user["email"] == email and user["password_hash"] == password_hash:
        return self._public_user(user)

    raise InvalidCredentialsError("E-mail ou senha invalidos.")

  def get_user(self, user_id: str) -> dict:
    user = self._find_user(user_id)
    return self._public_user(user)

  def update_user(self, user_id: str, payload: UpdatePayload) -> dict:
    users = self.storage.load_users()
    user = next((item for item in users if item["id"] == user_id), None)

    if user is None:
      raise UserNotFoundError()

    updates = validate_update_payload(payload)

    if "email" in updates and any(item["email"] == updates["email"] and item["id"] != user_id for item in users):
      raise DuplicateResourceError("Ja existe uma conta com este e-mail.")

    if "cpf" in updates and any(item["cpf"] == updates["cpf"] and item["id"] != user_id for item in users):
      raise DuplicateResourceError("Ja existe uma conta com este CPF.")

    user.update(updates)
    user["updated_at"] = now_iso()
    self.storage.save_users(users)
    return self._public_user(user)

  def _find_user(self, user_id: str) -> dict:
    for user in self.storage.load_users():
      if user["id"] == user_id:
        return user

    raise UserNotFoundError()

  @staticmethod
  def _public_user(user: dict) -> dict:
    return {
      "id": user["id"],
      "full_name": user["full_name"],
      "email": user["email"],
      "phone": user["phone"],
      "cpf": user["cpf"],
      "birth_date": user["birth_date"],
      "created_at": user["created_at"],
      "updated_at": user["updated_at"],
    }
