# Desafio Técnico Uber React.js

Desafio técnico do candidato [Wallace Ferreira](https://www.linkedin.com/in/wallace-silva-ferreira/) para a vaga de Engenheiro de Software Front-end com foco em React.js.

## Tabela de Conteúdos

- [Demo](#demo)
- [Requisitos](#requisitos)
- [Features](#features)
- [Princípios e Paradigmas](#principios-e-paradigmas)
- [Ferramentas](#ferramentas)
- [Ambiente](#ambiente)
- [Rodando Localmente](#rodando-localmente)
- [Sobre Mim](#sobre-mim)

## [Demo](#demo)

A demo do desafio está disponível neste link: https://uber-application-chat.vercel.app/

## [Requisitos](#requisitos)

- Para ler os requisitos técnicos do desafio, [clique aqui](./REQUIREMENTS.md).

## [Features](#features)

- Chat em tempo real com geração de nicknames automáticos
- Design responsivo
- Tema com [Preline](https://flowbite-admin-dashboard.vercel.app/layouts/sidebar/)

## [Princípios e Paradigmas](#principios-e-paradigmas)

Os seguintes pricipios e paradigmas foram aplicados:

- DDD
- SOLID
- DRY
- Component Composition
- Paradigma funcional
- Paradigma OO

## [Ferramentas](#ferramentas)

- [Vite.js](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [MQTT](https://mqtt.org/)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) + [Lint Staged](https://github.com/lint-staged/lint-staged) + [Left Hook](https://github.com/evilmartians/lefthook) + [Commitlint](https://github.com/conventional-changelog/commitlint)
- [Formik](https://formik.org/)
- [Preline](https://preline.co/)

## [Ambiente](#ambiente)

O projeto foi desenvolvido usando:

- Node.js v18.17.1
- PNPM v8.15.6
- Ubuntu 22.04.3 LTS

## [Rodando Localmente](running-locally)

Clone o projeto

```bash
git clone https://github.com/wallace-sf/uber-application-chat.git
```

Instale as dependências

```bash
pnpm install
```

É necessário informar o URL do broker e o tópico nas variáveis de ambiente. Crie um arquivo .env antes de iniciar o projeto. É importante lembrar que, para desenvolvimento, o WebSocket deve iniciar com `ws`, e em produção, com `wss`. A seguir, um exemplo com o broker público que foi utilizado no desenvolvimento:

```
VITE_APP_MQTT_CHAT_BROKER_URL=ws://broker.mqttdashboard.com:8000/mqtt
VITE_APP_MQTT_CHAT_TOPIC=5d81d305-8c1e-49ff-8905-34fcc2269440
```

Inicie a aplicação Web

```bash
pnpm dev
```

## [Sobre mim](about-me)

- [@wallace-sf](https://www.github.com/wallace-sf)
- [Linkedin](https://www.linkedin.com/in/wallace-silva-ferreira/)
