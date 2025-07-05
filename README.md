# 🚨 SafezoneFrontend
SafezoneFrontend é a interface de uma aplicação Angular voltada para segurança e monitoramento georreferenciado. Ele utiliza tecnologias modernas como Angular Material, Leaflet para mapas, Jest para testes e integrações com CI/CD e Docker para deploy.

## 📦 Tecnologias utilizadas
- Angular 20
- Angular Material
- Leaflet + HeatMap + Geocoder
- Jest para testes unitários
- ESLint + Prettier para padronização e análise estática
- RxJS (BehaviorSubject) para comunicação entre componentes
- Docker para containerização
- Azure Container Registry + GitHub Actions para CI/CD
- JSON Server para backend mockado

## 🚀 Como iniciar o projeto localmente
1. Instalar dependências

npm install

2. Iniciar o servidor de desenvolvimento

ng serve

Acesse no navegador: http://localhost:4200

## 🗺️ Funcionalidades geográficas (Leaflet)
Para funcionalidades de mapa com geocodificação e camadas de calor:

npm install leaflet ngx-leaflet leaflet.heat leaflet-control-geocoder
npm install --save-dev @types/leaflet

## 🧱 Gerando novos componentes

ng generate component nome-do-componente

Para ver todas as opções de geração:

ng generate --help

## 🛠️ Build para produção

ng build --configuration production
Arquivos serão gerados na pasta dist/.

## ✅ Testes
Unitários (com Jest)

npm test
npm run test -- --watch=false --browsers=ChromeHeadless

## Lint e Prettier

ng lint
npm run lint
npm run format

## 🧪 Backend Mockado com JSON-SERVER
Instalação:

npm install -g json-server
npm install --save-dev json-server
Rodar servidor:

json-server --watch db.json --port 3000

## 📦 Docker
Criar a imagem:

docker build -t safezone:latest .
Executar localmente:

docker run -p 8080:80 safezone:latest
Enviar para DockerHub:

docker build -t mariaelisagmt/safezone .
docker push mariaelisagmt/safezone:latest
## ☁️ Deploy na Azure
Criar Container Registry

Configurar secrets no GitHub (DOCKER_USERNAME, DOCKER_PASSWORD, etc)

Publicar imagem com GitHub Actions

Utilizar Azure Web App for Containers para deploy do frontend

## 🔐 Segurança e Qualidade
Análise estática com ESLint

Prettier para formatação

Testes automatizados com Jest

Proteção de branches (GitHub)

SAST + DAST + Snyk (em CI/CD)

Integração com SonarQube opcional

## 📚 Recursos úteis
Documentação oficial Angular: https://angular.dev

Documentação RxJS (BehaviorSubject): dev.to link

CLI Angular: Angular CLI Guide
