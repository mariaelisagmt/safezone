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

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
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


## Recursos:
- Instalação do docker
- Pipeline
- Análise de código
- Análise de segurança
- Configuração de proteção de branchs e repositórios
- Criação do CI/CD
- Aprender a criar testes de frontend com angular