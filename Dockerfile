FROM node:18

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY backend ./backend

COPY frontend ./frontend

COPY backend/.env ./backend/.env

WORKDIR /app/backend

EXPOSE 3000

CMD ["node", "server.js"]