"""Interface em terminal para a Sprint 2 do Challenge Care Plus.

Este arquivo executa um fluxo simples de cadastro, login, consulta e atualizacao
de usuarios utilizando a camada de servicos definida em services.py. O objetivo
e permitir testar as funcionalidades implementadas e validar os requisitos da
sprint de forma interativa, sem depender de API HTTP.
"""

from __future__ import annotations

from dataclasses import dataclass

from services import (
  AuthService,
  DuplicateResourceError,
  InvalidCredentialsError,
  StorageError,
  UserNotFoundError,
  get_digits,
  validate_birth_date,
  validate_cpf,
  validate_email,
  validate_full_name,
  validate_password,
  validate_phone,
)


service = AuthService()


@dataclass
class SignupRequest:
  full_name: str
  email: str
  phone: str
  cpf: str
  birth_date: str
  password: str


@dataclass
class LoginRequest:
  email: str
  password: str


@dataclass
class UpdateUserRequest:
  full_name: str | None = None
  email: str | None = None
  phone: str | None = None
  cpf: str | None = None
  birth_date: str | None = None
  password: str | None = None


def print_title() -> None:
  print("\n" + "=" * 58)
  print("CARE PLUS | Sprint 2 | Jornada de Cadastro em Python")
  print("=" * 58)


def pause() -> None:
  input("\nPressione Enter para continuar...")


def format_phone(value: str) -> str:
  digits = get_digits(value)
  if len(digits) != 11:
    return value
  return f"({digits[:2]}) {digits[2:7]}-{digits[7:]}"


def format_cpf(value: str) -> str:
  digits = get_digits(value)
  if len(digits) != 11:
    return value
  return f"{digits[:3]}.{digits[3:6]}.{digits[6:9]}-{digits[9:]}"


def show_user(user: dict) -> None:
  print("\nDados do usuario")
  print(f"ID: {user['id']}")
  print(f"Nome: {user['full_name']}")
  print(f"E-mail: {user['email']}")
  print(f"Celular: {format_phone(user['phone'])}")
  print(f"CPF: {format_cpf(user['cpf'])}")
  print(f"Nascimento: {user['birth_date']}")
  print(f"Criado em: {user['created_at']}")
  print(f"Atualizado em: {user['updated_at']}")


def prompt_until_valid(label: str, validator, formatter=lambda value: value) -> str:
  """Repete a leitura ate o usuario informar um valor valido."""

  while True:
    value = input(f"{label}: ").strip()
    try:
      normalized = formatter(value)
      validator(normalized)
      return normalized
    except ValueError as error:
      print(f"Erro: {error}")


def prompt_cpf() -> str:
  while True:
    value = input("CPF: ").strip()
    digits = get_digits(value)

    if not digits:
      print("Erro: Informe seu CPF.")
      continue

    if not validate_cpf(digits):
      print("Erro: Digite um CPF valido.")
      continue

    return digits


def prompt_password_with_confirmation() -> str:
  while True:
    password = input("Senha: ").strip()

    try:
      validate_password(password)
    except ValueError as error:
      print(f"Erro: {error}")
      continue

    confirmation = input("Confirmar senha: ").strip()
    if password != confirmation:
      print("Erro: As senhas precisam ser iguais.")
      continue

    return password


def collect_signup_data() -> SignupRequest:
  print("\nCadastro de usuario")
  print("Preencha apenas os dados essenciais para abrir a conta.\n")

  full_name = prompt_until_valid("Nome completo", validate_full_name)
  email = prompt_until_valid("E-mail", validate_email)
  phone = prompt_until_valid("Celular", validate_phone)
  cpf = prompt_cpf()
  birth_date = prompt_until_valid("Data de nascimento (DD/MM/AAAA)", validate_birth_date)
  password = prompt_password_with_confirmation()

  return SignupRequest(
    full_name=full_name,
    email=email,
    phone=phone,
    cpf=cpf,
    birth_date=birth_date,
    password=password,
  )


def register_user() -> None:
  try:
    payload = collect_signup_data()
    user = service.register_user(payload)
  except DuplicateResourceError as error:
    print(f"\nNao foi possivel cadastrar: {error.message}")
  except (ValueError, StorageError) as error:
    print(f"\nErro ao cadastrar usuario: {error}")
  else:
    print("\nConta criada com sucesso.")
    show_user(user)


def login_user() -> str | None:
  print("\nLogin")
  email = input("E-mail: ").strip()
  password = input("Senha: ").strip()

  try:
    user = service.authenticate_user(LoginRequest(email=email, password=password))
  except InvalidCredentialsError as error:
    print(f"\nFalha no login: {error.message}")
    return None
  except (ValueError, StorageError) as error:
    print(f"\nErro ao fazer login: {error}")
    return None

  print("\nLogin realizado com sucesso.")
  show_user(user)
  return user["id"]


def list_users() -> None:
  try:
    users = service.list_users()
  except StorageError as error:
    print(f"\nErro ao listar usuarios: {error}")
    return

  if not users:
    print("\nNenhum usuario cadastrado ainda.")
    return

  print(f"\nUsuarios cadastrados: {len(users)}")
  for index, user in enumerate(users, start=1):
    print(f"{index}. {user['full_name']} | {user['email']} | ID: {user['id']}")


def get_user_by_id() -> dict | None:
  user_id = input("Informe o ID do usuario: ").strip()

  try:
    user = service.get_user(user_id)
  except UserNotFoundError as error:
    print(f"\n{error.message}")
    return None
  except StorageError as error:
    print(f"\nErro ao consultar usuario: {error}")
    return None

  show_user(user)
  return user


def prompt_optional_update(label: str, current_value: str, validator=None, formatter=lambda value: value) -> str | None:
  """Permite atualizar um campo ou mantê-lo com Enter vazio."""

  while True:
    value = input(f"{label} [{current_value}]: ").strip()
    if not value:
      return None

    normalized = formatter(value)
    try:
      if validator is not None:
        validator(normalized)
      return normalized
    except ValueError as error:
      print(f"Erro: {error}")


def prompt_optional_cpf(current_value: str) -> str | None:
  while True:
    value = input(f"CPF [{format_cpf(current_value)}]: ").strip()
    if not value:
      return None

    digits = get_digits(value)
    if not digits:
      print("Erro: Informe um CPF valido.")
      continue

    if not validate_cpf(digits):
      print("Erro: Digite um CPF valido.")
      continue

    return digits


def prompt_optional_password() -> str | None:
  while True:
    password = input("Nova senha [deixe vazio para manter]: ").strip()
    if not password:
      return None

    try:
      validate_password(password)
    except ValueError as error:
      print(f"Erro: {error}")
      continue

    confirmation = input("Confirmar nova senha: ").strip()
    if confirmation != password:
      print("Erro: As senhas precisam ser iguais.")
      continue

    return password


def update_user(current_user_id: str | None) -> None:
  print("\nAtualizacao de usuario")
  user_id = input(f"ID do usuario [{current_user_id or 'informe manualmente'}]: ").strip() or current_user_id

  if not user_id:
    print("Nenhum ID informado.")
    return

  try:
    current_user = service.get_user(user_id)
  except UserNotFoundError as error:
    print(f"\n{error.message}")
    return
  except StorageError as error:
    print(f"\nErro ao buscar usuario: {error}")
    return

  print("\nDeixe um campo vazio para manter o valor atual.")
  show_user(current_user)

  updates = {
    "full_name": prompt_optional_update("Nome completo", current_user["full_name"], validate_full_name),
    "email": prompt_optional_update("E-mail", current_user["email"], validate_email),
    "phone": prompt_optional_update("Celular", format_phone(current_user["phone"]), validate_phone),
    "cpf": prompt_optional_cpf(current_user["cpf"]),
    "birth_date": prompt_optional_update(
      "Data de nascimento (DD/MM/AAAA)",
      current_user["birth_date"],
      validate_birth_date,
    ),
    "password": prompt_optional_password(),
  }

  clean_updates = {key: value for key, value in updates.items() if value is not None}
  if not clean_updates:
    print("\nNenhuma alteracao foi informada.")
    return

  try:
    updated_user = service.update_user(user_id, UpdateUserRequest(**clean_updates))
  except (DuplicateResourceError, ValueError, StorageError) as error:
    message = getattr(error, "message", str(error))
    print(f"\nNao foi possivel atualizar: {message}")
    return

  print("\nDados atualizados com sucesso.")
  show_user(updated_user)


def main() -> None:
  """Mantem o programa ativo ate o usuario escolher sair."""

  current_user_id: str | None = None

  while True:
    print_title()
    print("1. Cadastrar usuario")
    print("2. Fazer login")
    print("3. Listar usuarios")
    print("4. Consultar usuario por ID")
    print("5. Atualizar usuario")
    print("6. Sair")

    if current_user_id:
      print(f"\nSessao atual vinculada ao ID: {current_user_id}")

    option = input("\nEscolha uma opcao: ").strip()

    if option == "1":
      register_user()
      pause()
      continue

    if option == "2":
      current_user_id = login_user()
      pause()
      continue

    if option == "3":
      list_users()
      pause()
      continue

    if option == "4":
      get_user_by_id()
      pause()
      continue

    if option == "5":
      update_user(current_user_id)
      pause()
      continue

    if option == "6":
      print("\nEncerrando o programa Care Plus em Python.")
      break

    print("\nOpcao invalida. Escolha um numero de 1 a 6.")
    pause()


if __name__ == "__main__":
  main()
