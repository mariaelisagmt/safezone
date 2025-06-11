# Etapa 1: Build da aplicação Angular
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

# Etapa 2: Servir com Nginx
FROM nginx:alpine

COPY --from=build /app/dist/<nome-do-seu-projeto> /usr/share/nginx/html

# Copia um nginx.conf customizado (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]