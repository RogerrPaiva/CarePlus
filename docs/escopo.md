# Escopo do Projeto CarePlus

## 1. Visao geral

O CarePlus e uma aplicacao web de saude e bem-estar voltada a apoiar usuarios na criacao de habitos saudaveis, configuracao inicial de cuidado e escolha de planos digitais de acompanhamento.

O projeto atual funciona como MVP/prototipo e contempla home, cadastro, login, onboarding e selecao de planos. A visao futura inclui gamificacao, missoes de saude, moedas virtuais, recompensas e integracao com pulseira inteligente.

## 2. Objetivo

Criar uma experiencia digital simples e progressiva para que o usuario:

- Crie ou acesse sua conta.
- Configure dados e preferencias iniciais de cuidado.
- Revise permissoes e informacoes importantes.
- Escolha um plano de acompanhamento.
- Conclua sua jornada inicial dentro da plataforma.

## 3. Escopo funcional atual

### Home

- Apresentacao da marca CarePlus.
- Conteudos institucionais e chamadas para cadastro/login.
- Cabecalho, banner, secoes de conteudo e rodape.

### Cadastro

- Criacao de conta com nome completo, e-mail, celular, CPF, data de nascimento e senha.
- Validacao de campos obrigatorios.
- Validacao de CPF, e-mail, celular, data de nascimento e senha.
- Aceite de Termos de Uso e Politica de Privacidade.
- Bloqueio de e-mail e CPF duplicados no backend.

### Login

- Acesso por e-mail e senha.
- Validacao de credenciais.
- Redirecionamento para home quando o onboarding ja estiver concluido.
- Redirecionamento para onboarding quando ainda houver configuracao pendente.
- Botoes de Google e Apple apenas informativos, sem integracao real.

### Onboarding

- Jornada em etapas para configurar permissoes, preferencias e confirmacao final.
- Revisao e mascaramento de dados sensiveis.
- Definicao de cadencia de acompanhamento.
- Selecao de lembretes: hidratacao, atividade fisica, sono e medicacao.
- Selecao de canais: app, e-mail e WhatsApp.
- Selecao de horario ideal: manha, tarde ou noite.
- Persistencia temporaria do fluxo no navegador.

### Planos

- Apresentacao dos planos Essencial, Equilibrio e Integral.
- Comparativo de recursos e precos.
- Indicacao de plano recomendado.
- Confirmacao do plano escolhido.
- Conclusao do onboarding apos selecao do plano.

### Backend

- API em FastAPI para cadastro, login e conclusao de onboarding.
- Persistencia local em arquivo JSON.
- Validacao de dados no servidor.
- Retorno apenas de dados publicos do usuario.

## 4. Escopo planejado

As funcionalidades abaixo pertencem a evolucao futura do produto e ainda nao fazem parte do MVP atual:

- Missoes diarias de saude.
- Streak de habitos saudaveis.
- Moedas virtuais.
- Mini-jogo ou mundo virtual personalizavel.
- Loja mensal de recompensas reais.
- Troca de moedas por beneficios, itens ou descontos.
- Integracao com pulseira inteligente.
- Dashboard do usuario com metas, progresso e historico.
- Painel administrativo para gestao de usuarios, planos, missoes e recompensas.

## 5. Escopo tecnico

### Frontend

- React.
- Vite.
- React Router.
- CSS por pagina/componente.
- Lucide React e React Icons.
- Consumo da API por `fetch`.

### Backend

- Python.
- FastAPI.
- Pydantic.
- Armazenamento em `backend/data/users.json`.
- CORS configurado para ambiente local.

### Dados atuais

- Nome completo.
- E-mail.
- Celular.
- CPF.
- Data de nascimento.
- Hash de senha.
- Plano selecionado.
- Status de onboarding.
- Datas de criacao e atualizacao.

## 6. Limites do projeto

O projeto atual nao deve ser tratado como produto final de producao.

Limites principais:

- Autenticacao simples por e-mail e senha.
- Sem tokens, expiracao de sessao ou controle avancado de acesso.
- Persistencia em JSON, adequada apenas para prototipo.
- Planos e precos definidos estaticamente no frontend.
- Preferencias do onboarding ainda nao sao totalmente persistidas no backend.
- Sem pagamento real.
- Sem integracao real com dispositivos, operadoras, CRM ou sistemas medicos.
- Sem painel administrativo.
- Sem deploy de producao.

## 7. Exclusoes

Nao fazem parte do escopo atual:

- Diagnostico medico, prescricao ou recomendacao clinica.
- Telemedicina ou prontuario eletronico.
- Pagamento, assinatura recorrente ou nota fiscal.
- Recuperacao real de senha.
- Login real com Google ou Apple.
- Autenticacao multifator.
- Banco de dados de producao.
- Aplicativo mobile nativo.
- Integracao real com pulseira inteligente.
- Loja real de recompensas.
- Sistema antifraude.
- Testes automatizados completos.
- Monitoramento, logs centralizados e observabilidade.

## 8. Premissas

- O usuario acessa a aplicacao por navegador moderno.
- O frontend e o backend rodam separadamente em ambiente local.
- A API usa `http://localhost:8000` por padrao.
- O armazenamento local do navegador pode ser apagado pelo usuario.
- Os planos, valores e beneficios atuais sao exemplos e podem mudar.
- Qualquer uso real de dados de saude exigira revisao juridica, seguranca, privacidade e consentimento explicito.

## 9. Regras de negocio atuais

- E-mail e CPF devem ser unicos.
- Cadastro exige aceite de Termos de Uso e Politica de Privacidade.
- Senha deve ter pelo menos 8 caracteres.
- Usuario sem onboarding concluido deve continuar a configuracao.
- Usuario com onboarding concluido pode seguir para a home.
- O plano Equilibrio e o recomendado.
- A escolha do plano conclui o onboarding.

## 10. Criterios de aceitacao do MVP

O MVP sera considerado aceito quando:

- A home carregar corretamente.
- O usuario conseguir criar conta com dados validos.
- O sistema bloquear dados invalidos ou duplicados.
- O usuario conseguir fazer login.
- O onboarding permitir revisar dados e configurar preferencias.
- A tela de planos permitir escolher e confirmar um plano.
- O backend salvar o plano escolhido e marcar o onboarding como concluido.
- O usuario retornar para a home apos finalizar a jornada.

## 11. Riscos principais

- Armazenamento em JSON nao e adequado para producao.
- Hash de senha simples precisa ser substituido antes de uso real.
- Dados pessoais e de saude exigem adequacao a LGPD.
- Gamificacao e recompensas podem exigir regras antifraude.
- Integracao com pulseira depende de hardware, SDKs e permissoes ainda nao definidos.

## 12. Conclusao

O CarePlus ja possui a base da jornada inicial: home, cadastro, login, onboarding e escolha de planos. As proximas etapas devem priorizar robustez tecnica, persistencia segura, dashboard do usuario e, depois, recursos de gamificacao, recompensas e integracoes.
