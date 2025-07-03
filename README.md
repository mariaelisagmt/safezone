# SafezoneFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Jest](https://jestjs.io/) test runner, use the following command:

```bash
npm test

# optionally, you can also specify the path to a specific module you want to test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Comandos

LEAFLET

- npm install leaflet ngx-leaflet leaflet.heat
- npm install --save @types/leaflet
- npm install leaflet-control-geocoder
- npm install leaflet leaflet.heat leaflet-control-geocoder
- npm install --save-dev @types/leaflet

Icones

- npm install @fortawesome/fontawesome-free

Instalação do eslint
ng add @angular-eslint/schematics
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

Instalação do pacote base do angular material
ng add @angular/material
npm install @angular/animations

Instalando o zone para testes
npm install zone.js --save

### Rodando Backend Mockado (JSON-SERVER)

npm install -g json-server
npm install --save-dev json-server

Rodando
json-server --watch db.json --port 3000

## Rodando o eslint - Análise de código estática

ng lint ou npx eslint . --ext .ts,.html

## Rodando com o prettier - Análise de formatação e correção automática

npm run lint
npm run format

## Rodando testes

npm run test -- --watch=false --browsers=ChromeHeadless

## Recursos:

- Instalação do docker (testar)
- Pipeline (ok)
- Análise de código (ok)
- Análise de segurança (eslint de segurança / sonarcube,
  SAST + DAST + Snyk + ESLint + Testes)
- Configuração de proteção de branchs e repositórios (ok)
- Criação do CI (ok)
- Criaçao do CD (ok)
- Testes de frontend com angular (ok)

Documentação rxjs: https://dev.to/felipedsc/behaviorsubject-para-comunicacao-entre-componentes-3kpj

# Configuração de containers 

- Criando a imagem:
docker build -t safezone:latest .
- Carregando:
docker buildx build --load -t mariaelisagmt/safezone:latest .
- Criando container:
docker run -p 8080:80 safezone:latest
- Subindo imagem para o docker:
docker build -t mariaelisagmt/safezone .
docker push mariaelisagmt/safezone:latest

# Verifica pastas geradas no angular
ng build --configuration production