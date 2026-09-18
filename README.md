# CotaJá — Landing Page (React)

Landing page oficial do **CotaJá**, Marketplace de Serviços com leilão reverso e Inteligência Artificial.

## 🚀 Tecnologias

- React 18
- CSS Modules por componente
- Canvas API (partículas animadas)
- IntersectionObserver (scroll reveal)
- Google Fonts — Plus Jakarta Sans

## 📁 Estrutura do Projeto

```
cotaja-landing/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── BgCanvas.jsx        # Animação de partículas no background
│   │   ├── Navbar.jsx + .css   # Barra de navegação fixa
│   │   ├── Hero.jsx + .css     # Seção hero com mockup do app
│   │   ├── Stats.jsx + .css    # Métricas da plataforma
│   │   ├── HowItWorks.jsx + .css  # Como funciona (3 passos)
│   │   ├── AppScreens.jsx + .css  # Recursos + Dashboard de leilão
│   │   ├── AISection.jsx + .css   # Seção de IA + Score visual
│   │   ├── EmailSection.jsx + .css # Notificações por e-mail
│   │   ├── CTA.jsx + .css      # Call-to-action com links de lojas
│   │   └── Footer.jsx + .css   # Rodapé
│   ├── styles/
│   │   └── global.css          # Variáveis CSS, animações globais
│   ├── App.js                  # Componente raiz + scroll reveal
│   └── index.js                # Entry point
└── package.json
```

## ⚙️ Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm start

# Build para produção
npm run build
```

## 🎨 Identidade Visual

| Token | Valor |
|-------|-------|
| Primary 1 | `#5B6BE8` |
| Primary 2 | `#8B5CF6` |
| Green (valores) | `#10B981` |
| Background | `#06070F` |
| Card | `#12151F` |
| Gradient | `135deg, #5B6BE8 → #8B5CF6` |

## 📱 Seções

1. **Hero** — Headline + mockup fiel do app com float cards animados
2. **Stats** — +50k prestadores, R$2B em contratos, 40% economia, 4.9★
3. **Como Funciona** — 3 passos: Criar → Receber → Contratar
4. **App Screens** — Features + Dashboard de leilão reverso
5. **Inteligência IA** — Cards de IA + Score visual animado
6. **E-mail** — Preview do e-mail de proposta aceita
7. **CTA** — Links App Store + Google Play

## 🖥️ App web (área logada)

Além da landing, o site traz o app web do CotaJá, ligado à mesma API do app mobile. O código fica em `src/app` (telas), `src/services` (chamadas à API), `src/contexts` (login e avisos) e `src/utils` (API, marca e formatação).

### Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `REACT_APP_API_URL` | URL base da API (padrão `https://app.cotaja.io`). Pode vir com ou sem `/api` no fim. |
| `REACT_APP_STRIPE_PUBLISHABLE_KEY` | Chave pública do Stripe, usada na carteira, no Premium e na página Renda Extra. |
| `PORT` | Porta do `server.js` (padrão `53001`). |

### Rotas

| Rota | Tela |
| --- | --- |
| `/entrar`, `/criar-conta`, `/ativar-conta` | Login, cadastro (cliente ou prestador) e ativação por código |
| `/app` | Início do cliente ou do prestador |
| `/app/perfil`, `/app/perfil/tipo` | Dados, senha, notificações e tipo de perfil |
| `/app/carteira`, `/app/premium` | Cartões (Stripe) e assinatura Premium |
| `/app/pedidos`, `/app/pedidos/novo`, `/app/pedidos/:id` | Pedidos do cliente e propostas recebidas |
| `/app/buscar`, `/app/profissionais/:uuid`, `/app/avaliar/:providerId` | Busca, perfil do prestador e avaliação |
| `/app/demandas`, `/app/demandas/:id`, `/app/propostas`, `/app/servicos` | Demandas, propostas e serviços do prestador |
| `/app/visibilidade` | Painel profissional (Premium) |
| `/app/pedidos/:id/andamento`, `/app/servicos/:id/andamento` | Chat, agendamento, rastreio e código de segurança |

## 🔗 Deploy sugerido

```bash
# Vercel
npx vercel

# Netlify
npm run build && netlify deploy --prod --dir=build

# GitHub Pages
npm install gh-pages --save-dev
# Adicionar no package.json: "homepage": "https://seu-user.github.io/cotaja-landing"
# Scripts: "predeploy": "npm run build", "deploy": "gh-pages -d build"
npm run deploy
```

---

Desenvolvido com ❤️ para o **CotaJá — Marketplace de Serviços**
