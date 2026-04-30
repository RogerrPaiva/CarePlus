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