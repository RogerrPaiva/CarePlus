# CarePlus - Jornada Gamificada do Cuidado Contínuo

Projeto desenvolvido para o Challenge Care Plus, com foco em saúde preventiva, bem-estar, gamificação e integração entre Front-End, Web Development, Python e IoT.

A proposta do CarePlus é transformar hábitos saudáveis em uma experiência mais simples, visual e motivadora. A plataforma permite que o usuário crie uma conta, faça login, configure preferências iniciais, escolha um plano, responda a um quiz de hábitos, acompanhe seu Mundo Ideal de Saúde, complete missões diárias, ganhe pontos e mantenha uma sequência de atividades.

---

## Integrantes

- Roger De Carvalho Paiva - RM566949
- David Ernesto Mogollon Gama - RM567855
- Pedro Henrique Tavares Viana - RM567680

---

## Sobre o projeto

O CarePlus é uma aplicação web em formato MVP acadêmico. O sistema simula uma jornada digital de cuidado contínuo, conectando saúde preventiva com elementos de gamificação.

O objetivo é incentivar o usuário a manter hábitos saudáveis por meio de missões, pontos, streaks e evolução visual de um mundo ideal personalizado.

---

## Funcionalidades implementadas

### Cadastro de usuário

O usuário pode criar uma conta informando:

- Nome completo
- E-mail
- Celular
- CPF
- Data de nascimento
- Senha

O sistema realiza validações, bloqueia e-mail e CPF duplicados e armazena a senha em formato de hash.

---

### Login

O usuário pode acessar a plataforma usando e-mail e senha cadastrados.

Após o login, o sistema mantém os dados do usuário autenticado para personalizar as páginas de Mundo e Missões.

---

### Onboarding

Após o cadastro/login, o usuário passa por uma configuração inicial com escolha de preferências e plano.

Planos disponíveis:

- Essencial
- Equilíbrio
- Integral

O plano escolhido é salvo no usuário e marca o onboarding como concluído.

---

### Mundo Ideal de Saúde

O usuário escolhe um mundo e responde a um quiz de hábitos saudáveis.

O quiz avalia categorias como:

- Sono
- Água
- Exercícios
- Alimentação
- Estresse
- Humor
- Cansaço físico
- Tempo de tela

Com base nas respostas, o sistema calcula uma porcentagem de saúde e classifica o mundo do usuário em estados como:

- Mundo fraco
- Mundo em evolução
- Mundo saudável

O progresso do Mundo Ideal é vinculado ao usuário logado durante a execução da API.

---

### Missões diárias

A página de missões permite que o usuário complete tarefas saudáveis, como:

- Caminhar 4 mil passos
- Tomar 2,5 L de água
- Fazer uma refeição saudável
- Dormir 7 horas

Ao concluir uma missão, o sistema:

- Soma pontos ao usuário
- Marca a missão como concluída no dia
- Atualiza o streak
- Aumenta o bônus de saúde do Mundo Ideal

Cada missão diária só pode ser concluída uma vez por dia.

---

### Pontuação e streak

O sistema possui controle de pontos por usuário.

Também existe uma sequência de dias ativos, chamada de streak, que aumenta quando o usuário realiza atividades ou missões saudáveis.

---

### Integração IoT / Token CarePlus

O projeto possui uma simulação de missão com token CarePlus.

A ideia representa um totem ou dispositivo IoT com ESP32 em pontos parceiros, como parques ou locais de saúde. Quando o usuário interage com o totem, a missão é confirmada e os pontos são adicionados ao perfil.

Fluxo simplificado:

```text
Usuário inicia missão no site
        ↓
Totem / ESP32 confirma coleta
        ↓
Backend recebe evento
        ↓
Usuário ganha pontos
        ↓
Mundo Ideal evolui
```

---

## Manual de execução do projeto

Este projeto possui duas partes principais:

- **Frontend:** aplicação web desenvolvida com React e Vite.
- **Backend:** API desenvolvida com Python e FastAPI.

Para executar o CarePlus corretamente, é necessário iniciar primeiro o backend e depois o frontend.

---

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado na máquina:

- Git
- Node.js
- npm
- Python 3
- pip

---

## Como clonar o repositório

Abra o terminal e execute:

```bash
git clone https://github.com/RogerrPaiva/CarePlus.git
```

Depois, acesse a pasta do projeto:

```bash
cd CarePlus
```

---

## Executando o backend

Acesse a pasta do backend:

```bash
cd backend
```

Crie um ambiente virtual Python:

```bash
python -m venv venv
```

Ative o ambiente virtual.

No Windows:

```bash
venv\Scripts\activate
```

No Mac/Linux:

```bash
source venv/bin/activate
```

Instale as dependências do backend:

```bash
pip install -r requirements.txt
```

Caso ocorra erro na instalação pelo `requirements.txt`, instale manualmente:

```bash
pip install fastapi uvicorn
```

Execute a API:

```bash
python -m uvicorn main:app --reload
```

Se tudo estiver funcionando, a API ficará disponível em:

```text
http://localhost:8000
```

A documentação automática da API pode ser acessada em:

```text
http://localhost:8000/docs
```

Para testar se a API está ativa, acesse:

```text
http://localhost:8000
```

Resposta esperada:

```json
{
  "status": "API CarePlus funcionando"
}
```

---

## Executando o frontend

Com outro terminal aberto, volte para a raiz do projeto e acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências do projeto:

```bash
npm install
```

Execute o frontend:

```bash
npm run dev
```

O Vite irá iniciar a aplicação. Normalmente ela ficará disponível em:

```text
http://localhost:5173
```

---

## Configuração da conexão entre frontend e backend

Por padrão, o frontend já está configurado para se comunicar com a API em:

```text
http://localhost:8000
```

Caso seja necessário alterar o endereço da API, crie um arquivo `.env` dentro da pasta `frontend` com o seguinte conteúdo:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Depois disso, reinicie o servidor do frontend:

```bash
npm run dev
```

---

## Ordem correta para rodar o projeto

Para evitar erros de conexão, execute nesta ordem:

1. Inicie o backend na pasta `backend`.
2. Inicie o frontend na pasta `frontend`.
3. Acesse o site pelo navegador em:

```text
http://localhost:5173
```

---

## Fluxo básico de uso

Com o projeto rodando, o usuário pode:

1. Criar uma conta.
2. Fazer login.
3. Escolher um plano no onboarding.
4. Selecionar o Mundo Ideal de Saúde.
5. Responder ao quiz de hábitos.
6. Acessar a página de missões.
7. Concluir missões diárias.
8. Ganhar pontos.
9. Aumentar o streak.
10. Evoluir o Mundo Ideal.

---

## Testando a missão IoT / Token CarePlus

A missão do Token CarePlus pode ser simulada usando a própria aplicação ou ferramentas como Postman/Insomnia.

### 1. Iniciar coleta do token

Endpoint:

```http
POST http://localhost:8000/missions/start-collection
```

Exemplo de corpo da requisição:

```json
{
  "user_id": "ID_DO_USUARIO",
  "device_id": "careplus-token-001"
}
```

Essa requisição simula o usuário iniciando a missão no site.

---

### 2. Confirmar coleta pelo totem/ESP32

Endpoint:

```http
POST http://localhost:8000/iot/token-collected
```

Exemplo de corpo da requisição:

```json
{
  "device_id": "careplus-token-001",
  "event": "token_collected",
  "points": 50
}
```

Essa requisição simula o ESP32 ou totem confirmando que o usuário coletou o token.

Após isso, o backend adiciona pontos ao usuário e atualiza o progresso do Mundo Ideal.

---

## Observações importantes

Este projeto é um MVP acadêmico. Algumas informações são simuladas durante a execução da API, principalmente pontos, missões, progresso do mundo e eventos IoT.

Por isso, ao reiniciar o backend, parte dos dados temporários pode ser perdida.

O objetivo principal é demonstrar o funcionamento da jornada gamificada de cuidado contínuo, integrando:

- Interface web
- Cadastro e login
- Onboarding
- Missões diárias
- Pontuação
- Streak
- Mundo Ideal de Saúde
- Simulação IoT com Token CarePlus

---

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- CSS
- Bootstrap
- Python
- FastAPI
- Uvicorn
- IoT simulado com ESP32 / Token CarePlus
