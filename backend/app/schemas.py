from pydantic import BaseModel


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


class UpdateUserRequest(BaseModel):
  full_name: str | None = None
  email: str | None = None
  phone: str | None = None
  cpf: str | None = None
  birth_date: str | None = None
  password: str | None = None


class UserResponse(BaseModel):
  id: str
  full_name: str
  email: str
  phone: str
  cpf: str
  birth_date: str
  created_at: str
  updated_at: str


class AuthResponse(BaseModel):
  message: str
  next_step_route: str | None = None
  user: UserResponse


class MessageResponse(BaseModel):
  message: str
