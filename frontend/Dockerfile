FROM node:alpine AS builder

# Метаданные
LABEL version="1.0"

# Папка приложения
WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование файлов проекта
COPY . .

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 5173

CMD [ "nginx","-g","daemon off;" ]