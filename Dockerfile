FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine

COPY --from=build /app/dist/<nome-do-seu-projeto> /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]