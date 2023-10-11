FROM node:18-alpine

WORKDIR /usr/app

COPY index.mjs .
COPY package.json .
COPY package-lock.json .
COPY /src ./src/

ENV MONGO_URI mongodb+srv://mateohanaoka:mateohanaoka@cluster0.a5fxkgt.mongodb.net/?retryWrites=true&w=majority
ENV PORT 5001
ENV MINIO_HOST = http://minio:9000
ENV MINIO_ACCESS_KEY root
ENV MINIO_SECRET_KEY password
ENV EXPOSE 5001

RUN npm install --production

ENTRYPOINT ["npm", "start"]